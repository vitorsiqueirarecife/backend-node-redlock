const express = require("express");
const { getLeadershipStatus } = require("../lib/leader/leader.state");
const router = express.Router();

router.get("/", (_, res) => {
  res.json(getLeadershipStatus());
});

module.exports = router;
