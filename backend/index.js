import express from "express";

import cors from "cors";

import connectToMongoDB from "./mongoDB.js";
import todoRouter from "./routes/todos.routes.js";
import userRouter from "./routes/user.routes.js";

const PORT = 5500;
const app = express();

// using middlewares
app.use(express.json());
app.use(cors());

// using routes
app.use("/api/todos", todoRouter);
app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // connect to DB initially with server starting
  connectToMongoDB();
});
