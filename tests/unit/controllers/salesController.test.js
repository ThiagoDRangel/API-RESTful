const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const saleService = require('../../../src/services/sales.service');
const saleController = require('../../../src/controllers/sales.controller');
const { productMock, getAllMock, delSaleMock } = require('../mocks/salesModelMock');

describe('2 - Tests products sales in Sales-Controller', () => {
  describe('Success Case', async () => {
  afterEach(() => sinon.restore());

  it('2.1 - Register a Product Sale', async () => {
      sinon.stub(saleService, 'registerSale').resolves(1);

      const req = { body: productMock };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
    });

    it('2.2 - Get All Sales', async () => {
      sinon.stub(saleService, 'getAllSales').resolves(getAllMock);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getAllSales(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('2.3 - Recover a product Sale By Id', async () => {
      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('2.4 - Delete a Product Sale', async () => {
      sinon.stub(saleService, 'deleteSale').resolves(delSaleMock);

      const req = { params: { id: 2 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });

    it('2.5 - Update Sale', async () => {
      const req = { params: { id: 2 }, body: productMock };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.updateSale(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
  });

  describe('Fail Case', () => {
    it('2.6 - Try recover Sale with wrong id', async () => {
      const req = { params: { id: Infinity } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });

    it('2.7 - Try Delete Sale with wrong id', async () => {
      const req = { params: { id: Infinity } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });

    it('2.8 - Try Update Sale with wrong id', async () => {
      const req = { params: { id: Infinity }, body: productMock };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
    });
  });
});