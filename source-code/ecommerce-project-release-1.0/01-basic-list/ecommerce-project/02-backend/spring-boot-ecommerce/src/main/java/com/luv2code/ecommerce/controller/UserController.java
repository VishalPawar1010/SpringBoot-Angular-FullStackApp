package com.luv2code.ecommerce.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.entity.Role;
import com.luv2code.ecommerce.entity.User;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
//    
//    @PutMapping("/updateUser")
//    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
//        Optional<User> userOptional = userRepository.findById(updatedUser.getId());
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            user.setEmail(updatedUser.getEmail());
//            user.setPassword(updatedUser.getPassword());
//            user.setFirstName(updatedUser.getFirstName());
//            user.setLastName(updatedUser.getLastName());
//            user.setEnabled(updatedUser.isEnabled());
//            // user.setPhotos(updatedUser.getPhotos()); // Uncomment this line if 'photos' property is available in the User class
//
//            Set<Role> updatedRoles = updatedUser.getRoles();
//            if (updatedRoles != null) {
//                user.getRoles().clear(); // Clear existing roles
//                user.getRoles().addAll(updatedRoles); // Set new roles
//            }
//
//            User savedUser = userRepository.save(user);
//            return ResponseEntity.ok(savedUser);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUserById(@PathVariable Integer id, @RequestBody User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEnabled(updatedUser.isEnabled());
//            user.setPhotos(updatedUser.setPhotos(string))

            Set<Role> updatedRoles = updatedUser.getRoles();
            if (updatedRoles != null) {
                user.getRoles().clear(); // Clear existing roles
                user.getRoles().addAll(updatedRoles); // Set new roles
            }


            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userRepository.delete(user);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
