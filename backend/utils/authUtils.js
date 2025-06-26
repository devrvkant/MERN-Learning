import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateVerificationToken = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const generateTokenAndSetCookie = (res, userId) => {
  // jwt - token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  // now set it into client's cookie(Browser :- frontend user)
  res.cookie("authToken", token, {
    httpOnly: true, // to prevent XSS attacks
    secure: process.env.NODE_ENV === "Production", // because in development we have http and in production we have https
    sameSite: "strict", // to prevent csrf attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 Days
  });
  // after setting up the cookie in response finally reutrn the token for using later
  return token;
};
