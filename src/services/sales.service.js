const saleModel = require('../models/sales.model');

const registerSale = async (products) => {
  const saleId = await saleModel.registerSale();
  await Promise.all(products.map(({ productId: id, quantity }) =>
    saleModel.registerProductSale(saleId, id, quantity)));
  return saleId;
};

const getAllSales = async () => {
  const sales = await saleModel.getAllSales();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);

  if (sale.length === 0 || !sale) {
    return { type: 404, message: { message: 'Sale not found' } };
  }
  
  return sale;
};

const updateSale = async (saleId, products) => {
  const sale = await saleModel.getSaleById(saleId);
  if (sale.length === 0 || !sale) {
    return {
      type: 404, message: { message: 'Sale not found' },
    };
  }
  const updatedSales = products.map(({ productId, quantity }) =>
    saleModel.updateSale(saleId, productId, quantity));
  await Promise.all(updatedSales);
  return updatedSales;
};

const deleteSale = async (id) => {
  const sale = await saleModel.getSaleById(id);

  if (sale.length === 0 || !sale) {
    return { type: 404, message: { message: 'Sale not found' } };
  }
  await saleModel.deleteSale(id);
  return sale;
};

module.exports = {
  registerSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};