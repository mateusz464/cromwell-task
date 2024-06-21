import {Request, Response} from "express";
import {createTheUser, getTheUser, userLogin} from "./actions";

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    if (!res.headersSent) {
      res.status(400).json({ message: "User's name, email or password is not provided" });
    }
  }

  const response = await createTheUser(name, email, password, res);

  return res.status(201).json(response);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    if (!res.headersSent) {
      res.status(400).json({ message: "User's email or password is not provided" });
    }
  }

  const response = await userLogin(email, password, res);

  if (response) {
    return res.status(200).json(response);
  }
}

export async function getUser(req: Request, res: Response) {
  const authHeader = req.headers["authorization"];
  if (typeof authHeader !== "string") {
    return res.sendStatus(403);
  }

  const bearer = authHeader.split(" ");
  const token = bearer[1];

  const response = await getTheUser(token, res);

  return res.status(200).json(response);
}