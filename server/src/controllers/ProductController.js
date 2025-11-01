/**
 * Product controller for handling product-related HTTP requests
 */

const ProductService = require('../services/ProductService');

class ProductController {
  /**
   * Get all products
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  static async getAllProducts(req, res) {
    try {
      const products = ProductService.getAllProducts();
      
      res.status(200).json(products.map(product => product.toJSON()));
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to fetch products'
      });
    }
  }

  /**
   * Get product by ID
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  static async getProductById(req, res) {
    try {
      const productId = parseInt(req.params.id);
      
      if (isNaN(productId)) {
        return res.status(400).json({
          error: 'Invalid product ID',
          message: 'Product ID must be a number'
        });
      }

      const product = ProductService.getProductById(productId);
      
      if (!product) {
        return res.status(404).json({
          error: 'Product not found',
          message: `Product with ID ${productId} does not exist`
        });
      }

      res.status(200).json(product.toJSON());
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to fetch product'
      });
    }
  }

  /**
   * Validate product IDs
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  static async validateProductIds(req, res) {
    try {
      const { productIds } = req.body;

      if (!productIds || !Array.isArray(productIds)) {
        return res.status(400).json({
          error: 'Invalid request',
          message: 'productIds must be an array'
        });
      }

      const validation = ProductService.validateProductIds(productIds);
      
      res.status(200).json(validation);
    } catch (error) {
      console.error('Error validating product IDs:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to validate product IDs'
      });
    }
  }
}

module.exports = ProductController;