const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  console.log('Token received:', token); // Add this line to log the token

  try {
    const decoded = jwt.verify(token, 'F66DB4EC116F3');
    console.log('Decoded token:', decoded); // Add this line to log the decoded token
    req.admin = decoded.admin;
    next();
  } catch (err) {
    console.error('Token verification failed:', err); // Add this line to log any error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
