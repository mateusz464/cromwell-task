import {JwtPayload} from "jsonwebtoken";
import JWTUser from "../interfaces/JWTUser";

// Check if user is of type JWTUser
export default function isJWTUser(user: string | JwtPayload | undefined): user is JWTUser {
  return (user as JWTUser).id !== undefined;
}