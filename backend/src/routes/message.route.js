import express from "express";
import { getContacts } from "../controller/message.controller.js";

const messageRouter = express.Router();
messageRouter.get("/contacts", getContacts);

export default messageRouter;
