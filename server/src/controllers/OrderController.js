/**
 * Order controller for handling order optimization requests
 */

const ProductService = require('../services/ProductService');
const PackageOptimizationService = require('../services/PackageOptimizationService');

class OrderController {
  /**
   * Optimize packages for an order
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  static async optimizePackages(req, res) {
    try {
      const { selectedItemIds } = req.body;
      
      // Validate request data
      if (!selectedItemIds || !Array.isArray(selectedItemIds)) {
        return res.status(400).json({ 
          error: 'Invalid request data',
          message: 'selectedItemIds must be an array'
        });
      }

      if (selectedItemIds.length === 0) {
        return res.status(400).json({ 
          error: 'Empty selection',
          message: 'At least one item must be selected'
        });
      }

      // Validate product IDs
      const validation = ProductService.validateProductIds(selectedItemIds);
      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Invalid product IDs',
          message: 'Some product IDs do not exist',
          invalidIds: validation.invalid
        });
      }

      // Get selected products
      const selectedItems = ProductService.getProductsByIds(selectedItemIds);

      if (selectedItems.length === 0) {
        return res.status(400).json({ 
          error: 'No valid products found',
          message: 'None of the selected product IDs are valid'
        });
      }

      // Optimize packages
      const optimizedPackages = PackageOptimizationService.optimizePackages(selectedItems);

      // Validate optimization results
      const optimizationValidation = PackageOptimizationService.validateOptimization(optimizedPackages);
      if (!optimizationValidation.isValid) {
        console.error('Optimization validation failed:', optimizationValidation.violations);
        return res.status(500).json({
          error: 'Optimization failed',
          message: 'Package optimization violated business rules',
          violations: optimizationValidation.violations
        });
      }

      // Format response
      const formattedPackages = PackageOptimizationService.formatPackagesForResponse(optimizedPackages);
      const stats = PackageOptimizationService.getOptimizationStats(selectedItems, optimizedPackages);

      res.status(200).json({ 
        packages: formattedPackages,
        statistics: stats
      });

    } catch (error) {
      console.error('Error optimizing packages:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to optimize packages'
      });
    }
  }

  /**
   * Get order summary without optimization
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  static async getOrderSummary(req, res) {
    try {
      const { selectedItemIds } = req.body;
      
      if (!selectedItemIds || !Array.isArray(selectedItemIds)) {
        return res.status(400).json({ 
          error: 'Invalid request data',
          message: 'selectedItemIds must be an array'
        });
      }

      const selectedItems = ProductService.getProductsByIds(selectedItemIds);
      
      const totalWeight = selectedItems.reduce((sum, item) => sum + item.weight, 0);
      const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

      res.status(200).json({
        itemCount: selectedItems.length,
        totalWeight,
        totalPrice,
        items: selectedItems.map(item => item.toJSON())
      });

    } catch (error) {
      console.error('Error getting order summary:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to get order summary'
      });
    }
  }
}

module.exports = OrderController;