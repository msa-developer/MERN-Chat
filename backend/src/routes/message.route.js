import express from "express";
import {
  Contacts,
  MessagesOfUser,
  Partners,
  sendMessage,
} from "../controller/message.controller.js";
import { authenticateUser } from "../middleware/authenticateUser.js";

const messageRouter = express.Router();

messageRouter.use(authenticateUser);
messageRouter.get("/contacts", Contacts);
messageRouter.get("/chats", Partners);
messageRouter.get("/:id", MessagesOfUser);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
