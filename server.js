const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const authRoutes = require('./routes/authRoutes');
const menu = require('./routes/menu');
const cart = require('./routes/cart')

const app = express();


app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use('/api/auth', authRoutes);
app.use('/api/menu', menu);
app.use('/api/cart', cart);


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
