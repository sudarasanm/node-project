const mongoose = require('mongoose');


const generateRandomId = () => {
    const length = 50;
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        default: generateRandomId
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('User', UserSchema);
