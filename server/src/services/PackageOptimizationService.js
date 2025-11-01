/**
 * Package optimization service for order processing
 */

const Package = require('../models/Package');
const ShippingService = require('./ShippingService');
const { BUSINESS_RULES } = require('../config/constants');

class PackageOptimizationService {
  /**
   * Optimize package distribution using greedy algorithm
   * @param {Array<Product>} selectedItems - Array of selected products
   * @returns {Array<Package>} Array of optimized packages
   */
  static optimizePackages(selectedItems) {
    if (!selectedItems || selectedItems.length === 0) {
      return [];
    }

    const packages = [];
    const remainingItems = [...selectedItems];
    const maxPrice = BUSINESS_RULES.MAX_PACKAGE_PRICE;

    while (remainingItems.length > 0) {
      const currentPackage = new Package();

      // Sort remaining items by price descending to fit expensive items first
      remainingItems.sort((a, b) => b.price - a.price);

      let i = 0;
      while (i < remainingItems.length) {
        const item = remainingItems[i];
        
        // Check if item can fit in current package (price constraint)
        if (currentPackage.canAddItem(item, maxPrice)) {
          currentPackage.addItem(item);
          remainingItems.splice(i, 1);
        } else {
          i++;
        }
      }

      if (!currentPackage.isEmpty()) {
        packages.push(currentPackage);
      }
    }

    return packages;
  }

  /**
   * Format packages for API response
   * @param {Array<Package>} packages - Array of packages
   * @returns {Array<Object>} Formatted package data
   */
  static formatPackagesForResponse(packages) {
    return packages.map((pkg, index) => ({
      packageNumber: index + 1,
      items: pkg.items.map(item => item.name),
      totalWeight: pkg.totalWeight,
      totalPrice: pkg.totalPrice,
      courierPrice: ShippingService.calculateCourierCharge(pkg.totalWeight)
    }));
  }

  /**
   * Get optimization statistics
   * @param {Array<Product>} originalItems - Original selected items
   * @param {Array<Package>} optimizedPackages - Optimized packages
   * @returns {Object} Optimization statistics
   */
  static getOptimizationStats(originalItems, optimizedPackages) {
    const totalItems = originalItems.length;
    const totalWeight = originalItems.reduce((sum, item) => sum + item.weight, 0);
    const totalPrice = originalItems.reduce((sum, item) => sum + item.price, 0);
    const packageCount = optimizedPackages.length;
    
    const shippingCost = ShippingService.calculateTotalShippingCost(optimizedPackages);
    
    // Calculate weight distribution efficiency
    const averageWeight = totalWeight / packageCount;
    const weightVariance = optimizedPackages.reduce((sum, pkg) => {
      return sum + Math.pow(pkg.totalWeight - averageWeight, 2);
    }, 0) / packageCount;

    return {
      totalItems,
      totalWeight,
      totalPrice,
      packageCount,
      averageWeightPerPackage: Math.round(averageWeight),
      weightDistributionVariance: Math.round(weightVariance),
      totalShippingCost: shippingCost.totalCost,
      averageShippingCostPerPackage: Math.round(shippingCost.totalCost / packageCount * 100) / 100
    };
  }

  /**
   * Validate optimization constraints
   * @param {Array<Package>} packages - Packages to validate
   * @returns {Object} Validation result
   */
  static validateOptimization(packages) {
    const violations = [];
    const maxPrice = BUSINESS_RULES.MAX_PACKAGE_PRICE;

    packages.forEach((pkg, index) => {
      if (pkg.totalPrice > maxPrice) {
        violations.push({
          packageNumber: index + 1,
          violation: 'PRICE_EXCEEDED',
          actualPrice: pkg.totalPrice,
          maxPrice: maxPrice
        });
      }

      if (pkg.isEmpty()) {
        violations.push({
          packageNumber: index + 1,
          violation: 'EMPTY_PACKAGE'
        });
      }
    });

    return {
      isValid: violations.length === 0,
      violations
    };
  }
}

module.exports = PackageOptimizationService;