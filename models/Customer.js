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

const CustomerSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true,
        default: generateRandomId
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        
    },
    tableNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
        unique: true,
    },
});

module.exports = mongoose.model('Customer', CustomerSchema);
