const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const payload = {
        admin: data,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
