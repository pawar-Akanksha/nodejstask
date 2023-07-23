const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.use(express.json());

router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if (!user || !(await bcrypt.compare(password, user.password))){
    return res.status(404).json({message: "Worng username or password !!"});
  } 
  const token = jwt.sign({id: user._id, role: user.role}, 'secret-key');
  res.status(200).json({token: token, message: "Logged in successfully !!"});
});

module.exports = router;
