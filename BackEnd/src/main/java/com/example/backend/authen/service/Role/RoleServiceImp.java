package com.example.backend.authen.service.Role;


import com.example.backend.authen.contains.RoleName;
import com.example.backend.authen.model.Role;
import com.example.backend.authen.repository.RoleReposetory;
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
