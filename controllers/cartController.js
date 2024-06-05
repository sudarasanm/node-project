const Cart = require("../models/Cart");
const Menu = require("../models/Menu");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    let dish = await Menu.findOne({ _id: menuItemId });

    if (dish) {
      let dishname = dish.name;
      let dishprice = dish.price;
      const itemIndex = cart.items.findIndex(
        (item) => item.menuId === menuItemId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          menuId: menuItemId,
          quantity,
          name: dishname,
          price: dishprice,
        });
      }

      await cart.save();
      res.status(200).json(cart);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.menuId === menuItemId
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({cart});
    } else {
      return res.status(404).json({ msg: "Item not found in cart" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
