import express from "express";
const router = express.Router();

// Import endpoints
import {createUser, login, getUser} from "../controllers/user/endpoints";
import verifyToken from "../middleware/verifyToken";

// Routes
router
  .route("/")
  .get(verifyToken, getUser)

router
  .route("/login")
  .post(login);

router
  .route("/register")
  .post(createUser);

export default router;