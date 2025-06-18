require('dotenv').config();
const express = require('express');
const statusRoute = require('./routes/status');
const { startPollingTask } = require('./tasks/poll');
const { initLeaderElection } = require('./lib/leader');

const app = express();
const port = process.env.PORT || 3000;

// Routes
app.use('/status', statusRoute);

app.listen(port, async () => {
  console.log(`Node app running on port ${port}`);
  await initLeaderElection();  // You implement
  startPollingTask();          // You implement gated runner
});
