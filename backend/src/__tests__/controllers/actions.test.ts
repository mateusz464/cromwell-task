import {
  createUser,
  getUserByEmail,
  getUserByEmailNoPassword,
} from "../../controllers/user/queries";
import {
  createTheUser,
  getTheUser,
  userLogin,
} from "../../controllers/user/actions";
import { Response } from "express";
import bcrypt from "bcryptjs";
import decodeJWT from "../../utils/decodeJWT";

jest.mock("../../controllers/user/queries");
jest.mock("../../utils/decodeJWT");

describe("createTheUser", () => {
  beforeEach(() => {
    (getUserByEmail as jest.Mock).mockClear();
    (createUser as jest.Mock).mockClear();
  });

  it("should return error when user already exists", async () => {
    // Mock the getUserByEmail function to return a user, simulating that the user already exists
    (getUserByEmail as jest.Mock).mockResolvedValue({});

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call the function with the mock data
    const response = await createTheUser(
      "Test User",
      "test@example.com",
      "password",
      mockResponse,
    );

    // Response should be undefined
    expect(response).toBeUndefined();
  });

  it("should return the correct user when user creation is successful", async () => {
    // Mocking the getUserByEmail function to return null, simulating that the user does not exist yet
    (getUserByEmail as jest.Mock).mockResolvedValue(null);
    // Mock the createUser function to return a user
    (createUser as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "test@example.com",
    });

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call the function with the mock data
    const response = await createTheUser(
      "Test User",
      "test@example.com",
      "password",
      mockResponse,
    );

    // Response should not be null and should contain the JWT token
    expect(response).not.toBeNull();
    expect(response!.jwt).toBeDefined();
  });
});

describe("userLogin", () => {
  beforeEach(() => {
    (getUserByEmail as jest.Mock).mockClear();
  });

  it("should return error when user does not exist", async () => {
    // Mocking the getUserByEmail function to return null, simulating that the user does not exist
    (getUserByEmail as jest.Mock).mockResolvedValue(null);

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    // Call the function with the mock data
    const response = await userLogin(
      "test@example.com",
      "password",
      mockResponse,
    );

    // Response should be undefined and the status should be 404 with the correct message
    expect(response).toBeUndefined();
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "User not found",
    });
  });

  it("should return error when password does not match", async () => {
    // The incorrect password is hashed
    const hashedPassword = await bcrypt.hash("differentPassword", 10);
    (getUserByEmail as jest.Mock).mockResolvedValue({
      password: hashedPassword,
    });

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const response = await userLogin(
      "test@example.com",
      "password",
      mockResponse,
    );

    // Response should be undefined and the status should be 401 with the correct message
    expect(response).toBeUndefined();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid credentials",
    });
  });

  it("should return the correct user when login is successful", async () => {
    // The correct password is hashed
    const hashedPassword = await bcrypt.hash("password", 10);
    (getUserByEmail as jest.Mock).mockResolvedValue({
      _id: "123",
      email: "test@example.com",
      password: hashedPassword,
    });

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const response = await userLogin(
      "test@example.com",
      "password",
      mockResponse,
    );

    // Response should not be null and should contain the JWT token
    expect(response).not.toBeNull();
    expect(response!.jwt).toBeDefined();
  });
});

describe("getTheUser", () => {
  beforeEach(() => {
    (getUserByEmailNoPassword as jest.Mock).mockClear();
    (decodeJWT as jest.Mock).mockClear();
  });

  it("should return error when token is invalid", async () => {
    // Mocking the decodeJWT function to return null, simulating that the token is invalid
    (decodeJWT as jest.Mock).mockReturnValue(null);

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const response = await getTheUser("invalidToken", mockResponse);

    // Response should be undefined and the status should be 401 with the correct message
    expect(response).toBeUndefined();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Invalid token",
    });
  });

  it("should return error when user does not exist", async () => {
    // Mocking the decodeJWT function to return the user's email
    (decodeJWT as jest.Mock).mockReturnValue({ email: "test@example.com" });
    // Mocking the getUserByEmailNoPassword function to return null, simulating that the user does not exist
    (getUserByEmailNoPassword as jest.Mock).mockResolvedValue(null);

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const response = await getTheUser("validToken", mockResponse);

    // Response should be undefined and the status should be 404 with the correct message
    expect(response).toBeUndefined();
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "User not found",
    });
  });

  it("should return the correct user when user retrieval is successful", async () => {
    // Mocking the decodeJWT function to return the user's email
    (decodeJWT as jest.Mock).mockReturnValue({ email: "test@example.com" });
    // Mocking the getUserByEmailNoPassword function to return a user
    (getUserByEmailNoPassword as jest.Mock).mockResolvedValue({
      _id: "123",
      name: "Test User",
      email: "test@example.com",
    });

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const response = await getTheUser("validToken", mockResponse);

    // Response should not be null and should contain the correct user data
    expect(response).not.toBeNull();
    expect(response!._id).toBe("123");
    expect(response!.email).toBe("test@example.com");
  });
});
