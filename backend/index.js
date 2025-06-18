import express from "express";

import todoRouter from "./routes/todo.routes.js";

const PORT = 5500;
const app = express();

// using routes
app.use("/api/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
