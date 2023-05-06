const productService = require('../services/products.service');

const saleProductValidation = async (req, res, next) => {
  const getAllProducts = await productService.getAllProducts();
  const checkProduct = req.body.some((product) =>
    !getAllProducts.some((item) => item.id === product.productId));
  return checkProduct ? res.status(404).json({ message: 'Product not found' }) : next();
};

const saleKeyValidation = async (req, res, next) => {
  const sale = req.body;

  if (sale.some((product) => !product.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (sale.some((product) => !product.quantity)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

const saleQuantityValidation = async (req, res, next) => {
  if (req.body.some((product) => product.quantity < 1)) {
    return res.status(422).json({
      message: '"quantity" must be greater than or equal to 1',
    });
  }
  next();
};

module.exports = {
  saleKeyValidation,
  saleQuantityValidation,
  saleProductValidation,
};