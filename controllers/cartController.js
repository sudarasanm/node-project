const Cart = require('../models/Cart');
const Menu = require('../models/Menu');


exports.addToCart = async (req, res) => {
  try {
    const { userId, menuItemId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
        
      return res.status(404).json({ msg: 'Menu item not found' });
    }

   
    cart.items.push(menuItem);

    await cart.save();

    res.status(200).json({ msg: 'Menu item added to cart successfully', cart });
  } catch (err) {
    console.error(`Error adding menu item to cart: ${err.message}`);
    res.status(500).send('Server error');
  }
};
