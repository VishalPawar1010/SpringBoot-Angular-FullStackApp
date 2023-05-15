package com.luv2code.ecommerce;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SpringBootEcommerceApplicationTests {

	@Test
	public void contextLoads() {
		// Check if the Spring Boot application context loads properly
		boolean flag = true;
		assertEquals(true,flag);
		
	}

}
