import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import connectdb from "./db.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = path.resolve();
app.use(express.json({ limit: "15mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*splat}", (_, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")),
  );
}

connectdb().then(() => {
  server.listen(process.env.PORT, () => {
    console.log("running on port ", process.env.PORT);
  });
});
