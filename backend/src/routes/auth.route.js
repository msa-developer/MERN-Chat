import express from "express";
import {
  Login,
  Logout,
  SignIn,
  updateProfile,
} from "../controller/auth.controller.js";
import { checkAuth } from "../lib/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signin", SignIn);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);

authRouter.put("/update_profile", checkAuth, updateProfile);

authRouter.get("/check", checkAuth, (req, res) =>
  res.status(200).json(req.user),
);

export default authRouter;
