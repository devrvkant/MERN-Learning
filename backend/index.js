import express from "express";

import cors from "cors";
import "dotenv/config"

import connectToMongoDB from "./mongoDB.js";
import todoRouter from "./routes/todos.routes.js";
import userRouter from "./routes/user.routes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// using middlewares
app.use(express.json());
app.use(cors());

app.get("/",(req,re)=>{
  res.send("welcome to authentication page")
})

// using routes
app.use("/api/todos", todoRouter);
app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // connect to DB initially with server starting
  connectToMongoDB();
});
