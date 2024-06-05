const Menu = require("../models/Menu");

exports.viewMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.addMenu = async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.path : "";

  try {
    const menu = new Menu({
      name,
      description,
      price,
      category,
      image,
    });

    await menu.save();
    res.status(201).json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


exports.deleteMenu = async (req, res) => {
    try {
      const result = await Menu.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ msg: 'Menu item not found' });
      }
      res.status(200).json({ msg: 'Menu item removed' });
    } catch (err) {
      console.error(`Error deleting menu item: ${err.message}`);
      res.status(500).send('Server error');
    }
  };
  
  
  
  // Edit menu function
  exports.editMenu = async (req, res) => {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.path : '';
  
    const menuFields = { name, description, price, category };
    if (image) menuFields.image = image;
  
    try {
      let menu = await Menu.findById(req.params.id);
      if (!menu) {
        return res.status(404).json({ msg: 'Menu item not found' });
      }
  
      menu = await Menu.findByIdAndUpdate(
        req.params.id,
        { $set: menuFields },
        { new: true }
      );
  
      res.status(200).json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
