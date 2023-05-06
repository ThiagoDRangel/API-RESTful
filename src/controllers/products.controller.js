const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);

  if (product.type) {
    return res.status(product.type).json(product.message);
  }
  return res.status(200).json(product);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const registred = await productsService.registerProduct(name);
  return res.status(201).json({ name, id: registred.insertId });
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const updated = await productsService.updateProduct(id, name);

  if (updated.type) return res.status(updated.type).json(updated.message);
  return res.status(200).json(updated);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct(id);

  if (product.type) return res.status(product.type).json(product.message);
  return res.status(204).json(product);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const products = await productsService.searchProduct(q);

  if (products.type) return res.status(products.type).json(products.message);

  return res.status(200).json(products);
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};