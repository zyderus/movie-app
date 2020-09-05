const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String,
  trailer: String,
  description: String,
  price: String,
  author: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Movie", movieSchema);