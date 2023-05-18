package com.luv2code.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.luv2code.ecommerce.JwtSecurity.jwt.JwtService;
import com.luv2code.ecommerce.JwtSecurity.jwt.UserDetailForToken;
import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.var;

@Service
@RequiredArgsConstructor
public class LoginDaoImpl implements LoginInterface {

	@Autowired
    private  UserRepository userRepository;
	
	@Autowired
    private  JwtService jwtService;
	
	@Autowired
    private  AuthenticationManager authenticationManager;


    @Override
    public AuthenticationResponse loginRequest(LoginDetail loginDetail) throws MissingParameterException {

        if(loginDetail.getEmail()==null || loginDetail.getEmail().equals("")){
            throw new MissingParameterException("Email");
        }
        if(loginDetail.getPassword()==null || loginDetail.getPassword().equals("")){
            throw new MissingParameterException("Password");
        }

        authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken(
                        loginDetail.getEmail(),
                        loginDetail.getPassword()
                )
        );
        User user = userRepository.getUserByEmail(loginDetail.getEmail());
        UserDetailForToken userDetailForToken;
        if(user.getRoles().toString().equals("Admin")){
            userDetailForToken = new UserDetailForToken(user.getEmail(), user.getId());
        }else{
            userDetailForToken = new UserDetailForToken(user.getEmail(), user.getId());
        }
        String jwtToken = jwtService.generateToken(userDetailForToken);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
