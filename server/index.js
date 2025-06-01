const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const otpRoutes = require('./routes/otp');
const userRoutes = require('./routes/user');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    message: "Server is Running " + PORT
  })
})
try {
  mongoose.connect(process.env.MONGO_URI)
  console.log("Database Connected")
}
catch (error) {
  console.log("MongoDb Connect error", error)
  process.exit(1)
}
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);



