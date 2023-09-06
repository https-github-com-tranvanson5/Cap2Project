package com.example.backend.user.service.userManager;

import com.example.backend.user.payload.request.CreateUserForm;
import org.springframework.http.ResponseEntity;

public interface UserManagerService {
    ResponseEntity<?> getDataListUser();

    ResponseEntity<?> createUser(CreateUserForm userRolePmForm);

    ResponseEntity<?> getDataListUserByStatus(String status);

    ResponseEntity<?> getDataUserById(String id);
}
