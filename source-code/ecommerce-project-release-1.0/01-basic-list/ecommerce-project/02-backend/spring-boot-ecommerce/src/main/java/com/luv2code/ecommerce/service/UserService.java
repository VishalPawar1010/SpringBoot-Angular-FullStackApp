package com.luv2code.ecommerce.service;


import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.luv2code.ecommerce.entity.User;

public interface UserService {
	
    List<User> getAllUsers();
    
    User getUserById(Integer id);
    
    User addUser(MultipartFile photoFile, String newUserJson) throws IOException;
    
    User updateUserById(Integer id, User updatedUser);
    
    void deleteUserById(Integer id);




}
