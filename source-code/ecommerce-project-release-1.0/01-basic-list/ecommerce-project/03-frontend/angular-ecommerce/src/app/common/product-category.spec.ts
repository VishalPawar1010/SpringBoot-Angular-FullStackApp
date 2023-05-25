import { ProductCategory } from './product-category';

// describe('ProductCategory', () => {
//   it('should create an instance', () => {
//     // expect(new ProductCategory()).toBeTruthy();
//     pending();
//   });
// });

describe('ProductCategory', () => {
  it('should create a ProductCategory instance', () => {
    const category = new ProductCategory(
      1, // id
      'Electronics' // categoryName
    );

    expect(category).toBeDefined();
    expect(category.id).toEqual(1);
    expect(category.categoryName).toEqual('Electronics');
  });
});
