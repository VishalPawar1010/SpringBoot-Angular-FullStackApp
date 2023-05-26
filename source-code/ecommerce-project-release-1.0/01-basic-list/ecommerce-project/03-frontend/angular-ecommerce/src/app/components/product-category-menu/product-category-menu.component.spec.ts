import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductCategoryMenuComponent } from './product-category-menu.component';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/common/product-category';
import { productCategoryData } from 'server/productCategoryData';

describe('ProductCategoryMenuComponent', () => {
  let component: ProductCategoryMenuComponent;
  let fixture: ComponentFixture<ProductCategoryMenuComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const productService = jasmine.createSpyObj('ProductService', [
      'getProductCategories',
    ]);

    TestBed.configureTestingModule({
      declarations: [ProductCategoryMenuComponent],
      providers: [{ provide: ProductService, useValue: productService }],
    });

    fixture = TestBed.createComponent(ProductCategoryMenuComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
  });

  it('should create the product category menu component', () => {
    expect(component).toBeTruthy();
  });

  it('should call listProductCategories method and update productCategory property', () => {
    productServiceSpy.getProductCategories.and.returnValue(
      of(productCategoryData)
    );

    component.ngOnInit();

    expect(productServiceSpy.getProductCategories).toHaveBeenCalled();
    expect(component.productCategory).toEqual(productCategoryData);
  });
});
