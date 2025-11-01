/**
 * Package model for order optimization
 */

class Package {
  constructor() {
    this.items = [];
    this.totalWeight = 0;
    this.totalPrice = 0;
  }

  /**
   * Add item to package
   * @param {Product} item - Product to add
   * @returns {boolean} True if item was added successfully
   */
  addItem(item) {
    if (!item || !item.isValid()) {
      return false;
    }

    this.items.push(item);
    this.totalWeight += item.weight;
    this.totalPrice += item.price;
    return true;
  }

  /**
   * Check if item can be added without violating price constraint
   * @param {Product} item - Product to check
   * @param {number} maxPrice - Maximum allowed price
   * @returns {boolean} True if item can be added
   */
  canAddItem(item, maxPrice) {
    return this.totalPrice + item.price <= maxPrice;
  }

  /**
   * Get package summary
   * @returns {Object} Package summary object
   */
  getSummary() {
    return {
      items: this.items.map(item => item.name),
      totalWeight: this.totalWeight,
      totalPrice: this.totalPrice,
      itemCount: this.items.length
    };
  }

  /**
   * Check if package is empty
   * @returns {boolean} True if package has no items
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Convert to JSON representation
   * @returns {Object} Package object
   */
  toJSON() {
    return {
      items: this.items.map(item => item.toJSON()),
      totalWeight: this.totalWeight,
      totalPrice: this.totalPrice
    };
  }
}

module.exports = Package;