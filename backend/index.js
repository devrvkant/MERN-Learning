import express from "express";

const PORT = 5500;
const app = express();

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to ToDo API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} ->`);
});
