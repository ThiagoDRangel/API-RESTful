const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');

const {
  allProductsMock,
  productByIdMock,
  updateProductMock,
  createResolves,
  dellProductMock,
} = require('../mocks/productsMock');

describe('3 - Tests Products in product-Model', () => {
  afterEach(() => sinon.restore());

  it('3.1 - Recover all products', async () => {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);
    const result = await productModel.getAllProducts();

    expect(result).to.be.an('array');
    expect(result).to.have.length(2);
    expect(result[0]).to.have.keys(['id', 'name']);
  });

  it('3.2 - Recover all without data', async () => {
    sinon.stub(connection, 'execute').resolves([[]]);

    const response = await productModel.getAllProducts();
    expect(response).to.be.an('array');
    expect(response).to.have.length(0);
  });
  
  it('3.3 - Create a new Product', async () => {
    const product = { id: 1, name: 'Radouken' };

    sinon.stub(connection, 'execute').resolves(createResolves);

    const response = await productModel.registerProduct(product);

    expect(response).to.be.an('object');
    expect(product).to.have.keys('id', 'name');
  });

  it('3.4 - Update a existed Product', async () => {
    const product = 'Stormbreaker';

    sinon.stub(connection, 'execute').resolves([productByIdMock]);
    const oldProduct = await productModel.getProductById(1);
    expect(oldProduct.name).to.be.equal('Martelo de Thor');

    sinon.restore();

    sinon.stub(connection, 'execute').resolves([[updateProductMock]]);
    const response = await productModel.updateProduct(1, product);

    expect(response).to.be.an('object');
    expect(response).to.have.keys(['id', 'name']);
    expect(response.name).to.be.equal(product);
  });

  it('3.5 - Delete Product from id', async () => {
    sinon.stub(connection, 'execute').resolves([allProductsMock]);

    const deleted = await productModel.getAllProducts();
    expect(deleted).to.be.an('array');
    expect(deleted).to.have.length(2);

    sinon.restore();

    sinon.stub(connection, 'execute').resolves([dellProductMock]);
    await productModel.deleteProduct(2);
    const deletedProduct = await productModel.getAllProducts();
    expect(deletedProduct).to.be.an('array');
    expect(deletedProduct).to.have.length(1);
  });

  it('3.6 - Search Product by name if exists', async () => {
    const product = 'encolhimento';
    sinon.stub(connection, 'execute').resolves([allProductsMock[1]]);
    const result = await productModel.searchProduct(product);
 
    expect(result).to.be.an('object');
    expect(result).to.have.keys(['id', 'name']);
    expect(result.name).to.be.equal('Traje de encolhimento');
  });
});