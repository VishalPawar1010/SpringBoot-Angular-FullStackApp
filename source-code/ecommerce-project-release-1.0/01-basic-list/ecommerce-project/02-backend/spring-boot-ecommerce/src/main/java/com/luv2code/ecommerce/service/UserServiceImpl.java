package com.luv2code.ecommerce.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.luv2code.ecommerce.entity.User;
import com.luv2code.ecommerce.repo.UserRepository;
import com.luv2code.ecommerce.util.ImageUtil;


@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
	private final String defaultPassword = "Admin@123";

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
    	System.out.println("in get user list serviceimpl" );
        for (User user : users) {
            byte[] photos = user.getPhotos();
            if (photos != null) {
                byte[] decompressedData = ImageUtil.decompressImage(photos);
                user.setPhotos(decompressedData);
            }
        }
        return users;
    }
    
    @Override
    public User getUserById(Integer id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).get();
    }
    
    private String encode(String password) {
    	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
    	String ecodedPassword = bcrypt.encode(password);
    	return ecodedPassword;
    }
    
    @Override
    public User addUser(User newUser) {
    	System.out.println("in add user serviceimpl" );
    	System.out.println("in add user after photo==null" );
    	
    	if(newUser.getPassword() != null) {
    		newUser.setPassword(encode(newUser.getPassword()));
    	}
    	else {
    		newUser.setPassword(encode(defaultPassword));
    	}
    	
        return userRepository.save(newUser);
    }
    
//    @Override
//    public User addUser(MultipartFile photoFile, String newUserJson) throws IOException {
//        ObjectMapper objectMapper = new ObjectMapper();
//        User newUser = objectMapper.readValue(newUserJson, User.class);
//
//        if (photoFile != null && !photoFile.isEmpty()) {
//            byte[] photoData = photoFile.getBytes();
//            byte[] compressedData = ImageUtil.compressImage(photoData);
//            newUser.setPhotos(compressedData);
//        } else {
//            byte[] defaultImageData = getDefaultImageData();
//            newUser.setPhotos(defaultImageData);
//        }
//
//        return userRepository.save(newUser);
//    }
    
//	private byte[] getDefaultImageData() throws IOException {
//	    // Read the default image file
//	    ClassPathResource resource = new ClassPathResource("/static/user-photos/avatar.png");
//	    InputStream inputStream = resource.getInputStream();
//	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//	    byte[] buffer = new byte[4096];
//	    int bytesRead;
//	    while ((bytesRead = inputStream.read(buffer)) != -1) {
//	        outputStream.write(buffer, 0, bytesRead);
//	    }
//	    byte[] imageData = outputStream.toByteArray();
//	    
//	    // Compress the image data if needed
//	    byte[] compressedData = ImageUtil.compressImage(imageData);
//	    
//	    return compressedData;
//	}
	
	@Override
	public User updateUserById(Integer id, User updatedUser) {
	    Optional<User> userOptional = userRepository.findById(id);
	    if (userOptional.isPresent()) {
	        User user = userOptional.get();
	        user.setEmail(updatedUser.getEmail());
	    	updatedUser.setPassword(encode(updatedUser.getPassword()));
	        user.setFirstName(updatedUser.getFirstName());
	        user.setLastName(updatedUser.getLastName());
	        user.setGender(updatedUser.getGender());
//	        user.setPhotos(updatedUser.getPhotos());
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

	@Override
	public User updateImage(MultipartFile file, String email) throws IOException {
		 Optional<User> user = userRepository.findByEmail(email);
		 user.get().setPhotos(ImageUtil.compressImage(file.getBytes()));
	        return userRepository.save(user.get());
	}

	@Override
	public byte[] viewImage(String email) {
		 Optional<User> user = userRepository.findByEmail(email);
		
	        return ImageUtil.decompressImage(user.get().getPhotos());
	}

	@Override
	public void deleteImageByEmail(String email) {
		Optional<User> userOptional = userRepository.findByEmail(email);
//		userOptional.get().setPhotos(null);
//		userRepository.save(userOptional.get());
	    if (userOptional.isPresent()) {
	        if (userOptional != null) {
	        	User user = userOptional.get();
	            user.setPhotos(null); 
	            userRepository.save(user);
	        }
	    }		
	}

	@Override
	public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
	}




}