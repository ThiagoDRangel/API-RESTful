const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');
const { allProductsMock, errorName, updateProductMock, shortName } = require('../mocks/productsMock');

describe('5 - Tests Products in product-Service', () => {
  describe('Success Case', () => {
    afterEach(() => sinon.restore());

    it('5.1 - Recover all products with data', async () => {
      sinon.stub(productModel, 'getAllProducts').resolves(allProductsMock);
      const result = await productService.getAllProducts();
      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      expect(result[0]).to.have.keys(['id', 'name']);
    });

    it('5.2 - Recover all when without data', async () => {
      sinon.stub(productModel, 'getAllProducts').resolves([]);
      const result = await productService.getAllProducts();
      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('5.3 - Recover product from id', async () => {
      const result = await productService.getProductById(1);
      expect(result).to.be.an('object');
      expect(result).to.have.keys({ id: 1, name: 'Martelo de Thor' });
    });

    it('5.4 - Create a new Product', async () => {
      const product = { id: 75, name: 'Silvester Stalone' };
      sinon.stub(productModel, 'registerProduct').resolves(product);
      const result = await productService.registerProduct(product);
      expect(result).to.be.an('object');
      expect(result).to.have.keys(['id', 'name']);
    });

    it('5.5 - Update Product if exists', async () => {
      const product = 'Stormbreaker';
      sinon.stub(productModel, 'updateProduct').resolves(updateProductMock);
      const result = await productService.updateProduct(1, product);
      expect(result).to.be.an('object');
      expect(result).to.have.keys({ id: 17, name: 'kriptonita' });
    });

    it('5.6 - Delete Product in db', async () => {
      sinon.stub(productModel, 'deleteProduct').resolves({ id: 1 });
      const [result] = await productService.deleteProduct(1);
      expect(result).to.be.an('object');
      expect(result).to.have.keys('id', 'name');
    });

    it('5.7 - Search Product by name if exists2', async () => {
      const [result] = await productService.searchProduct('Martelo');
      expect(result).to.exist;
      expect(result).to.be.an('object');
      expect(result).to.have.keys('id', 'name');
    });
  });

  describe('Fail Case', () => {
    afterEach(() => sinon.restore());

    it('5.8 - Error when recover products from id', async () => {
      sinon.stub(productModel, 'getProductById').resolves([{ id: undefined }]);

      const result = await productService.getProductById(Infinity);
      expect(result).to.be.an('object');
      expect(result).to.have.keys(['id']);
    });

    it('5.9 - Error Create Product with empty name', async () => {
      const product = { name: '' };

      sinon.stub(productModel, 'registerProduct').resolves(errorName);
      const result = await productService.registerProduct(product);
      expect(result).to.be.an('object');
      expect(result).to.have.keys(['type', 'message']);
      expect(result.message).to.be.an('object');
      expect(result.message).to.have.keys(['message']);
      expect(result.message.message).to.be.equal('"name" is required');
    });

    it('5.9.1 - Error Create Product with short name', async () => {
      const product = { name: 'lhimen' };

      sinon.stub(productModel, 'registerProduct').resolves(shortName);
      const result = await productService.registerProduct(product);
      expect(result).to.be.an('object');
      expect(result).to.have.keys(['type', 'message']);
      expect(result.message).to.be.an('object');
      expect(result.message).to.have.keys(['message']);
      expect(result.message.message).to.be.equal('"name" length must be at least 5 characters long');
    });

    it('5.9.2 - Error Update Product with wrong id', async () => {
      const product = 'chapolin';
      sinon.stub(productModel, 'getProductById').resolves([undefined]);
      const result = await productService.updateProduct(Infinity, product);
      expect(result).to.be.an('object');
      expect(result).to.have.keys(['type', 'message']);
      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.an('object');
      expect(result.message).to.have.keys(['message']);
      expect(result.message.message).to.be.equal('Product not found');
    });

    it('5.9.3 - Error Delete Product with wrong id', async () => {
      sinon.stub(productModel, 'getProductById').resolves(undefined);
      const result = await productService.deleteProduct(Infinity);
      expect(result).to.be.an('object');
      expect(result).to.have.keys(['type', 'message']);
      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.an('object');
      expect(result.message).to.have.keys(['message']);
      expect(result.message.message).to.be.equal('Product not found');
    });

    it('5.9.4 - Search Product by name with wrong name in db', async () => {
      const fakeName = 'Fake Name';
      const result = await productService.searchProduct(fakeName);
      expect(result).to.be.an('object');
      expect(result).to.have.keys(['type', 'message']);
      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.an('object');
      expect(result.message).to.have.keys(['message']);
    });
  });
});