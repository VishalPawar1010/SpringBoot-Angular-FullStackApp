package com.luv2code.ecommerce.security.service;

import com.luv2code.ecommerce.security.dao.AuthenticationResponse;
import com.luv2code.ecommerce.security.dao.LoginDetail;
import com.luv2code.ecommerce.util.MissingParameterException;

public interface LoginService {

    public AuthenticationResponse loginRequest(LoginDetail loginDetail) 
    		throws MissingParameterException
    		;
}
