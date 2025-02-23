const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
};

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 400, message: 'User already exists', data: "" });
    }
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    const token = generateToken(newUser);
    return res.status(201).json({ status: 201, message: 'User registered successfully', data: {token, user: { name: newUser.name, email: newUser.email, role: newUser.role }}});
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Registration failed', data: "" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: 400, message: 'User not found', data: "" });
    }
    const verfiyPassword = bcrypt.compareSync(password, user.password);
    if(!verfiyPassword){
        return res.status(400).json({status: 400, message: "Invalid credentials", data: ""})
    }
    const token = generateToken(user);
    return res.status(200).json({status: 200, message: 'Login successful', data: {token, user: { name: user.name, email: user.email, role: user.role }}});
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Login failed', data: "" });
  }
};

exports.getProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found', data: "" });
      }
      return res.status(200).json({ status: 200, message: 'Profile fetched successfully', data: user });
    } catch (error) {
      return res.status(500).json({ status: 500, message: 'Failed to fetch profile', data: "" });
    }
}
