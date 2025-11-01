/**
 * Application constants and configuration
 */

const BUSINESS_RULES = {
  MAX_PACKAGE_PRICE: 250, // Maximum price per package for customs
  COURIER_RATES: {
    TIER_1: { maxWeight: 200, price: 5 },
    TIER_2: { maxWeight: 500, price: 10 },
    TIER_3: { maxWeight: 1000, price: 15 },
    TIER_4: { maxWeight: 5000, price: 20 }
  }
};

const SERVER_CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

const API_ROUTES = {
  PRODUCTS: '/api/products',
  OPTIMIZE_PACKAGES: '/api/optimize-packages'
};

module.exports = {
  BUSINESS_RULES,
  SERVER_CONFIG,
  API_ROUTES
};