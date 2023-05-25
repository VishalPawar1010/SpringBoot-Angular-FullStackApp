import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ProductService,
  GetResponseProducts,
  GetResponseProductCategory,
} from './product.service';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { productsData } from 'server/productData';
import { productCategoryData } from 'server/productCategoryData';

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    productService = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  // describe('getProductList', () => {
  //   it('should return a list of products', () => {
  //     const categoryId = 1;
  //     // const expectedProducts: Product[] = productsData; // Assuming `productsData` is the array of products from `productsData.ts`

  //     productService.getProductList(categoryId).subscribe((products) => {
  //       expect(products).toEqual(productsData);
  //     });

  //     const req = httpTestingController.expectOne(
  //       `http://localhost:8080/api/products/search/findByCategoryId?id=${categoryId}`
  //     );
  //     expect(req.request.method).toBe('GET');
  //     req.flush({ _embedded: { products: productsData } });
  //   });
  // });
  describe('getProductList', () => {
    it('should return a list of products', () => {
      const categoryId = 1;
      const productsData: Product[] = []; // Define your mock productsData here

      productService.getProductList(categoryId).subscribe((products) => {
        expect(products).toEqual(productsData);
      });

      const req = httpTestingController.expectOne(
        `http://localhost:8080/api/products/search/findByCategoryId?id=${categoryId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({
        _embedded: { products: productsData },
      } as GetResponseProducts);
    });
  });

  // describe('getProductCategories', () => {
  //   it('should retrieve productCategories list from the API', () => {
  //     productService.getProductCategories().subscribe((categories) => {
  //       expect(categories).toEqual(productCategoryData);
  //     });
  //   });

  //   const req = httpTestingController.expectOne(
  //     'http://localhost:8080/api/product-category'
  //   );
  //   expect(req.request.method).toBe('GET');
  //   req.flush({ _embedded: { productCategory: productCategoryData } });
  // });
  describe('getProductCategories', () => {
    it('should retrieve productCategories list from the API', () => {
      // const productCategoryData: ProductCategory[] = []; // Define your mock productCategoryData here

      productService.getProductCategories().subscribe((categories) => {
        expect(categories).toEqual(productCategoryData);
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8080/api/product-category'
      );
      expect(req.request.method).toBe('GET');
      req.flush({
        _embedded: { productCategory: productCategoryData },
      } as GetResponseProductCategory);
    });
  });
});
