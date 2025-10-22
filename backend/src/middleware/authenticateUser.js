import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(403)
        .json({ message: "Invalid User Not authenticated" });

    const decode = jwt.verify(token, process.env.jwt_secret);
    if (!decode)
      return res
        .status(403)
        .json({ message: "token exists but user not authenticated" });

    const user = await User.findById(decode.userId).select("-password");
    if (!user) return res.status(404).json({ message: "user not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default authenticateUser;
