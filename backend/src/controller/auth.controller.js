import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

export const SignIn = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Please fill all the details" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be minimum 6 characters" });

    const salt = await bcrypt.salt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashPass,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json(newUser);
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In SignIn function" });
  }
};

export const Login = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!password || !email)
      return res.status(400).json({ message: "Please fill all the details" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be minimum 6 characters" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User does not Exist Please SignIn" });

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return res.status(400).json({ message: "Incorrect Password" });

    generateToken(user._id, res);

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In Login function" });
  }
};

export const Logout = async (_, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ message: "User logged Out Successfully" });
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    if (!profilePic)
      return res.status(400).json({ message: "Please upload the image" });

    const uploadedPic = await cloudinary.uploader.upload(profilePic);
    const PicUrl = uploadedPic.secure_url;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: PicUrl,
      },
      { new: true },
    );

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error In updateProfile function" });
  }
};
