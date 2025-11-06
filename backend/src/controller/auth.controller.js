import generateToken from "../lib/generateToken.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const Register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Please fill all the details" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "password should be minimum 6 characters" });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      return res.status(500).json({ message: "Invalid Email" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already Exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPass,
    });

    await newUser.save();
    generateToken(newUser._id, res);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in Register function" });
  }
};

export const Logout = (_, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged Out Successfully" });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all the details" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "password should be minimum 6 characters" });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      return res.status(500).json({ message: "Invalid Email" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No User Found" });

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return res.status(400).json({ message: "Incorrect password" });

    generateToken(user._id, res);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in Login function" });
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    const uploadedProfile = await cloudinary.uploader.upload(profilePic);
    const profile_url = uploadedProfile.secure_url;

    await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: profile_url,
      },
      { new: true },
    );
    res.status(200).json({ message: "Update Profile SuccessFully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error in updateProfile function" });
  }
};
