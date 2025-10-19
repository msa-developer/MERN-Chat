import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "token does not exists user is not authenticated" });

    const verifyToken = jwt.verify(token, process.env.jwt_secret);
    if (!verifyToken)
      return res.status(401).json({ message: "User has token but not valid" });

    const user = await User.findById(verifyToken.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
