import verifyToken from "../../middleware/verifyToken";
import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

describe("verifyToken", () => {
  // Any types used due to actual types throwing errors
  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    // Set JWT_SECRET to a test value
    process.env.JWT_SECRET = "test_secret";
    mockRequest = {
      headers: {},
      token: null,
      user: null,
    };
    mockResponse = {
      sendStatus: jest.fn(),
    };
  });

  it("should return 403 when no authorization header is provided", () => {
    verifyToken(mockRequest, mockResponse as Response, nextFunction);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(403);
  });

  it("should return 403 when an invalid token is passed", () => {
    mockRequest.headers["authorization"] = "Bearer invalid_token";
    verifyToken(mockRequest, mockResponse as Response, nextFunction);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(403);
  });

  it("should call next when a valid token is passed", () => {
    const payload = { id: "123", email: "test@example.com" };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    mockRequest.headers["authorization"] = `Bearer ${token}`;
    verifyToken(mockRequest, mockResponse as Response, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });
});
