import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "./queries";
import decodeJWT from "../../utils/decodeJWT";

export async function createTheUser(
  name: string,
  email: string,
  password: string,
  res: Response,
) {
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
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const response = await createUser(name, email, hashedPassword);

  if (!response) {
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to create user" });
      return;
    }
    return;
  }

  const token = jwt.sign(
    { id: response._id, email: response.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: "24h",
    },
  );

  return {
    jwt: token,
  };
}

export async function userLogin(
  email: string,
  password: string,
  res: Response,
) {
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
    // Create and assign token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24h",
      },
    );

    return {
      jwt: token,
    };
  } else {
    if (!res.headersSent) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
  }
}

export async function getTheUser(token: string, res: Response) {
  // Uses decoded JWT information to get user
  const decoded = decodeJWT(token);
  if (!decoded) {
    if (!res.headersSent) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    return;
  }

  const user = await getUserByEmail(decoded.email);
  if (!user) {
    if (!res.headersSent) {
      res.status(404).json({ message: "User not found" });
      return;
    }
  }

  return user;
}
