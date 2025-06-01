const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validateEmail, validatePassword } = require('../middleware/validate');

exports.register = async (req, res) => {
  try {
    const { name, email, password, company, age, dob } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !company || !age || !dob || !imageFile) {
      return (
        res.status(400)
          .json({
            message: 'All fields including image are required'
          }));
    }

    // check email and password
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Convert image to base64
    const imageBase64 = imageFile.buffer.toString('base64');

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      company,
      age,
      dob,
      image: imageBase64,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};
