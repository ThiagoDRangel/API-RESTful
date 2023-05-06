const { expect } = require('chai');
const sinon = require('sinon');

const saleModel = require('../../../src/models/sales.model');
const saleService = require('../../../src/services/sales.service');
const { productMock, getAllMock } = require('../mocks/salesModelMock');

describe('6 - Tests Sales in Sales-Service', () => {
  describe('Success Case', () => {
    afterEach(() => sinon.restore());

    it('6.1 - Test Register is ok ', async () => {
      sinon.stub(saleModel, 'registerSale').resolves(1);
      sinon.stub(saleModel, 'registerProductSale').resolves(50);

      const result = await saleService.registerSale(productMock);

      expect(result).to.be.an('number');
      expect(result).to.be.equal(1);
    });

    it('6.2 - Recover all Products Sales', async () => {
      sinon.stub(saleModel, 'getAllSales').resolves(getAllMock);

      const result = await saleService.getAllSales();

      expect(result).to.be.an('array');
      expect(result).to.be.deep.equal(getAllMock);
    });

    it('6.3 - Recover a sale by id', async () => {

      const result = await saleService.getSaleById(1);

      expect(result).to.be.an('array');
      expect(result[0]).to.have.keys(['date', 'productId', 'quantity']);
    });

    it('6.4 - Delete a sale if exists', async () => {
      sinon.stub(saleModel, 'deleteSale').resolves();
      const result = await saleService.deleteSale(1);

      expect(result).to.be.an('array');
      expect(result[0]).to.have.keys(['date', 'productId', 'quantity']);
    });

    it('6.5 - Update a sale if exists', async () => {
      sinon.stub(saleModel, 'updateSale').resolves();

      const result = await saleService.updateSale(1, productMock);
      expect(result).to.be.an('array');
    });
  });

  describe('Fail Case', () => {
    it('6.6 - Try recover Sale By Id with wrong id', async () => {
      const result = await saleService.getSaleById(Infinity);

      expect(result).to.be.an('object');
      expect(result).to.have.keys(['type', 'message']);
      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.an('object');
      expect(result.message).to.have.keys(['message']);
      expect(result.message.message).to.be.equal('Sale not found');
    });

    it('6.7 - Try Delete Sale with wrong id', async () => {
      sinon.stub(saleModel, 'deleteSale').resolves(undefined);
      const result = await saleService.deleteSale(Infinity);

      expect(result).to.be.an('object');
      expect(result).to.have.keys(['type', 'message']);
      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.an('object');
      expect(result.message).to.have.keys(['message']);
      expect(result.message.message).to.be.equal('Sale not found');
    });

    it('6.8 - Try Update Sale with wrong id', async () => {
      sinon.stub(saleModel, 'updateSale').resolves(undefined);
      const result = await saleService.updateSale(Infinity, productMock);

      expect(result).to.be.an('object');
      expect(result).to.have.keys(['type', 'message']);
      expect(result.type).to.be.equal(404);
      expect(result.message).to.be.an('object');
      expect(result.message).to.have.keys(['message']);
      expect(result.message.message).to.be.equal('Sale not found');
    });
  });
});