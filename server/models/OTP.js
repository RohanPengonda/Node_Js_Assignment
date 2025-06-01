const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: String,
  code: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600
    // expires in 10min},
  },
});

module.exports = mongoose.model('OTP', otpSchema);
