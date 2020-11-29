const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  }, { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
