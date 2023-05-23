package com.luv2code.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.JwtSecurity.jwt.JwtService;
import com.luv2code.ecommerce.JwtSecurity.jwt.UserDetailForToken;
import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginDaoImpl implements LoginInterface {

	@Autowired
    private  UserRepository userRepository;
	
	@Autowired
    private  JwtService jwtService;
	
	@Autowired
    private  AuthenticationManager authenticationManager;
	
	@Autowired
    private  AuthenticationProvider authenticationProvider;


    @Override
    public AuthenticationResponse loginRequest(LoginDetail loginDetail) throws MissingParameterException {

//        if(loginDetail.getEmail()==null || loginDetail.getEmail().equals("")){
//            throw new MissingParameterException("Email");
//        }
//        if(loginDetail.getPassword()==null || loginDetail.getPassword().equals("")){
//            throw new MissingParameterException("Password");
//        }
//
//        UsernamePasswordAuthenticationToken usernamePassword = new UsernamePasswordAuthenticationToken(
//                loginDetail.getEmail(),
//                loginDetail.getPassword());
//        Authentication auth = authenticationManager.authenticate(usernamePassword);
//        
        User user = userRepository.getUserByEmail(loginDetail.getEmail());
//        UserDetailForToken userDetailForToken;
//        if(user.getRoles().toString().equals("Admin")){
//            userDetailForToken = new UserDetailForToken(user.getEmail(), user.getId(), user.getRoles());
//        }else{
//            userDetailForToken = new UserDetailForToken(user.getEmail(), user.getId(),user.getRoles());
//        }
//        String jwtToken = jwtService.generateToken(userDetailForToken);
//    	User user = userRepository.findByEmail(loginDetail.getEmail());
    	authenticationManager.authenticate(
    	        new UsernamePasswordAuthenticationToken(
    	        		loginDetail.getEmail(),
    	        		loginDetail.getPassword()
    	        )
    	    );
    	UserDetailForToken userDetailForToken = new UserDetailForToken(user.getEmail(), user.getId(), user.getRoles());
		String jwtToken = jwtService.generateToken(userDetailForToken);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
