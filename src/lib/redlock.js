const Redlock = require("redlock").default;
const redis = require("./redis");

const redlock = new Redlock([redis], {
  retryCount: 0,
});

module.exports = redlock;
