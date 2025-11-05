import express from "express";
import {
  Login,
  Logout,
  Register,
  updateProfile,
} from "../controller/auth.controller.js";
import { authenticateUser } from "../lib/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", Register);
authRouter.post("/logout", Logout);
authRouter.post("/login", Login);
authRouter.get("/check", authenticateUser, (req, res) =>
  res.status(200).json(req.user),
);
authRouter.put("/update", authenticateUser, updateProfile);

export default authRouter;
