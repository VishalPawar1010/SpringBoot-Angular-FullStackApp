package com.luv2code.ecommerce.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
//@CrossOrigin("*")
public class LoginController {

	@GetMapping("/home")
	public String home() {
		return "Welcome to home";
	}
	
	private LoginInterface loginService;

    @Autowired
    public LoginController(
    		@Qualifier("loginServiceImpl") 
    		LoginInterface loginService) {
        this.loginService = loginService;
    }

	
	@PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginRequest(@RequestBody LoginDetail loginDetail) throws MissingParameterException 
    		 {
                 System.out.println(loginService.loginRequest(loginDetail));
        return ResponseEntity.ok(loginService.loginRequest(loginDetail));
    }
	
//	@PostMapping("/logout")
//	  public ResponseEntity<AuthenticationResponse> logout(@RequestBody LoginDetail loginDetail) {
//	    // Perform any necessary cleanup tasks or invalidate the JWT token
//
//	    // Return a success response
//	    return ResponseEntity.ok().build();
//	  }

}
