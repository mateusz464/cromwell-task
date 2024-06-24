import decodeJWT from "../../utils/decodeJWT";
import jwt from "jsonwebtoken";

describe("decodeJWT", () => {
  beforeEach(() => {
    process.env.JWT_SECRET = "test_secret";
  });

  it("should return null when an invalid token is passed", () => {
    const token = "invalid_token";
    const user = decodeJWT(token);
    expect(user).toBeNull();
  });

  it("should return the correct user data when a valid token is passed", () => {
    const payload = { id: "123", email: "test@example.com" };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    const user = decodeJWT(token);
    expect(user).toEqual(expect.objectContaining(payload));
  });
});
