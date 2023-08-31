package com.example.demo.authen.repository;

import com.example.demo.authen.contains.RoleName;
import com.example.demo.authen.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleReposetory extends JpaRepository<Role,String> {
    Optional<Role> findByName(RoleName roleName);
}
