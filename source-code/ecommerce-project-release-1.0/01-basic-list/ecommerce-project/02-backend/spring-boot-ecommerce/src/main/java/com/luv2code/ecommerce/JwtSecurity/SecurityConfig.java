package com.luv2code.ecommerce.JwtSecurity;

import aj.org.objectweb.asm.TypeReference;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luv2code.ecommerce.JwtSecurity.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Autowired
	private AuthenticationProvider authenticationProvider;

	@Bean
	protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http.cors().and().csrf().disable();

		http.authorizeRequests()
		
//		.antMatchers("/api/users/**","/api/roles","/api/products").hasAuthority("Admin")
		.antMatchers("/api/login","/api/logout").permitAll()
		.antMatchers("/api/products/","/api/product-category/**").hasAnyAuthority("Admin","Editor","Salesperson")
		.antMatchers("/api/products/","/api/product-category/**").hasAnyAuthority("Admin","Editor","Salesperson")
		.antMatchers("/api/roles").hasAnyAuthority("Admin","Shipper")
		.antMatchers("/api/**").hasAuthority("Admin")
		.antMatchers("/home").authenticated()
		;

//		.antMatchers("/products","/product-category/**").authenticated()
		
//		.and().httpBasic()
//		.and().formLogin();
		
		 http
         .logout()
             .logoutUrl("/logout") 
             .logoutSuccessUrl("/api/login?logout") 
             .invalidateHttpSession(true) 
             .deleteCookies("Token"); 
	
//				.anyRequest().authenticated()
//      .and().httpBasic()
//				.and().formLogin();
//		;

//		http.authorizeRequests().antMatchers("/authenticate").permitAll()
//		.anyRequest().authenticated()
//		.and().exceptionHandling()
//				.and()

		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	private String[] getServices(String location) {
		InputStream fileStream = TypeReference.class.getResourceAsStream(location);
		ObjectMapper mapper = new ObjectMapper();
		List<String> urlList = new ArrayList<>();
		try {
			urlList = mapper.readValue(fileStream, ArrayList.class);
		} catch (StreamReadException e) {
			throw new RuntimeException(e);
		} catch (DatabindException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		return urlList.stream().toArray(String[]::new);
	}
}
