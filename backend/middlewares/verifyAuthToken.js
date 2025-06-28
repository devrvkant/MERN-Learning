import jwt from "jsonwebtoken";

const verifyAuthToken = (req, res, next) => {
  try {
    const authToken = req.cookies.authToken;
    if (!authToken)
      return res.status(401).json({
        status: false,
        message: "Unauthorized - no authToken provided!",
      });
    // now decode the authToken
    // 1. first decode it
    const decodedAuthToken = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!decodedAuthToken)
      return res.status(401).json({
        status: false,
        message: "Unauthorized - invalid token!",
      });
    // 2. and then attach the userId to req
    req.userId = decodedAuthToken.userId;
    // finally call the next function
    next();
  } catch (err) {
    console.error("Error in verifying authToken : ", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error, Please try again later!",
    });
  }
};
export default verifyAuthToken;
