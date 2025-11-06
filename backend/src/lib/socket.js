import express from "express";
import { Server } from "socket.io";
import http from "http";
import { socketAuthenticate } from "./socket.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// userId -> socketId
const socketMap = {};

export const Reciever = (userId) => {
  return socketMap[userId];
};

io.use(socketAuthenticate);

io.on("connection", (socket) => {
  console.log("User connected:", socket.userId?.toString());

  const userId = socket.userId?.toString();
  if (userId) {
    socketMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(socketMap));

  socket.on("disconnect", () => {
    if (userId) {
      delete socketMap[userId];
    }
    io.emit("onlineUsers", Object.keys(socketMap));
  });
});

export { app, io, server };
