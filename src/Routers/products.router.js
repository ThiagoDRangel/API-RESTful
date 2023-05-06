const express = require('express');
const { productsController } = require('../controllers');
const { nameValidation } = require('../middlewares/nameValidation');
const { checkKeys } = require('../middlewares/productValidation');

const router = express.Router();

router.get('/search', productsController.searchProduct);

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.post('/', nameValidation, productsController.registerProduct);

router.put('/:id', checkKeys, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;