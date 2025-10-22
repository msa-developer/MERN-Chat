import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sendersId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    recieversId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model("message", messageSchema);

export default Message;
