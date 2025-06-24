// STATE to API
let isLeader = false;
let lastPolled = null;
let changeCb = null;

function setLeadership(state) {
  isLeader = state;
  if (changeCb) changeCb(state);
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

function setChangeCallback(cb) {
  changeCb = cb;
}

function isLeaderNow() {
  return isLeader;
}

module.exports = {
  setLeadership,
  setLastPolled,
  getLeadershipStatus,
  setChangeCallback,
  isLeaderNow,
};
