const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Router } = require('express')
const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB...📚"))
  .catch(() => console.log("Couldn't connect to DB...❌"));

// Middlewares
app.use(cors());
app.use(express.json());

// route
app.use("/api/v1/messages", require("./routes/message"))

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running...🎇");
});
