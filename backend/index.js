import express from "express";

import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToMongoDB from "./mongoDB.js";
import todoRouter from "./routes/todos.routes.js";
import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT || 5500;
const app = express();

// using middlewares
app.use(express.json()); // allow us to parse incoming requests :- req.body
app.use(
  cors({
    origin: "http://localhost:5173", // specify the exact frontend origin
    credentials: true, // allow credentials (cookies, authorization headers)
  })
); // prevent from CORS errors(allow cross origin access)
app.use(cookieParser()); // allow us to parse incoming cookies

// using routes
app.use("/api/todos", todoRouter);
app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // connect to DB initially with server starting
  connectToMongoDB();
});
