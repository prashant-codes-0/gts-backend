/**
 * Order routes configuration
 */

const express = require('express');
const OrderController = require('../controllers/OrderController');

const router = express.Router();

// POST /api/orders/optimize-packages - Optimize packages for an order
router.post('/optimize-packages', OrderController.optimizePackages);

// POST /api/orders/summary - Get order summary
router.post('/summary', OrderController.getOrderSummary);

module.exports = router;