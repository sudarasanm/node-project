const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, clearCart } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');


router.post('/addcart', auth, addToCart);

router.get('/:userId',auth, getCart);

router.delete('/removeone',auth, removeFromCart);

router.delete('/clear/:userId',auth, clearCart);

module.exports = router;
