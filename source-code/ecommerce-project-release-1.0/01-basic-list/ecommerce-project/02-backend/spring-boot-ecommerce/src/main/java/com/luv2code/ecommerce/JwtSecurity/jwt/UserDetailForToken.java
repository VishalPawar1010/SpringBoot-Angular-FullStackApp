package com.luv2code.ecommerce.JwtSecurity.jwt;

import java.util.HashSet;
import java.util.Set;

import com.luv2code.ecommerce.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDetailForToken {

	private String email;
    private Integer id;
    
    
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}

	public UserDetailForToken(String email, Integer id) {
		super();
		this.email = email;
		this.id = id;
	}


	



}
