const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const router = express.Router();
router.use(express.json());

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

router.post("/products",[authenticate, authorize(["admin"])], async (req, res) => {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json({
        message: "Product Created Successfully", 
        CreatedProduct: createdProduct})
  }
);

router.put("/products/:id", [authenticate, authorize(["admin"])], async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(204).json({
        massage:"User Updated Sucussfully",
        updatedProduct:updatedProduct
    })
  }
);

router.delete("/products/:id", [authenticate, authorize(["admin"])], async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.sendStatus(204).json({
            massage:"Product deleted sucusfully",
            deletedProduct : deletedProduct
        })
  }
);

module.exports = router;
