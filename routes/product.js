/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management endpoints
 */


const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products with filters
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter products with price greater than or equal to minPrice
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter products with price less than or equal to maxPrice
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of products to return per page
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */

router.get("/products", authenticate, async (req, res) => {
  const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
  const query = {};
  if (category) query.category = category;
  if (minPrice) query.price = { $gte: minPrice };
  if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
  const products = await Product.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit);
  res.json(products);
});


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 CreatedProduct:
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/products",[authenticate, authorize(["admin"])], async (req, res) => {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json({
        message: "Product Created Successfully", 
        CreatedProduct: createdProduct})
  }
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       204:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 updatedProduct:
 *                   $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */


router.put("/products/:id", [authenticate, authorize(["admin"])], async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
    res.sendStatus(204).json({
        massage:"User Updated Sucussfully",
        updatedProduct:updatedProduct
    })
  }
);



/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Product not found
 */


router.delete("/products/:id", [authenticate, authorize(["admin"])], async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
    res.sendStatus(204).json({
            massage:"Product deleted sucusfully",
            deletedProduct : deletedProduct
        })
  }
);

module.exports = router;
