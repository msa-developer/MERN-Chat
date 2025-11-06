import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { socketAuthenticate } from "./socket.middleware.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.use(socketAuthenticate);

const socketMap = {};

io.on("connection", (socket) => {
  console.log("connected to socket", socket.id);
});

export { app, io, server };
