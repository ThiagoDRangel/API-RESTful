const connection = require('./connection');

const registerSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  return insertId;
};

const registerProductSale = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return insertId;
};

const getAllSales = async () => {
  const [sales] = await connection.execute(`
  SELECT 
    sale.id as saleId,
    sale.date as date,
    product.product_id as productId,
    product.quantity as quantity
  FROM sales_products as product
    INNER JOIN sales as sale
    ON product.sale_id = sale.id;
`);
  return sales;
};

const getSaleById = async (id) => {
  const [sales] = await connection.execute(`
  SELECT 
    sale.date as date, 
    product.product_id as productId, 
    product.quantity as quantity
  FROM sales as sale
    INNER JOIN sales_products as product
    ON sale.id = product.sale_id
  WHERE sale.id = ?;`,
    [id]);
  return sales;
};

const updateSale = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
  return insertId;
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

module.exports = {
  registerSale,
  registerProductSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};