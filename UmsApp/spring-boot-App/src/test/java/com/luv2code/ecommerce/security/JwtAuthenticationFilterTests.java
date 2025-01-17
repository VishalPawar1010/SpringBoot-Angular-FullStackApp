package com.luv2code.ecommerce.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.security.service.JwtService;

public class JwtAuthenticationFilterTests {

	@Mock
	private JwtService jwtService;

	@Mock
	private eComUserDetailsService userDetailsService;

	@Mock
	private FilterChain filterChain;

	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		jwtAuthenticationFilter = new JwtAuthenticationFilter();
		jwtAuthenticationFilter.jwtService = jwtService;
		jwtAuthenticationFilter.userDetailsService = userDetailsService;
	}

	@Test
	void testDoFilterInternal_ValidToken() throws ServletException, IOException {
		String token = "valid_token";
		String userEmail = "email@example.com";

		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();
		request.addHeader("Authorization", "Bearer " + token);

		eComUserDetails userDetails = new eComUserDetails(new User());
		when(jwtService.extractUsername(token)).thenReturn(userEmail);
		when(userDetailsService.loadUserByUsername(userEmail)).thenReturn(userDetails);
		when(jwtService.isTokenValid(token, userDetails)).thenReturn(true);

		jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

		// Verify that authentication was set in the security context
		assertTrue(
				SecurityContextHolder.getContext().getAuthentication() instanceof UsernamePasswordAuthenticationToken);
		assertEquals(userDetails, SecurityContextHolder.getContext().getAuthentication().getPrincipal());

		verify(filterChain, times(1)).doFilter(request, response);
	}

	@Test
	void testDoFilterInternal_InvalidToken() throws ServletException, IOException {
		String token = "invalid_token";

		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();
		request.addHeader("Authorization", "Bearer " + token);

		when(jwtService.extractUsername(token)).thenReturn(null);

		jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

		// Verify that no authentication was set in the security context
		assertNull(SecurityContextHolder.getContext().getAuthentication());

		verify(filterChain, times(1)).doFilter(request, response);
	}

	@Test
	void testDoFilterInternal_NoToken() throws ServletException, IOException {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();

		jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

		// Verify that no authentication was set in the security context
		assertNull(SecurityContextHolder.getContext().getAuthentication());

		verify(filterChain, times(1)).doFilter(request, response);
	}
}
