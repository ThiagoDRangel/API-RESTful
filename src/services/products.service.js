const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const [product] = await productsModel.getProductById(id);
  if (!product) {
    return {
      type: 404, message: { message: 'Product not found' },
    };
  }
  return product;
};

const registerProduct = async (product) => {
  const newProduct = await productsModel.registerProduct(product);
  return newProduct;
};

const updateProduct = async (id, name) => {
  const [updated] = await productsModel.getProductById(id);

  if (!updated) {
    return { type: 404, message: { message: 'Product not found' } };
  }
  const product = await productsModel.updateProduct(id, name);
  return product;
};

const deleteProduct = async (id) => {
  const product = await productsModel.getProductById(id);

  if (!product || product.length === 0) {
    return { type: 404, message: { message: 'Product not found' } };
  }

  await productsModel.deleteProduct(id);
  return product;
};

const searchProduct = async (filter) => {
  const products = await productsModel.searchProduct(filter);

  if (products.length === 0 || !products) {
    return { type: 404, message: { message: 'Product not found' } };
  }
  return products;
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};