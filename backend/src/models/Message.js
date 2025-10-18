import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sendersId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    recieversId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
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
