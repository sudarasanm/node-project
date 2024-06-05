const mongoose = require("mongoose");

const generateRandomId = () => {
  const length = 50;
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const MenuSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: generateRandomId,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Menu", MenuSchema);
