const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({status: 401, message: "No token found.", data: ""})
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(data.id);
    next();
  } catch (error) {
    return res.status(401).json({status: 401, message: "Enter a valid token", data: ""})
  }
};

module.exports = auth;
