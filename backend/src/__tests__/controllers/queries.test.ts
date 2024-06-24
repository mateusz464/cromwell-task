import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Users from "../../models/Users";
import {
  getUserByEmail,
  createUser,
  getUserByEmailNoPassword,
} from "../../controllers/user/queries";

describe("User queries", () => {
  // Setting up a MongoDB memory server (mock database)
  const mongoMemoryServer = new MongoMemoryServer();

  beforeAll(async () => {
    // Connect to the MongoDB memory server
    await mongoMemoryServer.start();
    const uri = mongoMemoryServer.getUri();
    await mongoose.connect(uri, { maxPoolSize: 10, socketTimeoutMS: 30000 });
  });

  afterAll(async () => {
    // Disconnect from the MongoDB memory server
    await mongoose.connection.close();
    await mongoMemoryServer.stop();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await Users.deleteMany({});
  });

  describe("getUserByEmail", () => {
    it("should return null when no user with the provided email exists", async () => {
      // Test the function with a non-existent email
      const user = await getUserByEmail("test@example.com");

      // Expect the function to return null
      expect(user).toBeNull();
    });

    it("should return the correct user when a user with the provided email exists", async () => {
      // Create a user with the provided email
      const expectedUser = new Users({
        name: "Test User",
        email: "test@example.com",
        password: "password",
      });
      await expectedUser.save();

      const user = await getUserByEmail("test@example.com");

      // Expect the function to return the correct user
      expect(user).not.toBeNull();
      expect(user!.email).toBe(expectedUser.email);
    });
  });

  describe("createUser", () => {
    it("should return null when user creation fails", async () => {
      // Testing the function with an empty password
      const user = await createUser("Test User", "test@example.com", "");
      expect(user).toBeNull();
    });

    it("should return the correct user when user creation is successful", async () => {
      const expectedUser = {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      };
      const user = await createUser(
        expectedUser.name,
        expectedUser.email,
        expectedUser.password,
      );

      // Expecting the function to return the correct user
      expect(user).not.toBeNull();
      expect(user!.email).toBe(expectedUser.email);
    });
  });

  describe("getUserByEmailNoPassword", () => {
    it("should return null when no user with the provided email exists", async () => {
      // Testing the function with a non-existent email
      const user = await getUserByEmailNoPassword("test@example.com");

      // Expecting the function to return null
      expect(user).toBeNull();
    });

    it("should return the correct user when a user with the provided email exists", async () => {
      // Creating a user with the provided email
      const expectedUser = new Users({
        name: "Test User",
        email: "test@example.com",
        password: "password",
      });
      await expectedUser.save();

      const user = await getUserByEmailNoPassword("test@example.com");

      // Expecting the function to return the correct user
      expect(user).not.toBeNull();
      expect(user!.email).toBe(expectedUser.email);
    });
  });
});
