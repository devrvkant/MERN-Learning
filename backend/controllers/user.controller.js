import bycrypt from "bcrypt";

import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser)
      res.status(400).json({
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

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find(); // newest first(for sorting todos in same order as they created)
    res.status(200).json(allUsers);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error, Please try again later!" });
  }
};

export const loginUser = async (req, res) => {
  try {
  } catch (err) {}
};
