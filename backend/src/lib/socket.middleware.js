import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuthenticate = async (socket, next) => {
  try {
    const token = socket.handshake.headers
      .split("; ")
      .find((text) => text.startsWith("jwt="))
      .split("=")[1];
    if (!token) return next(new Error("token does not exists"));

    const decode = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(decode.userId).select("-password");
    if (!user) return next(new Error("User Not Found"));
    req.socket = user;
    req.socketId = user._id;
    next();
  } catch (err) {
    next(err);
  }
};
