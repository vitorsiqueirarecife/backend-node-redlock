require("dotenv").config();
const express = require("express");
const statusRoute = require("./routes/status");
const { startPolling, onChangePollSlot } = require("./tasks/poll");
const { initElection } = require("./lib/leader.service");
const { port } = require("./utils/port");

const app = express();

app.use("/status", statusRoute);

app.listen(port, async () => {
  console.log(`Running on port ${port}`);
  // two ways. election and polling
  await initElection(onChangePollSlot);
  startPolling();
});
