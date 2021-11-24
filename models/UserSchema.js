import "./ReservationsSchema";

const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, reuuired: true },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

UserSchema.methods.toJSON = function () {
  const { password, __v, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
