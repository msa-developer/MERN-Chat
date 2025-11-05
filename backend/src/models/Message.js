import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sendersId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    recieversId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
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
