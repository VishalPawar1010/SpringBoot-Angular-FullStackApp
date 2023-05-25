import { Product } from './product';

// describe('Product', () => {
//   it('should create an instance', () => {
//     // expect(new Product()).toBeTruthy();
//     pending();
//   });
// });
describe('Product', () => {
  it('should create a Product instance', () => {
    const product = new Product(
      'SKU001', // sku
      'Test Product', // name
      'This is a test product', // description
      9.99, // unitPrice
      'path/to/image.jpg', // imageUrl
      true, // active
      100, // unitsInStock
      new Date('2023-01-01'), // dateCreated
      new Date('2023-05-24') // lastUpdated
    );

    expect(product).toBeDefined();
    expect(product.sku).toEqual('SKU001');
    expect(product.name).toEqual('Test Product');
    expect(product.description).toEqual('This is a test product');
    expect(product.unitPrice).toEqual(9.99);
    expect(product.imageUrl).toEqual('path/to/image.jpg');
    expect(product.active).toBeTrue();
    expect(product.unitsInStock).toEqual(100);
    expect(product.dateCreated).toEqual(new Date('2023-01-01'));
    expect(product.lastUpdated).toEqual(new Date('2023-05-24'));
  });
});
