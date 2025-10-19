import Message from "../models/Message.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

export const Contacts = async (req, res) => {
  try {
    const contacts = await User.find({
      _id: {
        $ne: req.user._id,
      },
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error In Contacts function" });
  }
};

export const Partners = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sendersId: req.user._id }, { recieversId: req.user._id }],
    });
    const partnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.sendersId.toString() === req.user._id.toString()
            ? msg.recieversId.toString()
            : msg.sendersId.toString(),
        ),
      ),
    ];
    const partners = await User.find({
      _id: { $in: partnerIds, $ne: req.user._id },
    }).select("-password");
    res.status(200).json(partners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error In Partners function" });
  }
};

export const sendMessage = async (req, res) => {
  const { text, image } = req.body;
  try {
    const sendersId = req.user._id;
    const { id: recieversId } = req.params;
    let imageUrl = null;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }
    const newMessage = new Message({
      sendersId,
      recieversId,
      text,
      image: imageUrl,
    });

    //going add realtime functionality
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error In sendMessage function" });
  }
};

export const MessagesOfUser = async (req, res) => {
  try {
    const message = await Message.find({
      $or: [
        { sendersId: req.user._id, recieversId: req.params.id },
        { sendersId: req.params.id, recieversId: req.user._id },
      ],
    });
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error In MessagesOfUser function" });
  }
};
