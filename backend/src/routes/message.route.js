import express from "express";
import {
  getContacts,
  getMessagesById,
  getPartners,
  sendMessage,
} from "../controller/message.controller.js";
import { authenticateUser } from "../lib/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.use(authenticateUser);

messageRouter.get("/contacts", getContacts);
messageRouter.get("/partners", getPartners);
messageRouter.get("/:id", getMessagesById);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
