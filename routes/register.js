
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
const salt = bcrypt.genSaltSync(10);

const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               mobileno:
 *                 type: string
 *                 description: User's mobile number
 *               username:
 *                 type: string
 *                 description: User's username
 *               password:
 *                 type: string
 *                 description: User's password
 *               role:
 *                 type: string
 *                 description: User's role (e.g., admin, customer, etc.)
 *             required:
 *               - name
 *               - mobileno
 *               - username
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (missing or invalid fields)
 */

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