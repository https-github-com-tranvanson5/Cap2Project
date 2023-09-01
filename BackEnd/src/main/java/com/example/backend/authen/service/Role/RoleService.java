package com.example.backend.authen.service.Role;



import com.example.backend.authen.contains.RoleName;
import com.example.backend.authen.model.Role;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(RoleName roleName);
}
