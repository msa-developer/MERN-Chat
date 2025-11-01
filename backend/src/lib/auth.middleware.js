import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(403).json({ message: "User does not have token " });

    const verifyToken = jwt.verify(token, process.env.jwt_secret);
    if (!verifyToken)
      return res.status(403).json({ message: "Token Is not valid" });

    const user = await User.findById(verifyToken.userId).select("-password");
    req.user = user;
    next();
  } catch (e) {
    return res.status(500).json({ message: "Error in checkAuth function" });
  }
};
