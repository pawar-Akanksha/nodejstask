/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Incorrect username or password
 */


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
