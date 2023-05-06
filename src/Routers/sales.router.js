const express = require('express');
const { salesController } = require('../controllers');
const {
  saleKeyValidation,
  saleQuantityValidation,
  saleProductValidation,
} = require('../middlewares/salesValidation');

const checkRouterSales = [
  saleQuantityValidation,
  saleKeyValidation,
  saleProductValidation,
];

const router = express.Router();

router.post('/', checkRouterSales, salesController.registerSale);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.put('/:id', checkRouterSales, salesController.updateSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;