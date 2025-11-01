/**
 * Product service for handling product-related operations
 */

const { products } = require('../config/database');
const Product = require('../models/Product');

class ProductService {
  /**
   * Get all products
   * @returns {Array<Product>} Array of all products
   */
  static getAllProducts() {
    return products.map(productData => 
      new Product(productData.id, productData.name, productData.price, productData.weight)
    );
  }

  /**
   * Get products by IDs
   * @param {Array<number>} productIds - Array of product IDs
   * @returns {Array<Product>} Array of matching products
   */
  static getProductsByIds(productIds) {
    if (!Array.isArray(productIds)) {
      return [];
    }

    return products
      .filter(product => productIds.includes(product.id))
      .map(productData => 
        new Product(productData.id, productData.name, productData.price, productData.weight)
      );
  }

  /**
   * Get product by ID
   * @param {number} productId - Product ID
   * @returns {Product|null} Product or null if not found
   */
  static getProductById(productId) {
    const productData = products.find(product => product.id === productId);
    
    if (!productData) {
      return null;
    }

    return new Product(productData.id, productData.name, productData.price, productData.weight);
  }

  /**
   * Validate product IDs
   * @param {Array<number>} productIds - Array of product IDs to validate
   * @returns {Object} Validation result with valid and invalid IDs
   */
  static validateProductIds(productIds) {
    if (!Array.isArray(productIds)) {
      return { valid: [], invalid: [], isValid: false };
    }

    const valid = [];
    const invalid = [];

    productIds.forEach(id => {
      if (products.some(product => product.id === id)) {
        valid.push(id);
      } else {
        invalid.push(id);
      }
    });

    return {
      valid,
      invalid,
      isValid: invalid.length === 0
    };
  }
}

module.exports = ProductService;