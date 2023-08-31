package com.example.demo.authen.service.Role;


import com.example.demo.authen.contains.RoleName;
import com.example.demo.authen.model.Role;
import com.example.demo.authen.repository.RoleReposetory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImp implements RoleService{
    @Autowired
    private RoleReposetory roleReposetory;
    @Override
    public Optional<Role> findByName(RoleName roleName) {
        return roleReposetory.findByName(roleName);
    }
}
