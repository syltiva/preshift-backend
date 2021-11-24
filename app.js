const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB...📚"))
  .catch(() => console.log("Couldn't connect to DB...❌"));

// Middlewares
app.use(cors());

// route
app.get("/", (req, res) => {
  res.send("Works");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running...🎇");
});
