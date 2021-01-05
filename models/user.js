const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  avatar: String,
  email: { type: String, unique: true, required: true },
  name: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isAdmin: { type: Boolean, default: false },
  active: Boolean
  // created: { type: Date, default: Date.now }
}, { timestamps: true });
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);