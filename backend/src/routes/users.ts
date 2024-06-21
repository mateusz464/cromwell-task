import express from "express";
const router = express.Router();

// Import endpoints
import { getUserByEmail, createUser } from "../controllers/user/endpoints";

// Routes
router
  .route("/:id")
  .get(getUserByEmail);

router
  .route("/register")
  .post(createUser);

export default router;