import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import CustomRequest from "../interfaces/CustomRequest";
import JWTUser from "../interfaces/JWTUser";

export default function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  // Check if token is provided
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "string") {
    // Forbidden
    return res.sendStatus(403);
  }

  // Set token
  const bearer = authHeader.split(" ");
  req.token = bearer[1];

  // Verify token
  jwt.verify(req.token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      // Forbidden
      return res.sendStatus(403);
    }

    // Check if user is of type JWTUser
    if (isJWTUser(user)) {
      // Set user
      req.user = user;
      // Continue
      next();
    } else {
      // Invalid token
      return res.sendStatus(403);
    }
  });
}

// Check if user is of type JWTUser
function isJWTUser(user: string | JwtPayload | undefined): user is JWTUser {
  return (user as JWTUser).id !== undefined;
}