import User from "../models/User.js";
import Message from "../models/Message.js";

export const Contacts = async (req, res) => {
  try {
    const contacts = await User.find({ _id: { $ne: req.user_id } });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in Contacts function" });
  }
};

export const messageById = async (req, res) => {
  try {
    const message = await Message.find({
      _id: {
        $or: [
          { sendersId: req.user._id, recieversId: req.params.id },
          { sendersId: req.params.id, recieversId: req.user._id },
        ],
      },
    });
    res.status(200).json(message);
  } catch (err) {
    console.error(err);
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
      text,
      image: imgUrl,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error In sendMessage function" });
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
          msg.sendersId.toString() === req.user._id
            ? msg.recieversId.toString()
            : msg.sendersId.toString(),
        ),
      ),
    ];

    const partners = await User.find({ _id: { $in: partnerIds } });
    res.status(200).json(partners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erorr In Partners function" });
  }
};
