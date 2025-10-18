import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import CookieParser from "cookie-parser";
import connectdb from "./db.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();

const app = express();
app.use(CookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

connectdb().then(() => {
  app.listen(process.env.port, () =>
    console.log("running on port : ", process.env.port),
  );
});
