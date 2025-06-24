const { setLastPolled, isLeaderNow } = require("../lib/leader.state");
const { port } = require("../utils/port");

// STATE do poll
let lastPollSlot = null;
const POLL_INTERVAL = parseInt(process.env.POLL_INTERVAL) ?? 5000;

function onChangePollSlot(state) {
  if (!state) {
    lastPollSlot = null;
  } else {
    const now = Date.now();
    lastPollSlot = Math.floor(now / POLL_INTERVAL);
  }
}

const startPolling = () => {
  setInterval(() => {
    if (!isLeaderNow()) return;
    const now = Date.now();
    const pollSlot = Math.floor(now / POLL_INTERVAL);
    if (pollSlot !== lastPollSlot) {
      lastPollSlot = pollSlot;
      const pollTime = new Date().toISOString();
      setLastPolled(pollTime);
      console.log(`[${port}] Polling ----> API at ${pollTime}`);
    }
  }, 250);
};

module.exports = {
  startPolling,
  onChangePollSlot,
};
