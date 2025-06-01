const User = require('../models/User');

exports.getUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) {
    return res.status(404)
      .json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ email: req.params.email });
  res.status(200)
    .json({ message: 'User deleted successfully' });
};