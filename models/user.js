const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  admin: { type: Boolean, default: false },
  active: Boolean
  // created: { type: Date, default: Date.now }
}, { timestamps: true });
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);