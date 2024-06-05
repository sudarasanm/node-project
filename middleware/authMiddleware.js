const jwt = require('jsonwebtoken');
const secret = 'F66DB4EC116F3'; // Replace with your actual secret

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id }; 
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};