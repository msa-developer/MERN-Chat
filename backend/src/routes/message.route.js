import express from "express";
import {
  Contacts,
  messageById,
  Partners,
  sendMessage,
} from "../controller/message.controller.js";
import { checkAuth } from "../lib/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.use(checkAuth);

messageRouter.get("/contacts", Contacts);
messageRouter.get("/partners", Partners);
messageRouter.post("/send/:id", sendMessage);
messageRouter.get("/:id", messageById);

export default messageRouter;
