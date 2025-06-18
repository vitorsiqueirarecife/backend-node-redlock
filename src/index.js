require("dotenv").config();
const express = require("express");
const statusRoute = require("./routes/status");
const { startPollingTask, onLeadershipChange } = require("./tasks/poll");
const { initLeaderElection } = require("./lib/leader");
const { port } = require("./utils/port");

const app = express();

app.use("/status", statusRoute);

app.listen(port, async () => {
  console.log(`Running on port ${port}`);
  await initLeaderElection(onLeadershipChange);
  startPollingTask();
});
