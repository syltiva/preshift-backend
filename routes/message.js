const express = require("express");
const router = express.Router();
const Message = require("../models/MessageSchema");
const cloudinary = require('cloudinary');

// read all
router.get("/", async (req, res) => {
  const messages = await Message.find();
  try {
    if (messages.length === 0) {
       res.status(400).json({ message: "Messages not found" });
    }
     res.status(200).json(messages);
  } catch (error) {
     res.status(500).json({ message: "Couldn't retrieve messages" });
  }
});

// read one
router.get("/message/:id", async (req, res) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  try {
     res.status(200).json(message);
  } catch (error) {
     res.status(500).json({ message: "Couldn't get the message" });
  }
});

// create
router.post("/message", async (req, res) => {
  const messageToCreate = await Message.create(req.body);
  try {
    res.status(201).json(messageToCreate);
  } catch (error) {
    res.status(500).json({ message: "Couldn't create the message" });
  }
});

// update
router.put("/message/:id", async (req, res) => {
  const { id } = req.params;
  const messageToUpdate = await Message.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    res.status(202).json(messageToUpdate);
  } catch (error) {
    res.status(500).json({ message: "Couldn't update the message" });
  }
});

// delete
router.delete("/message/:id", async (req, res) => {
  const { id } = req.params;
  await Message.findByIdAndDelete(id);
  try {
     res.status(203).json({message: "Deleted Successfully"});
  } catch (error) {
     res.status(500).json({ message: "Couldn't delete the message" });
  }
});

// post image
router.post("/message/imageUpload/:id", async (req, res) => {
  const { id } = req.params;
  const messageToUpdate = await Message.findById(id);

  // checking for pre-existing image
  if (messageToUpdate.image) {
    let array = messageToUpdate.image.split('/');
    let fileName = array[array.length-1];
    const [public_id] = fileName.split('.');
    await cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.image;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  messageToUpdate.image = secure_url;
  await messageToUpdate.save();
  try {
    return res.status(201).json(messageToUpdate);
  } catch (error) {
    return res.status(500).json({message: "There was an error uploading the image"});
  }
});

module.exports = router;
