const allProductsMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  }
];

const productByIdMock = {
  "id": 1,
  "name": "Martelo de Thor"
};

const newProductMock = {
  "id": 5,
  "name": "Ring of Power"
};

const updateProductMock = {
  "id": 17,
  "name": "kriptonita"
};

const dellProductMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
];

const createResolves = [{ "fieldCount": 0, "affectedRows": 1, "insertId": 5, "info": "", "serverStatus": 2, "warningStatus": 0 }];

const errorName = { type: 201, message: { message: '"name" is required' } };

const shortName = { type: 201, message: { message: '"name" length must be at least 5 characters long' } };

module.exports = {
  allProductsMock,
  productByIdMock,
  newProductMock,
  updateProductMock,
  createResolves,
  dellProductMock,
  errorName,
  shortName,
};