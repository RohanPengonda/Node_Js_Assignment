const OTP = require('../models/OTP');
const User = require('../models/User');
const nodemailer = require('nodemailer');

require('dotenv').config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// verifying connection 
transporter.verify((error, success) => {
  if (error) {
    console.error('Nodemailer config error:', error);
  } else {
    console.log('Nodemailer is ready');
  }
});

// send otp code
exports.sendOTP = async (req, res) => {
  // console.log("In send OTP")
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // generating otp 
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // delete previous otp
    await OTP.deleteMany({ email });

    //  new OTP
    const otp = new OTP({ email, code });
    await otp.save();

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Hello ${user.name},\n\nYour OTP code is: ${code}\n It is valid for 10 minutes.\n\nThank you.`,
    });

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Server error while sending OTP' });
  }
};

// verifying otp 
exports.verifyOTP = async (req, res) => {
  // console.log("In Verify OTP")
  const { email, code } = req.body;

  try {
    if (!email || !code) {
      // console.log(email, code);
      return res.status(400).json({ message: 'Email and OTP code are required' });
    }

    const otpRecord = await OTP.findOne({ email, code });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // delete otp after verification
    await OTP.deleteMany({ email });

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'OTP verified successfully', user });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return (res.status(500)
      .json({
        message: 'Server error during OTP verification'
      }));
  }
};
