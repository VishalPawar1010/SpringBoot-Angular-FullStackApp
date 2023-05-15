package com.luv2code.ecommerce.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

public class ProductRepositoryTests {

	@Autowired
	private ProductRepository productRepository;

	private Product product;

	@BeforeEach
	public void setup() {
		product = new Product();
	}

	@Test
	public void testSetAndGetId() {
		Long id = 1L;
		product.setId(id);
		assertEquals(id, product.getId());
	}
	@Test
	public void testGettersAndSetters() {
		ProductCategory category = new ProductCategory();
		category.setId(1L);
		category.setCategoryName("NodeJS");
		
		Date date1 = new Date();
		BigDecimal price = new BigDecimal("10.00");
		
		Product product = new Product();
		product.setId(1L);
		product.setSku("BOOK-TECH-Demo");
		product.setName("Test Product");
		product.setDescription("Test Description");
		product.setUnitPrice(price);
		product.setImageUrl("Test-Image-URL");
		product.setActive(true);
		product.setUnitsInStock(5);
		product.setCategory(category);
		product.setDateCreated(date1);
		product.setLastUpdated(date1);
		
		
		 assertEquals(1L, product.getId());
		 assertEquals("BOOK-TECH-Demo", product.getSku());
		 assertEquals("Test Product", product.getName());
		 assertEquals("Test Description", product.getDescription());
		 assertEquals(price, product.getUnitPrice());
		 assertEquals("Test-Image-URL", product.getImageUrl());
		 assertEquals(true, product.isActive());
		 assertEquals(5, product.getUnitsInStock());
		 
		 assertEquals(category, product.getCategory());
		 assertEquals(date1, product.getDateCreated());
		 assertEquals(date1, product.getLastUpdated());
		 
		
	}
}
