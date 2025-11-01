/**
 * Main server file with feature-wise architecture
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import configuration and middleware
const { SERVER_CONFIG } = require('./src/config/constants');
const errorHandler = require('./src/middleware/errorHandler');
const requestLogger = require('./src/middleware/requestLogger');

// Import routes
const apiRoutes = require('./src/routes');
const OrderController = require('./src/controllers/OrderController');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

// API Routes
app.use('/api', apiRoutes);

// Legacy route compatibility (for existing frontend)
app.post('/api/optimize-packages', OrderController.optimizePackages);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Package Optimizer Server'
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`🚀 Server running on port ${SERVER_CONFIG.PORT}`);
  console.log(`📦 Package Optimizer API ready`);
  console.log(`🌍 Environment: ${SERVER_CONFIG.NODE_ENV}`);
});