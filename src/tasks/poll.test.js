require("dotenv").config({ path: ".env" });
jest.useFakeTimers();

const poll = require("./poll");
const leaderState = require("../lib/leader/leader.state");

jest.mock("../lib/leader/leader.state", () => ({
  setLastPolled: jest.fn(),
  isLeaderNow: jest.fn(),
}));

let pollingInterval;

describe("Polling logic", () => {
  afterEach(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterAll(() => {
    console.log.mockRestore();
    console.warn.mockRestore();
  });

  it("don't polling if not leader", () => {
    leaderState.isLeaderNow.mockReturnValue(false);
    poll.onChangePollSlot(false);
    pollingInterval = poll.startPolling();
    jest.advanceTimersByTime(1000);
    expect(leaderState.setLastPolled).not.toHaveBeenCalled();
  });

  it("should poll once per slot when leader", () => {
    leaderState.isLeaderNow.mockReturnValue(true);
    poll.onChangePollSlot(true);
    pollingInterval = poll.startPolling();
    jest.advanceTimersByTime(5000);
    expect(leaderState.setLastPolled).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(5000);
    expect(leaderState.setLastPolled).toHaveBeenCalledTimes(2);
  });
});
