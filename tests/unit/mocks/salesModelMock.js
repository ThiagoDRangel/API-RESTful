const sucessMock = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  }
];

const productMock = [
  {
    "productId": 2,
    "quantity": 2
  }
];

const getAllMock = [
  {
    saleId: 1,
    date: '2023-05-02T08:20:00.000Z',
    productId: 1,
    quantity: 50
  },
  {
    saleId: 1,
    date: '2023-05-02T08:20:00.000Z',
    productId: 2,
    quantity: 100
  },
];

const getByIdMock = [
  {
    saleId: 1,
    date: '2023-05-02T08:20:00.000Z',
    productId: 1,
    quantity: 50
  },
];

const delSaleMock = [
  {
    saleId: 1,
    date: '2023-04-28T22:36:35.000Z',
    productId: 1,
    quantity: 5
  },
];

const updateProductMock = [
  {
    fieldCount: 0,
    affectedRows: 2,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1
  },
];

module.exports = {
  sucessMock,
  productMock,
  getAllMock,
  getByIdMock,
  delSaleMock,
  updateProductMock,
};