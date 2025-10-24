import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(403).json({ message: "Token does not exists" });

    const decode = jwt.verify(token, process.env.jwt_secret);
    if (!decode) return res.status(403).json({ message: "Token is not valid" });

    const user = await User.findById(decode.userId).select("-password");
    if (!user) return res.status(403).json({ message: "user does not exists" });

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in authenticateUser function" });
  }
};
