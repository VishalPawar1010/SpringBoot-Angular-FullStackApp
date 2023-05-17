package com.luv2code.ecommerce.JwtSecurity.jwt;

import com.luv2code.ecommerce.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDetailForToken {

    private String email;
    private Integer id;
    private Role role;
    
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
	
	public Role getRole() {
		return role;
	}
	
	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UserDetailForToken [email=" + email + ", id=" + id + ", role=" + role + "]";
	}


}
