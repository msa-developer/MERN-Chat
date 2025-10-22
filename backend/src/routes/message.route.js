import express from "express";
import {
  allContacts,
  messageById,
  Partners,
  sendMessage,
} from "../controller/message.controller.js";
import authenticateUser from "../middleware/authenticateUser.js";

const messageRouter = express.Router();

messageRouter.use(authenticateUser);
messageRouter.get("/contacts", allContacts);
messageRouter.get("/chats", Partners);
messageRouter.get("/:id", messageById);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
