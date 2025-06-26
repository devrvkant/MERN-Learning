import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import {
  generateVerificationToken,
  generateTokenAndSetCookie,
} from "../utils/authUtils.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if(!name || !email || !password) return res.status(400).json({
      success: false,
      message: "Name,email and password all fields are required!"
    })

    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { name }],
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
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate verificationToken
    const verificationToken = generateVerificationToken();

    // create the new user in dB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // now generate userToken(JWT-token) and sendIt to client with a cookie to authenticate(login automatically) the client
    generateTokenAndSetCookie(res, user._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        ...user._doc,
        password: undefined,
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
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching)
      return res.status(400).json({
        success: false,
        message: "Invalid user credentials!",
      });
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

export const logOut = async (req, res) => {};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err.message);
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error, Please try again later!" });
  }
};
