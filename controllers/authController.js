const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Admin = require("../models/Admin");
const generateToken = require("../config/auth");
const Customer = require("../models/Customer");
const adminAuth = require("../middleware/authMiddleware");



// exports.register = [
//   adminAuth,
//   async (req, res) => {
//     const { username, employeeId, password } = req.body;

//     try {
//       const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
//       if (!password.match(passwordRegex)) {
//         return res.status(400).json({
//           Error:
//             "Password must be at least 6 characters long and include at least one number and one special character.",
//         });
//       }

//       let employeeIdcheck = await User.findOne({ employeeId });
//       if (employeeIdcheck) {
//         return res.status(400).json({ Error: "employeeId already exists" });
//       }

//       let usernamecheck = await User.findOne({ username });
//       if (usernamecheck) {
//         return res.status(400).json({ Error: "username already exists" });
//       }

//       user = new User({
//         username,
//         employeeId,
//         password,
//       });

//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);

//       await user.save();

//       const token = generateToken(user.id);

//       const userid = user.id;

//       res
//         .status(201)
//         .json({ token, msg: "You have successfully registered", userid });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   },
// ];

exports.userLogin = async (req, res) => {
  const { employeeId, password } = req.body;

  try {
    let user = await User.findOne({ employeeId });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(admin.id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.adminRegister =  async (req, res) => {
  const { username, password } = req.body;

  try {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (!password.match(passwordRegex)) {
      return res.status(400).json({
        Error:
          "Password must be at least 6 characters long and include at least one number and one special character.",
      });
    }

    let usernamecheck = await Admin.findOne({ username });
    if (usernamecheck) {
      return res.status(400).json({ Error: "username already exists" });
    }

    admin = new Admin({
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);

    await admin.save();

    const token = generateToken(admin.id);

    const adminid = admin.id;

    res
      .status(201)
      .json({ token, msg: "Admin has been successfully registered", adminid });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


exports.customerLogin = async (req, res) => {
  const { name, phoneNumber, tableNumber } = req.body;

  try {
    // Check if table number is within the valid range
    if (tableNumber < 1 || tableNumber > 10) {
      return res
        .status(400)
        .json({ msg: "Please select a table number between 1 and 10." });
    }

    // Check if the table number is already taken
    const existingCustomer = await Customer.findOne({ tableNumber });
    if (existingCustomer) {
      return res.status(400).json({
        msg: ` ${tableNumber} is not your Table Number. Please select Your table Number.`,
      });
    }

    // Create a new customer
    const customer = new Customer({
      name,
      phoneNumber,
      tableNumber,
    });

    await customer.save();

    res.status(201).json({ msg: "Customer login successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.logout = (req, res) => {
  res.json({ msg: "Logout successful" });
};
