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

const CartSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: generateRandomId
},
  userId: {
    type: String,
    required: true
  },
  items: [
    {
      menuId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);
