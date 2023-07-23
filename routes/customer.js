const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = express.Router();
router.use(express.json());


router.get("/customers", [authenticate, authorize(["admin"])], async (req, res) => {
    const customers = await User.find({ role: "customer" });
    res.json(customers);
  }
);

module.exports = router;