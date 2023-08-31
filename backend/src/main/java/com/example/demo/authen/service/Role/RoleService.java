package com.example.demo.authen.service.Role;



import com.example.demo.authen.contains.RoleName;
import com.example.demo.authen.model.Role;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(RoleName roleName);
}
