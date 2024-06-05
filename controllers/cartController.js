const Cart = require('../models/Cart');
const Menu = require('../models/Menu');


exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { menuItemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId);

    if (itemIndex > -1) {
      // Item already exists in the cart, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item does not exist, add new item to cart
      cart.items.push({ menuItemId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.menuId');
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error(`Error fetching cart: ${err.message}`);
    res.status(500).send('Server error');
  }
};


exports.removeFromCart = async (req, res) => {
  const { userId, menuId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.menuId !== menuId);

    await cart.save();
    res.status(200).json({ msg: 'Item removed from cart', cart });
  } catch (err) {
    console.error(`Error removing item from cart: ${err.message}`);
    res.status(500).send('Server error');
  }
};


exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json({ msg: 'Cart cleared', cart });
  } catch (err) {
    console.error(`Error clearing cart: ${err.message}`);
    res.status(500).send('Server error');
  }
};
