import express from "express";
import {
  Contacts,
  messageById,
  Partners,
  sendMessage,
} from "../controller/message.controller.js";
import { authenticateUser } from "../lib/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.use(authenticateUser);
messageRouter.get("/contacts", Contacts);
messageRouter.get("/partners", Partners);
messageRouter.get("/:id", messageById);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
