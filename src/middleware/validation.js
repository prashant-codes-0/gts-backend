/**
 * Request validation middleware
 */

const validateProductIds = (req, res, next) => {
  const { selectedItemIds } = req.body;

  if (!selectedItemIds) {
    return res.status(400).json({
      error: 'Missing required field',
      message: 'selectedItemIds is required'
    });
  }

  if (!Array.isArray(selectedItemIds)) {
    return res.status(400).json({
      error: 'Invalid data type',
      message: 'selectedItemIds must be an array'
    });
  }

  if (selectedItemIds.length === 0) {
    return res.status(400).json({
      error: 'Empty selection',
      message: 'At least one item must be selected'
    });
  }

  // Validate that all IDs are numbers
  const invalidIds = selectedItemIds.filter(id => !Number.isInteger(id) || id <= 0);
  if (invalidIds.length > 0) {
    return res.status(400).json({
      error: 'Invalid product IDs',
      message: 'All product IDs must be positive integers',
      invalidIds
    });
  }

  next();
};

const validateProductId = (req, res, next) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId) || productId <= 0) {
    return res.status(400).json({
      error: 'Invalid product ID',
      message: 'Product ID must be a positive integer'
    });
  }

  req.params.id = productId;
  next();
};

module.exports = {
  validateProductIds,
  validateProductId
};