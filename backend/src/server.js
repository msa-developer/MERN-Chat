import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import connectdb from "./db.js";
import messageRouter from "./routes/message.route.js";
import cors from "cors";
import path from "path";

dotenv.config();
const __dirname = path.resolve();
const app = express();

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

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

connectdb().then(() => {
  app.listen(process.env.port, () =>
    console.log("running on port : ", process.env.port),
  );
});
