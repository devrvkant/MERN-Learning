import "dotenv/config";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser)
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "Email is already registered!"
            : "Username is already taken!",
      });

    // hash the user password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // create the user
    const newelyCreatedUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    // find if provided username(user) exists in dB or not
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "Invalid user credentials!",
      });
    // now check if password is correct or not
    const isMatching = await bycrypt.compare(password, user.password);
    if (!isMatching)
      return res.status(400).json({
        success: false,
        message: "Invalid user credentials!",
      });
    // now generate userToken(JWT-token)
    const userToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      userToken,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};

export const logOut = async (req,res) =>{

}

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find(); // newest first(for sorting todos in same order as they created)
    return res.status(200).json(allUsers);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error, Please try again later!" });
  }
};
