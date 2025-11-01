/**
 * Product routes configuration
 */

const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

// GET /api/products - Get all products
router.get('/', ProductController.getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', ProductController.getProductById);

// POST /api/products/validate - Validate product IDs
router.post('/validate', ProductController.validateProductIds);

module.exports = router;