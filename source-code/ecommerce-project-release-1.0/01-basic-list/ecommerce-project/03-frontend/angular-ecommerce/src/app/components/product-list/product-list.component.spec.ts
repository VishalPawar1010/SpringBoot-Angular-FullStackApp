import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from 'src/app/services/product.service';
import { productsData } from 'server/productData';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    const productService = jasmine.createSpyObj('ProductService', [
      'getProductList',
    ]);
    const activatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { paramMap: jasmine.createSpyObj('ParamMap', ['has', 'get']) },
    });

    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productServiceSpy = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    activatedRouteSpy = TestBed.inject(
      ActivatedRoute
    ) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create the product list component', () => {
    expect(component).toBeTruthy();
  });
});
