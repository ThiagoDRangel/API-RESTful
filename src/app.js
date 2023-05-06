const express = require('express');
const productsRouter = require('./Routers/products.router');
const salesRoute = require('./Routers/sales.router');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
}); 

app.use('/products', productsRouter);
app.use('/sales', salesRoute);

module.exports = app;