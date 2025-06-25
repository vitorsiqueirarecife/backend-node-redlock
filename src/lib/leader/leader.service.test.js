jest.useFakeTimers();

jest.mock("../redis/redlock", () => ({
  acquire: jest.fn(),
}));
jest.mock("../redis/redis", () => ({
  on: jest.fn(),
}));

const redlock = require("../redis/redlock");
const redis = require("../redis/redis");
const { initElection } = require("./leader.service");
const leaderState = require("./leader.state");

jest.mock("./leader.state", () => ({
  setLeadership: jest.fn(),
  setChangeCallback: jest.fn(),
}));

describe("Leader Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterAll(() => {
    console.log.mockRestore();
    console.warn.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should try to acquire the lock when starting election", async () => {
    redlock.acquire.mockResolvedValue({
      extend: jest.fn(),
      release: jest.fn(),
    });
    await initElection(jest.fn());
    expect(redlock.acquire).toHaveBeenCalled();
    expect(leaderState.setLeadership).toHaveBeenCalledWith(true);
    expect(leaderState.setChangeCallback).toHaveBeenCalled();
    expect(redis.on).toHaveBeenCalledWith("error", expect.any(Function));
  });

  it("should lose leadership if unable to acquire lock", async () => {
    redlock.acquire.mockRejectedValue(new Error("fail"));
    await initElection(jest.fn());
    expect(leaderState.setLeadership).toHaveBeenCalledWith(false);
  });
});
