const {
  setLeadership,
  setLastPolled,
  getLeadershipStatus,
  setChangeCallback,
  isLeaderNow,
} = require("./leader.state");

describe("Leader State", () => {
  it("should set leader", () => {
    setLeadership(true);
    expect(isLeaderNow()).toBe(true);
    setLeadership(false);
    expect(isLeaderNow()).toBe(false);
  });

  it("should set and return lastPolled", () => {
    setLastPolled("2025-06-25T12:00:00Z");
    expect(getLeadershipStatus().lastPolled).toBe("2025-06-25T12:00:00Z");
  });

  it("should call callback on leadership change", () => {
    const cb = jest.fn();
    setChangeCallback(cb);
    setLeadership(true);
    expect(cb).toHaveBeenCalledWith(true);
    setLeadership(false);
    expect(cb).toHaveBeenCalledWith(false);
  });
});
