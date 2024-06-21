import express from "express";
const router = express.Router();

// Import endpoints
import {getUserByEmail, createUser, login} from "../controllers/user/endpoints";

// Routes
router
  .route("/:id")
  .get(getUserByEmail);

router
  .route("/login")
  .post(login);

router
  .route("/register")
  .post(createUser);

export default router;