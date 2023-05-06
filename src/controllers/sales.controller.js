const saleService = require('../services/sales.service');

const registerSale = async (req, res) => {
  const sale = req.body;
  const newSaleId = await saleService.registerSale(sale);

  return res.status(201).json({
    id: newSaleId,
    itemsSold: [...sale],
  });
};

const getAllSales = async (_req, res) => {
  const sales = await saleService.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getSaleById(id);

  if (sale.type) return res.status(sale.type).json(sale.message);
 
  return res.status(200).json(sale);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const { type, message } = await saleService.updateSale(id, sale);

  if (type) return res.status(type).json(message);

  return res.status(200).json({
    saleId: Number(id),
    itemsUpdated: [...sale],
  });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.deleteSale(id);
  const { type, message } = sale;

  if (type) return res.status(type).json(message);
  return res.status(204).json(sale);
};

module.exports = {
  registerSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};