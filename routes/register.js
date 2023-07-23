const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const router = express.Router();
router.use(express.json());

router.post("/register", async (req, res) => {
  const { name, mobileno, username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
        name, 
        mobileno, 
        username, 
        password: hashedPassword, 
        role 
    });
    await user.save()
   res.status(201).json({
    massage:"User Created Sucussfully",
    user:user
   })
});

module.exports = router;