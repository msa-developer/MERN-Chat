import User from "../models/User.js";
import Message from "../models/Message.js";
import { v2 as cloudinary } from "cloudinary";

export const getContacts = async (req, res) => {
  try {
    const user = await User.find({
      _id: {
        $ne: req.user._id,
      },
    }).select("-password");

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in getContacts function" });
  }
};

export const getMessagesById = async (req, res) => {
  try {
    const message = await Message.find({
      $or: [
        { sendersId: req.user_id, recievers: req.params.id },
        {
          sendersId: req.params.id,
          recieversId: req.user._id,
        },
      ],
    }).select("-password");
    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in getMessagesById function" });
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
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in sendMessage function" });
  }
};

export const getPartners = async (req, res) => {
  try {
    const allMessages = await Message.find({
      $or: [{ sendersId: req.user._id }, { recieversId: req.user._id }],
    });

    const partnersIds = [
      ...new Set(
        allMessages.map((msg) =>
          msg.sendersId.toString() === req.user._id.toString()
            ? msg.recieversId.toString()
            : msg.sendersId.toString(),
        ),
      ),
    ];

    const partners = await User.find({
      _id: {
        $in: partnersIds,
      },
    }).select("-password");

    res.status(200).json(partners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in getPartners function" });
  }
};
