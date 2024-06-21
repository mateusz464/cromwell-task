import { Request } from "express";
import JWTUser from "./JWTUser";

export default interface CustomRequest extends Request {
  token?: string;
  user?: JWTUser;
}