import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/autRouter.js";
import connectdb from "./db.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/message.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

connectdb().then(() => {
  app.listen(5001, () => {
    console.log("running on port ", 5001);
  });
});
