import Message from "../models/Message.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

export const allContacts = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password",
    );
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in allContacts" });
  }
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  try {
    let imgUrl = null;
    if (image) {
      const uploadedImg = await cloudinary.uploader.upload(image);
      imgUrl = uploadedImg.secure_url;
    }

    const newMessage = new Message({
      sendersId: req.user._id,
      recieversId: req.params.id,
      text,
      image: imgUrl,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error in sendMessage" });
  }
};

export const messageById = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sendersId: req.user._id, recieversId: req.params.id },
        { sendersId: req.params.id, reciversId: req.user._id },
      ],
    }).select("-password");
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in messageById" });
  }
};

export const Partners = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sendersId: req.user._id }, { recieversId: req.user._id }],
    }).select("-password");

    const partnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.sendersId.toString() === req.user._id.toString()
            ? msg.recieversId.toString()
            : msg.sendersId.toString(),
        ),
      ),
    ];

    const partners = await User.find({ _id: { $in: partnerIds } });
    res.status(200).json(partners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in Partners function" });
  }
};
