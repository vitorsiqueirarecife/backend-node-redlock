const redlock = require("./redlock");
const redis = require("./redis");

const {
  setLeadership,
  setLeadershipChangeCallback,
} = require("./leader.state");
const { port } = require("../utils/port");

const LOCK_KEY = process.env.REDIS_LOCK_KEY;
const LOCK_TTL = parseInt(process.env.REDIS_LOCK_TTL ?? 5000);

let lock = null;

async function becomeLeader() {
  setLeadership(true);
  console.log(`[${port}] is now the leader!`);
}

function loseLeadership(reason) {
  setLeadership(false);
  console.warn(`[${port}] lost leadership: ${reason}`);
}

async function tryToBecomeLeader() {
  try {
    lock = await redlock.acquire([LOCK_KEY], LOCK_TTL);
    await becomeLeader();
    maintainLeadership();
  } catch (err) {
    loseLeadership("lock not acquired");
    setTimeout(tryToBecomeLeader, 1000);
  }
}

function maintainLeadership() {
  if (!lock) return;
  setTimeout(async () => {
    try {
      lock = await lock.extend(LOCK_TTL);
      maintainLeadership();
    } catch (err) {
      loseLeadership("lock not renewed");
      lock = null;
      tryToBecomeLeader();
    }
  }, LOCK_TTL - 2000);
}

async function releaseLeadership() {
  if (lock) {
    await lock.release();
    lock = null;
    loseLeadership("lock released explicitly");
  }
}

async function initLeaderElection(onLeadershipChange) {
  setLeadershipChangeCallback(onLeadershipChange);
  redis.on("error", (err) => {
    loseLeadership("Redis error");
    console.error(`[${port}] Erro Redis:`, err.message);
  });
  await tryToBecomeLeader();

  const shutdown = async () => {
    await releaseLeadership();
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

module.exports = {
  initLeaderElection,
  releaseLeadership,
};
