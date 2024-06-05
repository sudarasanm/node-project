const express = require("express");
const {
  register,
  userLogin,
  adminLogin,
  logout,
  customerLogin,
  adminRegister,
} = require("../controllers/authController");

const router = express.Router();

router.post("/admin/login", adminLogin);

router.post("/user/register", adminRegister);

router.post("/user/login", userLogin);

router.post("/customer/login", customerLogin);

// router.post("/register", register);

router.post("/logout", logout);

module.exports = router;
