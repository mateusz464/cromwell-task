import JWTUser from "../interfaces/JWTUser";
import jwt, {JwtPayload} from "jsonwebtoken";
import isJWTUser from "./isJWTUser";

export default function decodeJWT(token: string): JWTUser | null {
  try {
    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Return user if valid
    if (isJWTUser(decoded)) {
      return decoded;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}