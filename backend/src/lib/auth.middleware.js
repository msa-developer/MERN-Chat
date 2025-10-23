import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(403).json({ message: "User not authenticated" });

    const verifyToken = jwt.verify(token, process.env.jwt_secret);
    if (!verifyToken)
      return res.status(403).json({ message: "Token exists but not valid" });

    const user = await User.findById(verifyToken.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error In authenticateUser function" });
    next(error);
  }
};
