const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  console.log('Token received:', token); 

  try {
    const decoded = jwt.verify(token, 'F66DB4EC116F3');
    console.log('Decoded token:', decoded);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    console.error('Token verification failed:', err); 
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
