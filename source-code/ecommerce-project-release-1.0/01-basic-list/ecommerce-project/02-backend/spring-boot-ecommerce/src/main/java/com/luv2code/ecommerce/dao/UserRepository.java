package com.luv2code.ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.luv2code.ecommerce.entity.Role;
import com.luv2code.ecommerce.entity.User;

@Repository
@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Integer> {
	Page<User> findById(@Param("id") Integer id,Pageable Pageable);
	
//	Page<User> findByRoleId(@Param("roles") String string,Pageable Pageable);

}
