import User from "../models/User.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../lib/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  try {
    if (!fullName || !email || !password)
      return res.status(500).json({ message: "Please fill all the details" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password should be minimum 6 Characters" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email Already In Use" });

    let profileUrl = null;
    if (profilePic) {
      const uploadedProfile = await cloudinary.uploader.upload(profilePic);
      profileUrl = uploadedProfile.secure_url;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPass,
      profilePic: profileUrl,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: "failed to create new User" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in signup function" });
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!password || !email)
      return res.status(200).json({ message: "Please fll all the details" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password should be minimum 6 Characters" });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exists" });

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return res.status(400).json({ message: "Invalid Password" });

    generateToken(user._id, res);

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error In login function" });
  }
};

export const logout = async (_, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ message: "User logged out successfully" });
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  try {
    if (!profilePic)
      return res.status(400).json({ message: "Please upload the profile" });

    let profileUrl = null;
    if (profilePic) {
      const uploadedProfile = await cloudinary.uploader.upload(profilePic);
      profileUrl = uploadedProfile.secure_url;
    }

    await User.findByIdAndUpdate(req.user._id, {
      profilePic: profileUrl,
    });

    res.status(200).json({ message: "Updated the profile SuccessFully" });
  } catch (err) {
    console.error(err);
  }
};
