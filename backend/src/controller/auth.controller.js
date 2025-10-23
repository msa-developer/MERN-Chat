import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../lib/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Please fill all the details" });

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should be minimum 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email Already In Use" });

    let profileImg = "";
    if (profilePic) {
      const uploadedProfile = await cloudinary.uploader.upload(profilePic);
      profileImg = uploadedProfile.secure_url;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPass,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json(newUser);
    } else {
      res
        .status(400)
        .json({ message: "Something went wrong while creating the user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error In signup function" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ message: "User logged Out successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "Please fill all the details" });

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password should be minimum 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return res.status(400).json({ message: "Incorrect Password" });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error In login function" });
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    if (!profilePic)
      return res.status(400).json({ message: "Please Upload the profile" });

    const uploadedPic = await cloudinary.uploader.upload(profilePic);
    const picUrl = uploadedPic.secure_url;

    const user = await User.findByIdAndUpdate(req.user._id, {
      profilePic: picUrl,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erorr in updateProfile function" });
  }
};
