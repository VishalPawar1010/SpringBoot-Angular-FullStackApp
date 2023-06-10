package com.luv2code.ecommerce.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import com.luv2code.ecommerce.dao.UserRepository;
import com.luv2code.ecommerce.dto.ImageUtil;
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
		System.out.println("in get users list ");
		 for (User user : users) {
//		        System.out.println("In getUserForLoop");
		        byte[] photos = user.getPhotos();
		        if (photos != null) {
		            byte[] decompressedData = ImageUtil.decompressImage(photos);
		            user.setPhotos(decompressedData);
		        }
		    }
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
//    @PostMapping("/users")
//    public ResponseEntity<User> addUser(@RequestBody User newUser) {
//        User createdUser = userRepository.save(newUser);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
//    }

//	@PostMapping("/users")
//	public ResponseEntity<User> addUser(@RequestParam("photoFile") MultipartFile photoFile,
//			@RequestParam("newUser") String newUserJson) {
//		try {
//			// Convert the newUserJson string to User object
//			ObjectMapper objectMapper = new ObjectMapper();
//			User newUser = objectMapper.readValue(newUserJson, User.class);
//
//			// Convert the MultipartFile to a byte array
//			byte[] photoData = photoFile.getBytes();
//
//			// Compress the image data
//			byte[] compressedData = ImageUtil.compressImage(photoData);
//
//			// Set the compressed photo data to the newUser object
//			newUser.setPhotos(compressedData);
//
//			// Save the user to the database
//			User createdUser = userRepository.save(newUser);
//
//			return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
//		} catch (IOException e) {
//			// Handle the exception
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//		}
//	}
	@PostMapping("/users")
	public ResponseEntity<User> addUser(@RequestParam(value = "photoFile", required = false) MultipartFile photoFile,
	                                     @RequestParam("newUser") String newUserJson) {
	    try {
	        // Convert the newUserJson string to User object
	        ObjectMapper objectMapper = new ObjectMapper();
	        User newUser = objectMapper.readValue(newUserJson, User.class);

	        if (photoFile != null && !photoFile.isEmpty()) {
	            // Convert the MultipartFile to a byte array
	            byte[] photoData = photoFile.getBytes();

	            // Compress the image data
	            byte[] compressedData = ImageUtil.compressImage(photoData);

	            // Set the compressed photo data to the newUser object
	            newUser.setPhotos(compressedData);
	        } else {
	            // If no photo is uploaded, set the default image
	            byte[] defaultImageData = getDefaultImageData();
	            newUser.setPhotos(defaultImageData);
	        }

	        // Save the user to the database
	        User createdUser = userRepository.save(newUser);

	        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	    } catch (IOException e) {
	        // Handle the exception
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}

	private byte[] getDefaultImageData() throws IOException {
	    // Read the default image file
	    ClassPathResource resource = new ClassPathResource("/static/user-photos/avatar.png");
	    InputStream inputStream = resource.getInputStream();
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
	    byte[] buffer = new byte[4096];
	    int bytesRead;
	    while ((bytesRead = inputStream.read(buffer)) != -1) {
	        outputStream.write(buffer, 0, bytesRead);
	    }
	    byte[] imageData = outputStream.toByteArray();
	    
	    // Compress the image data if needed
	    byte[] compressedData = ImageUtil.compressImage(imageData);
	    
	    return compressedData;
	}





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
