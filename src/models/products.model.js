const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? LIMIT 1;',
    [id],
  );

  return product;
};

const registerProduct = async (product) => {
  const [newProduct] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [product],
  );

  return newProduct;
};

const updateProduct = async (id, name) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
};

const deleteProduct = async (productId) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [productId],
  );
};

const searchProduct = async (name) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE name LIKE ?',
    [`%${name}%`],
  );
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};