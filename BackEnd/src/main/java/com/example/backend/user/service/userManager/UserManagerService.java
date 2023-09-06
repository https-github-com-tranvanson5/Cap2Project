package com.example.backend.user.service.userManager;

import com.example.backend.user.payload.request.UserRolePmForm;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;

public interface UserManagerService {
    ResponseEntity<?> getDataListUser();

    ResponseEntity<?> createUserRolePm(UserRolePmForm userRolePmForm);

    ResponseEntity<?> getDataListUserByStatus(String status);
}
