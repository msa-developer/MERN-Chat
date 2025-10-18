import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/logout", logout);
authRouter.post("/login", login);
authRouter.put("/update_profile", authenticateUser, updateProfile);
authRouter.get("/check", authenticateUser, (req, res) =>
  res.status(200).json(req.user._id),
);

export default authRouter;
