import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import connectdb from "./db.js";
import messageRouter from "./routes/message.route.js";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const __dirname = path.resolve();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")),
  );
}

connectdb().then(() => {
  app.listen(process.env.port || 5001, () =>
    console.log("running on port : ", process.env.port || 5001),
  );
});
