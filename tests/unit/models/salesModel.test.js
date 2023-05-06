const { expect } = require('chai');
const sinon = require('sinon');

const saleModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/connection');
const {
  sucessMock,
  getAllMock,
  getByIdMock,
  delSaleMock,
  updateProductMock,
} = require('../mocks/salesModelMock');

describe('4 - Tests Sales in sales-Model', () => {
  afterEach(() => sinon.restore());

  it('4.1 - Register a product Sale', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await saleModel.registerSale();

    expect(result).to.be.an('number');
    expect(result).to.be.equal(1);
  });

  it('4.2 - Product sale ok', async () => {
    sinon.stub(connection, 'execute').resolves(sucessMock);

    const response = await saleModel.registerProductSale(1, 1, 1);

    expect(response).to.be.an('number');
    expect(response).to.be.equal(0);
  });

  it('4.3 - Recover All Products Sales', async () => {
    sinon.stub(connection, 'execute').resolves([getAllMock]);

    const result = await saleModel.getAllSales();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
  });

  it('4.4 - Recover a Product Sale By Id', async () => {
    sinon.stub(connection, 'execute').resolves([getByIdMock]);

    const result = await saleModel.getSaleById(1);

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0]).to.have.keys('saleId', 'date', 'productId', 'quantity');
  });

  it('4.5 - Delete a product Sale', async () => {
    sinon.stub(connection, 'execute').resolves([getAllMock]);

    const deleted = await saleModel.getAllSales();
    expect(deleted).to.be.an('array');
    expect(deleted).to.have.length(2);

    sinon.restore();
    sinon.stub(connection, 'execute').resolves([delSaleMock]);

    await saleModel.deleteSale(2);

    const result = await saleModel.getAllSales();
    expect(result).to.be.an('array');
    expect(result).to.have.length(1);
  });

  it('4.6 - Update a Product Sale if exists', async () => {
    sinon.stub(connection, 'execute').resolves(updateProductMock);

    const response = await saleModel.updateSale(1, 1, 1);

    expect(response).to.be.an('number');
    expect(response).to.be.equal(0);
  });
});