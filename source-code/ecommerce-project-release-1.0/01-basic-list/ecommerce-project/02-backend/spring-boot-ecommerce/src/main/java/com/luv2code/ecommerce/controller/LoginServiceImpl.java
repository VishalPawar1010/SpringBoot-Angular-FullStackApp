package com.luv2code.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;


@Qualifier("loginDaoImpl")
@Service
public class LoginServiceImpl implements LoginInterface {

	@Autowired
	private LoginInterface loginDao;


 	@Override
 	public AuthenticationResponse loginRequest(LoginDetail loginDetail) throws MissingParameterException {
 	
 		
 		return loginDao.loginRequest(loginDetail);
}
}