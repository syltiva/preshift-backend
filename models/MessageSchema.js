const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  image: { type: String },
  date: { type: Date, required: true },
  lunchCovers: { type: Number, required: true },
  dinnerCovers: { type: Number, required: true },
  serviceNote: { type: String },
  foodBev: { type: String },
  misc: { type: String },
});

module.exports = model("Message", MessageSchema);
