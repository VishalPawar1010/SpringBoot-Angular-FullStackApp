package com.luv2code.ecommerce.controller;

public interface LoginInterface {

    public AuthenticationResponse loginRequest(LoginDetail loginDetail) 
    		throws MissingParameterException
    		;
}
