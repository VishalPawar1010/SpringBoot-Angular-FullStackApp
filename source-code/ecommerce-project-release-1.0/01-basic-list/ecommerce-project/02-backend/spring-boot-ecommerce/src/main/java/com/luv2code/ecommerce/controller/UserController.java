package com.luv2code.ecommerce.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luv2code.ecommerce.entity.Role;
import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.repo.UserRepository;
import com.luv2code.ecommerce.service.UserService;
import com.luv2code.ecommerce.util.ImageUtil;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}


	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Integer id) {
		User user = userService.getUserById(id);
		if (user != null) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

//	@GetMapping("/users/{id}")
//	public ResponseEntity<User> getUserById(@PathVariable Integer id) {
//		Optional<User> userOptional = userRepository.findById(id);
//		if (userOptional.isPresent()) {
//			User user = userOptional.get();
//			return ResponseEntity.ok(user);
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}
    @PostMapping("/users")
    public ResponseEntity<User> addUser(@RequestBody User newUser) {
        User createdUser = userService.addUser(newUser);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }


	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUserById(@PathVariable Integer id, @RequestBody User updatedUser) {
		User savedUser = userService.updateUserById(id, updatedUser);
		if (savedUser != null) {
			return ResponseEntity.ok(savedUser);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

//	@PutMapping("/users/{id}")
//	public ResponseEntity<User> updateUserById(@PathVariable Integer id, @RequestBody User updatedUser) {
//		Optional<User> userOptional = userRepository.findById(id);
//		if (userOptional.isPresent()) {
//			User user = userOptional.get();
//			user.setEmail(updatedUser.getEmail());
//			user.setPassword(updatedUser.getPassword());
//			user.setFirstName(updatedUser.getFirstName());
//			user.setLastName(updatedUser.getLastName());
//			user.setEnabled(updatedUser.isEnabled());
////            user.setPhotos(updatedUser.setPhotos(string))
//
//			Set<Role> updatedRoles = updatedUser.getRoles();
//			if (updatedRoles != null) {
//				user.getRoles().clear(); // Clear existing roles
//				user.getRoles().addAll(updatedRoles); // Set new roles
//			}
//
//			User savedUser = userRepository.save(user);
//			return ResponseEntity.ok(savedUser);
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<Void> deleteUserById(@PathVariable Integer id) {
		userService.deleteUserById(id);
		return ResponseEntity.noContent().build();
	}

//	@DeleteMapping("/users/{id}")
//	public ResponseEntity<Void> deleteUserById(@PathVariable Integer id) {
//		Optional<User> userOptional = userRepository.findById(id);
//		if (userOptional.isPresent()) {
//			User user = userOptional.get();
//			userRepository.delete(user);
//			return ResponseEntity.noContent().build();
//		} else {
//			return ResponseEntity.notFound().build();
//		}
//	}
}
