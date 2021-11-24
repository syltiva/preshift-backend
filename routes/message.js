const express = require("express");
const router = express.Router();

const Message = require("../models/MessageSchema");

// gets all messages
router.get("/", async (req, res) => {
  const messages = await Message.find();
  try {
    if (messages.length === 0) {
      return res.status(400).json({ message: "Messages not found" });
    }
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't retrieve messages" });
  }
});

// gets one message (by id)
router.get("/message/:id", async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  try {
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't get the message" });
  }
});

module.exports = router;
