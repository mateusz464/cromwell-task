import { Request, Response } from "express";
import { createUser, getUser, login } from "../../controllers/user/endpoints";
import {
  createTheUser,
  getTheUser,
  userLogin,
} from "../../controllers/user/actions";

jest.mock("../../controllers/user/actions");

describe("createUser", () => {
  beforeEach(() => {
    (createTheUser as jest.Mock).mockClear();
  });

  it("should return error when user's name, email or password is not provided", async () => {
    // Mocking empty request body
    const mockRequest = {
      body: {},
    } as unknown as Request;

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createUser(mockRequest, mockResponse);

    // Expecting the response to be 400 with the correct message
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "User's name, email or password is not provided",
    });
  });

  it("should return the correct user when user creation is successful", async () => {
    // Mocking correct request body
    const mockRequest = {
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      },
    } as unknown as Request;

    // Mocking the createTheUser function to return a JWT token
    (createTheUser as jest.Mock).mockResolvedValue({
      jwt: "jwtToken",
    });

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await createUser(mockRequest, mockResponse);

    // Expecting the response to be 201 with the correct JWT token
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      jwt: "jwtToken",
    });
  });
});

describe("login", () => {
  beforeEach(() => {
    (userLogin as jest.Mock).mockClear();
  });

  it("should return error when user's email or password is not provided", async () => {
    // Mocking empty request body
    const mockRequest = {
      body: {},
    } as unknown as Request;

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await login(mockRequest, mockResponse);

    // Expecting the response to be 400 with the correct message
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "User's email or password is not provided",
    });
  });

  it("should return the correct user when login is successful", async () => {
    // Mocking correct request body
    const mockRequest = {
      body: {
        email: "test@example.com",
        password: "password",
      },
    } as unknown as Request;

    (userLogin as jest.Mock).mockResolvedValue({
      jwt: "jwtToken",
    });

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await login(mockRequest, mockResponse);

    // Expecting the response to be 200 with the correct JWT token
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      jwt: "jwtToken",
    });
  });
});

describe("getUser", () => {
  beforeEach(() => {
    (getTheUser as jest.Mock).mockClear();
  });

  it("should return error when token is not provided", async () => {
    // Mocking empty authorization header
    const mockRequest = {
      headers: {},
    } as unknown as Request;

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUser(mockRequest, mockResponse);

    // Expecting the response to be 403
    expect(mockResponse.status).toHaveBeenCalledWith(403);
  });

  it("should return the correct user when user retrieval is successful", async () => {
    // Mocking correct authorization header
    const mockRequest = {
      headers: {
        authorization: "Bearer jwtToken",
      },
    } as unknown as Request;

    (getTheUser as jest.Mock).mockResolvedValue({
      _id: "123",
      name: "Test User",
      email: "test@example.com",
    });

    const mockResponse = {
      headersSent: false,
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getUser(mockRequest, mockResponse);

    // Expecting the response to be 200 with the correct user data
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      _id: "123",
      name: "Test User",
      email: "test@example.com",
    });
  });
});
