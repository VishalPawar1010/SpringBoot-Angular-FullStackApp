package com.luv2code.ecommerce.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

//@DataJpaTest
public class ProductCategoryRepositoryTests {

	 	@Autowired
	    private ProductCategoryRepository productCategoryRepository;

	    private ProductCategory productCategory;

	    @BeforeEach
	    void setUp() {
	        productCategory = new ProductCategory();
	        productCategory.setCategoryName("Test Category");
	        productCategory.setId(1L);
	        
	    }
	    
	    @Test
		public void testGettersAndSetters() {
	    	Set<Product> products = new HashSet<>();
	        Product product = new Product();
	        product.setName("Test Product");
	        product.setActive(true);
	        product.setUnitsInStock(10);
	        product.setUnitPrice(BigDecimal.TEN);
	        products.add(product);
	        productCategory.setProducts(products);
	    	assertEquals(products, productCategory.getProducts());
	    	assertEquals("Test Category", productCategory.getCategoryName());
	    	assertEquals(1L, productCategory.getId());
	    }
//	    @Test
//	    @DisplayName("Test saving a ProductCategory")
//	    public void testSaveProductCategory() {
//	        ProductCategory savedProductCategory = productCategoryRepository.save(productCategory);
//	        assertNotNull(savedProductCategory.getId());
//	        assertEquals(productCategory.getCategoryName(), savedProductCategory.getCategoryName());
//	        assertEquals(productCategory.getProducts().size(), savedProductCategory.getProducts().size());
//	    }
//
//	    @Test
//	    @DisplayName("Test finding a ProductCategory by id")
//	    public void testFindProductCategoryById() {
//	        ProductCategory savedProductCategory = productCategoryRepository.save(productCategory);
//	        Optional<ProductCategory> optionalProductCategory = productCategoryRepository.findById(savedProductCategory.getId());
//	        assertEquals(productCategory.getCategoryName(), optionalProductCategory.get().getCategoryName());
//	        assertEquals(productCategory.getProducts().size(), optionalProductCategory.get().getProducts().size());
//	    }
//
//	    @Test
//	    @DisplayName("Test deleting a ProductCategory")
//	    public void testDeleteProductCategory() {
//	        ProductCategory savedProductCategory = productCategoryRepository.save(productCategory);
//	        productCategoryRepository.delete(savedProductCategory);
//	        Optional<ProductCategory> optionalProductCategory = productCategoryRepository.findById(savedProductCategory.getId());
//	        assertEquals(Optional.empty(), optionalProductCategory);
//	    }
//
//	    @Test
//	    @DisplayName("Test finding all ProductCategories")
//	    public void testFindAllProductCategories() {
//	        productCategoryRepository.save(productCategory);
//	        Iterable<ProductCategory> iterable = productCategoryRepository.findAll();
//	        Set<ProductCategory> productCategories = new HashSet<>();
//	        iterable.forEach(productCategories::add);
//	        assertEquals(Collections.singleton(productCategory), productCategories);
//	    }


}
