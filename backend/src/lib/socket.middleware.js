import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuthenticate = async (socket, next) => {
  try {
    const token = socket.handshake.headers?.cookie
      ?.split("; ")
      .find((text) => text.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) return next(new Error("Token does not Exists"));

    const decode = jwt.verify(token, process.env.jwt_secret);
    if (!decode) return next(new Error("Token Exists but not valid"));

    const user = await User.findById(decode.userId);
    if (!user) return next(new Error("User does not exists"));

    socket.userId = user._id;
    socket.user = user;
    next();
  } catch (err) {
    return next(new Error("Error in socketAuthenticate"));
  }
};
