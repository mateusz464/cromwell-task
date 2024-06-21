import {Request, Response} from "express";
import {createTheUser, getTheUserByEmail, userLogin} from "./actions";

export async function getUserByEmail(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    if (!res.headersSent) {
      res.status(400).json({ message: "User's email is not provided" });
    }
  }

  const response = await getTheUserByEmail(id, res);

  return res.status(200).json(response);
}

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