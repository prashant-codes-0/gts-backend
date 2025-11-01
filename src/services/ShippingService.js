/**
 * Shipping service for calculating courier charges
 */

const { BUSINESS_RULES } = require('../config/constants');

class ShippingService {
  /**
   * Calculate courier charge based on package weight
   * @param {number} weight - Weight in grams
   * @returns {number} Courier charge in dollars
   */
  static calculateCourierCharge(weight) {
    const { COURIER_RATES } = BUSINESS_RULES;

    if (weight <= COURIER_RATES.TIER_1.maxWeight) {
      return COURIER_RATES.TIER_1.price;
    }
    
    if (weight <= COURIER_RATES.TIER_2.maxWeight) {
      return COURIER_RATES.TIER_2.price;
    }
    
    if (weight <= COURIER_RATES.TIER_3.maxWeight) {
      return COURIER_RATES.TIER_3.price;
    }
    
    return COURIER_RATES.TIER_4.price;
  }

  /**
   * Get shipping rate tiers for reference
   * @returns {Object} Shipping rate tiers
   */
  static getShippingRates() {
    return BUSINESS_RULES.COURIER_RATES;
  }

  /**
   * Calculate total shipping cost for multiple packages
   * @param {Array<Package>} packages - Array of packages
   * @returns {Object} Shipping cost breakdown
   */
  static calculateTotalShippingCost(packages) {
    let totalCost = 0;
    const packageCosts = [];

    packages.forEach((pkg, index) => {
      const cost = this.calculateCourierCharge(pkg.totalWeight);
      totalCost += cost;
      packageCosts.push({
        packageNumber: index + 1,
        weight: pkg.totalWeight,
        cost: cost
      });
    });

    return {
      totalCost,
      packageCosts,
      packageCount: packages.length
    };
  }

  /**
   * Get optimal shipping tier for a given weight
   * @param {number} weight - Weight in grams
   * @returns {Object} Shipping tier information
   */
  static getShippingTier(weight) {
    const { COURIER_RATES } = BUSINESS_RULES;
    
    if (weight <= COURIER_RATES.TIER_1.maxWeight) {
      return { tier: 1, ...COURIER_RATES.TIER_1 };
    }
    
    if (weight <= COURIER_RATES.TIER_2.maxWeight) {
      return { tier: 2, ...COURIER_RATES.TIER_2 };
    }
    
    if (weight <= COURIER_RATES.TIER_3.maxWeight) {
      return { tier: 3, ...COURIER_RATES.TIER_3 };
    }
    
    return { tier: 4, ...COURIER_RATES.TIER_4 };
  }
}

module.exports = ShippingService;