import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlenght: 6,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

export default User;
