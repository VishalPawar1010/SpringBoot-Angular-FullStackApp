package com.luv2code.ecommerce.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.JwtSecurity.jwt.JwtService;
import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.User;

@Service
public class eComUserDetailsService implements UserDetailsService {

//	@Autowired
	private UserRepository userRepo;
	@Autowired
	private JwtService jwtService;
	
	public eComUserDetailsService(UserRepository userRepo) {
		super();
		this.userRepo = userRepo;
	}
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		User user = userRepo.getUserByEmail(email);
		System.out.println("email -" + email);
		User user = userRepo.findByEmail(email);
		System.out.println("user - " + user.toString());
		if (user != null) {
			return new eComUserDetails(user);
		}
		
		throw new UsernameNotFoundException("Could not find user with email: " + email);
	}

}
