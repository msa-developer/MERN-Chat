import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import connectdb from "./db.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();
const app = express();
app.use(express.json({ limit: "15mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", authRouter);

connectdb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("running on port ", process.env.PORT);
  });
});
