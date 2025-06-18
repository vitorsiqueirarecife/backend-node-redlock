const express = require('express');
const router = express.Router();
const { getLeadershipStatus } = require('../lib/leader');

router.get('/', (req, res) => {
  const status = getLeadershipStatus();
  res.json(status);
});

module.exports = router;
