import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import connectdb from "./db.js";
import messageRouter from "./routes/message.route.js";
import cors from "cors";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __dirname = path.resolve();
const app = express();

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (_, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")),
  );
}

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

connectdb().then(() => {
  app.listen(process.env.PORT, () =>
    console.log("running on port : ", process.env.PORT),
  );
});
