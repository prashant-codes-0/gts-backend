/**
 * Product model and related operations
 */

class Product {
  constructor(id, name, price, weight) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.weight = weight;
  }

  /**
   * Validate product data
   * @returns {boolean} True if product is valid
   */
  isValid() {
    return (
      this.id > 0 &&
      this.name && this.name.trim().length > 0 &&
      this.price >= 0 &&
      this.weight > 0
    );
  }

  /**
   * Get product display string
   * @returns {string} Formatted product string
   */
  getDisplayString() {
    return `${this.name} - $${this.price} - ${this.weight}g`;
  }

  /**
   * Convert to JSON representation
   * @returns {Object} Product object
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      weight: this.weight
    };
  }
}

module.exports = Product;