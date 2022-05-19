const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  image: { type: String },
  date: { type: Date, required: true },
  covers: { type: Number, required: true },
  eightySix: {type: String},
  serviceNote: { type: Schema.Types.Mixed },
  foodBev: { type: Schema.Types.Mixed },
  misc: { type: Schema.Types.Mixed },
});

module.exports = model("Message", MessageSchema);
