import User from "../models/User.js";
import Message from "../models/Message.js";
import { v2 as cloudinary } from "cloudinary";

export const Contacts = async (req, res) => {
  try {
    const user = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password",
    );
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In Contacts function" });
  }
};

export const messageById = async (req, res) => {
  try {
    const message = await Message.find({
      $or: [
        { sendersId: req.user._id, recieversId: req.params.id },
        { sendersId: req.params.id, recieversId: req.user._id },
      ],
    });
    res.status(200).json(message);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In messageById function" });
  }
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  try {
    let imgUrl;
    if (image) {
      const uploadedImg = await cloudinary.uploader.upload(image);
      imgUrl = uploadedImg.secure_url;
    }

    const message = new Message({
      sendersId: req.user._id,
      recieversId: req.params.id,
      text,
      image: imgUrl,
    });

    await message.save();

    res.status(201).json(message);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In sendMessage function" });
  }
};

export const Partners = async (req, res) => {
  try {
    const message = await Message.find({
      $or: [{ sendersId: req.user._id }, { recieversId: req.user._id }],
    });

    const partnersIds = [
      ...new Set(
        message.map((msg) =>
          msg.sendersId.toString() === req.user._id.toString()
            ? msg.recieversId.toString()
            : msg.sendersId.toString(),
        ),
      ),
    ];

    const user = await User.find({ _id: { $in: partnersIds } });
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In Partners function" });
  }
};
