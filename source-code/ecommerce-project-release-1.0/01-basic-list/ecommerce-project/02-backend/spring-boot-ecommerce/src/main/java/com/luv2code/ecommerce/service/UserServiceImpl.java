package com.luv2code.ecommerce.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.repo.UserRepository;
import com.luv2code.ecommerce.util.ImageUtil;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }
    
    @Override
    public User getUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }
    
    @Override
    public User addUser(User newUser) {
        return userRepository.save(newUser);
    }
    
    @Override
    public User addUser(MultipartFile photoFile, String newUserJson) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        User newUser = objectMapper.readValue(newUserJson, User.class);

        if (photoFile != null && !photoFile.isEmpty()) {
            byte[] photoData = photoFile.getBytes();
            byte[] compressedData = ImageUtil.compressImage(photoData);
            newUser.setPhotos(compressedData);
        } else {
            byte[] defaultImageData = getDefaultImageData();
            newUser.setPhotos(defaultImageData);
        }

        return userRepository.save(newUser);
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
	
	@Override
	public User updateUserById(Integer id, User updatedUser) {
	    Optional<User> userOptional = userRepository.findById(id);
	    if (userOptional.isPresent()) {
	        User user = userOptional.get();
	        user.setEmail(updatedUser.getEmail());
	        user.setPassword(updatedUser.getPassword());
	        user.setFirstName(updatedUser.getFirstName());
	        user.setLastName(updatedUser.getLastName());
	        user.setEnabled(updatedUser.isEnabled());
	        user.setRoles(updatedUser.getRoles());

	        return userRepository.save(user);
	    } else {
	        return null;
	    }
	}
	
	@Override
	public void deleteUserById(Integer id) {
	    Optional<User> userOptional = userRepository.findById(id);
	    if (userOptional.isPresent()) {
	        User user = userOptional.get();
	        userRepository.delete(user);
	    }
	}




}
