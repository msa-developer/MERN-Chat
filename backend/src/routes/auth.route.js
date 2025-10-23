import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { authenticateUser } from "../lib/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signIn", signup);
authRouter.post("/logout", logout);
authRouter.post("/login", login);
authRouter.put("/update_profile", authenticateUser, updateProfile);
authRouter.get("/check", authenticateUser, (req, res) =>
  res.status(200).json(req.user),
);

export default authRouter;
