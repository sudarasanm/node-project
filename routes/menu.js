const express = require("express");
const router = express.Router();
const {
  viewMenu,
  addMenu,
  deleteMenu,
  editMenu,
} = require("../controllers/menuController");
const upload = require("../middleware/upload");

router.get("/viewmenu", viewMenu);

router.post("/addmenu", upload.single("image"), addMenu);

router.delete("/deletemenu/:id", deleteMenu);

router.put("/editmenu/:id", upload.single("image"), editMenu);

module.exports = router;
