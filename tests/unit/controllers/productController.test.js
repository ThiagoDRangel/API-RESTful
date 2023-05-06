const chai = require('chai');
const { expect } = chai;

const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productService = require('../../../src/services/products.service');
const productController = require('../../../src/controllers/products.controller');

const { allProductsMock, productByIdMock, updateProductMock, dellProductMock, newProductMock } = require('../mocks/productsMock');
const { error } = require('shelljs');

describe('1 - Tests Products in product-Controller', () => {
  describe('Success Case', () => {
    afterEach(() => sinon.restore());
    it('1.1 - Recover all products', async () => {
      sinon.stub(productService, 'getAllProducts').resolves(allProductsMock);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getAllProducts(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('1.2 - Recover products by id', async () => {
      sinon.stub(productService, 'getProductById').resolves(productByIdMock);

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('1.3 - Add a new product', async () => {
      const newProductMock = {
        id: 5,
        name: 'Ring of Power'
      };
      sinon.stub(productService, 'registerProduct').resolves(newProductMock);

      const req = { body: newProductMock };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.registerProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it('1.4 - Updated one Product', async () => {
      const product = { name: 'kriptonita' };
      sinon.stub(productService, 'updateProduct').resolves(updateProductMock);

      const req = { params: { id: 17 }, body: product };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('1.5 - Delete one Product for id', async () => {
      sinon.stub(productService, 'deleteProduct').resolves(dellProductMock);

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
    });

    it('1.6 - Searching Product for name', async () => {
      const req = { query: { q: 'Traje' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.searchProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('Fail Case', () => {
    afterEach(() => sinon.restore());

    it('1.7 - Try return product with wrong id', async () => {
      const req = { params: { id: 'Thor' } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getProductById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });

    it('1.8 - Delete Product with wrong id', async () => {
      const req = { params: { id: Infinity } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.deleteProduct(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });
  });
});