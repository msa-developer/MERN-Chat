import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.jwt_secret, {
    expiresIn: "7d",
  });
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
  });
  return token;
};
