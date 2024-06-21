import JWTUser from "../interfaces/JWTUser";
import jwt, {JwtPayload} from "jsonwebtoken";
import isJWTUser from "./isJWTUser";

export default function decodeJWT(token: string): JWTUser | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

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