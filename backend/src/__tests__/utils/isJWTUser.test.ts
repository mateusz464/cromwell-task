import isJWTUser from "../../utils/isJWTUser";

describe("isJWTUser", () => {
  it("should return true when a valid JWTUser object is passed", () => {
    const user = { id: "123", email: "test@example.com" };
    const result = isJWTUser(user);
    expect(result).toBe(true);
  });

  it("should return false when an invalid object is passed", () => {
    const user = { email: "test@example.com" };
    const result = isJWTUser(user);
    expect(result).toBe(false);
  });
});
