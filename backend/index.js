import express from "express";

import cors from "cors";

import todoRouter from "./routes/todos.routes.js";
import connectToMongoDB from "./mongoDB.js";

const PORT = 5500;
const app = express();

// using middlewares
app.use(express.json());
app.use(cors());

// using routes
app.use("/api/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
  // connect to DB initially with server starting
  connectToMongoDB();
});
