/**
 * Main routes configuration
 */

const express = require('express');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

// Mount feature routes
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Package Optimizer API'
  });
});

module.exports = router;