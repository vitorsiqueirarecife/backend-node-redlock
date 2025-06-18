let isLeader = false;
let lastPolled = null;

const startPollingTask = () => {
  setInterval(() => {
    if (!isLeader) return;
    // TODO: Mock third-party poll
    lastPolled = new Date().toISOString();
    console.log(`[${process.pid}] 📡 Polling API at ${lastPolled}`);
  }, 5000);
};

const setLeadership = (state) => {
  isLeader = state;
};

const getLastPolled = () => lastPolled;

module.exports = {
  startPollingTask,
  setLeadership,
  getLastPolled
};
