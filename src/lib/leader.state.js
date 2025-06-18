let isLeader = false;
let lastPolled = null;
let leadershipChangeCb = null;

function setLeadership(state) {
  isLeader = state;
  if (leadershipChangeCb) leadershipChangeCb(state);
}

function setLastPolled(dateStr) {
  lastPolled = dateStr;
}

function getLeadershipStatus() {
  return {
    isLeader,
    lastPolled,
  };
}

function setLeadershipChangeCallback(cb) {
  leadershipChangeCb = cb;
}

module.exports = {
  setLeadership,
  setLastPolled,
  getLeadershipStatus,
  setLeadershipChangeCallback,
};
