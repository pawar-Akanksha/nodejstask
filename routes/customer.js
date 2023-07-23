/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer management endpoints
 */

const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get("/customers", [authenticate, authorize(["admin"])], async (req, res) => {
    const customers = await User.find({ role: "customer" });
    res.json(customers);
  }
);

module.exports = router;