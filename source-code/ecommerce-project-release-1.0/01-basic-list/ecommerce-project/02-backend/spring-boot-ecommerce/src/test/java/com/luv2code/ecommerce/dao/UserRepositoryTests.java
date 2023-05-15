package com.luv2code.ecommerce.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.luv2code.ecommerce.entity.Role;
import com.luv2code.ecommerce.entity.User;


//@DataJpaTest
//@AutoConfigureTestDatabase
public class UserRepositoryTests {

	
	    @Autowired
	    private TestEntityManager entityManager;

	    @Autowired
	    private UserRepository userRepository;

	    private User testUser;
	    private Role role1;
	    private Role role2;

	    @BeforeEach
	    public void setUp() {
	    	testUser = new User("ramesh@patel.com", "password", "Ramesh", "Patel");
	        role1 = new Role("Admin");
	        role2 = new Role("Editor");
	    }
	

	
	    @Test
	    public void testCreateAndGetUser() {
	        User user = new User();
//	        user.setId(1);
	        user.setFirstName("John");
	        user.setEnabled(true);
	        user.setEmail("john@gmail.com");
	        user.setLastName("Patel");
	        

	        assertEquals(true, user.isEnabled());
	        assertEquals("John", user.getFirstName());
	        assertEquals("Patel", user.getLastName());
	        assertEquals("john@gmail.com", user.getEmail());

	    }
	    @Test
	    public void testGettersAndSetters() {
	        Integer id = 123;
	        String email ="ramesh@patel.com";
	        String password = "password";
	        String firstName = "Ramesh";
	        String lastName = "Patel";
	        String photos = "photo.png";
	        boolean enabled = true;
	        Set<Role> roles = new HashSet<>();
	        roles.add(role1);
	        roles.add(role2);
	        
	        testUser.setId(id);
	        testUser.setEmail(email);
	        testUser.setPassword(password);
	        testUser.setFirstName(firstName);
	        testUser.setLastName(lastName);
	        testUser.setPhotos(photos);
	        testUser.setEnabled(enabled);
	        testUser.setRoles(roles);
	        
	        assertEquals(id, testUser.getId());
	        assertEquals(email, testUser.getEmail());
	        assertEquals(password, testUser.getPassword());
	        assertEquals(firstName, testUser.getFirstName());
	        assertEquals(lastName, testUser.getLastName());
	        assertEquals(photos, testUser.getPhotos());
	        assertTrue(testUser.isEnabled());
	        assertEquals(roles, testUser.getRoles());
	    }
	    @Test
	    public void testAddRole() {
	    	testUser.addRole(role1);
	    	testUser.addRole(role2);
	        
	        assertEquals(1, testUser.getRoles().size());
	        assertTrue(testUser.getRoles().contains(role1));
	        assertTrue(testUser.getRoles().contains(role2));
	    }
	    @Test
	    public void testToString() {
	    	testUser.addRole(role1);
	    	testUser.addRole(role2);
//	    	User [id=15, email=jackkbruce@yahoo.com, firstName=Jack, lastName=Bruce, roles=[Editor, Shipper]]
	        String expectedString = "User [id=null, email=ramesh@patel.com, firstName=Ramesh, lastName=Patel, roles=[Admin]]";
	        assertEquals(expectedString, testUser.toString());
	        
	        
//	        System.out.println(testUser.toString());
//	        Actual = User [id=null, email=ramesh@patel.com, firstName=Ramesh, lastName=Patel, roles=[Admin]]
	    }
	    
	    @Test
	    public void testConstructor() {
	        assertNotNull(testUser);
	        assertEquals("ramesh@patel.com", testUser.getEmail());
	        assertEquals("password", testUser.getPassword());
	        assertEquals("Ramesh", testUser.getFirstName());
	        assertEquals("Patel", testUser.getLastName());
	        assertTrue(testUser.getRoles().isEmpty());
	    }

	

	
}
