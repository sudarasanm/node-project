const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const payload = { id: userId }; // Ensure user ID is included in the payload
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

module.exports = generateToken;