const { setLastPolled } = require("../lib/leader.state");
const { port } = require("../utils/port");

let isLeader = false;
let lastPollSlot = null;
const POLL_INTERVAL = parseInt(process.env.POLL_INTERVAL) ?? 5000;

function onLeadershipChange(state) {
  isLeader = state;
  if (!state) {
    lastPollSlot = null;
  } else {
    const now = Date.now();
    lastPollSlot = Math.floor(now / POLL_INTERVAL);
  }
}

const startPollingTask = () => {
  setInterval(() => {
    if (!isLeader) return;
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
  startPollingTask,
  onLeadershipChange,
};
