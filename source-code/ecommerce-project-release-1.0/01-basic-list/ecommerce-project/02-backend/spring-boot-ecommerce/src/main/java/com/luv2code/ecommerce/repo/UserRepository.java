package com.luv2code.ecommerce.repo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.User;

@Repository
@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Integer> {
//	Page<User> findById(@Param("id") Integer id, Pageable Pageable);

//	@Query("SELECT u FROM User u WHERE u.email = :email")
//	public User getUserByEmail(@Param("email") String email);
	
	Optional<User> findByEmail(String email);
	
    boolean existsByEmail(String email);


//	 User findByEmail(String email);
//	public User findByEmail(String email);

//	SELECT u FROM User u WHERE u.email = :email
//	 var findByEmail(String email);

//	Page<User> findByRoleId(@Param("roles") String string,Pageable Pageable);


}
