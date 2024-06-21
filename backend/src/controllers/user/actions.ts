import { Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "./queries";

export async function getTheUserByEmail(email: string, res: Response) {
  const user = await getUserByEmail(email);

  if (!user) {
    if (!res.headersSent) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  }

  return user;
}

export async function createTheUser(name: string, email: string, password: string, res: Response) {
  // Check if user already exists
  const user = await getUserByEmail(email);
  if (user) {
    if (!res.headersSent) {
      res.status(409).json({ message: "User already exists" });
      return;
    }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const response = await createUser(name, email, hashedPassword);

  if (!response) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }
  }

  return response;
}

export async function userLogin(email: string, password: string, res: Response) {
  const user = await getUserByEmail(email);

  if (!user) {
    if (!res.headersSent) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    return;
  }

  // Check if password matches
  const hashedPassword = user.password;
  const validPassword = await bcrypt.compare(password, hashedPassword);

  if (validPassword) {
    return user;
  } else {
    if (!res.headersSent) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
  }
}