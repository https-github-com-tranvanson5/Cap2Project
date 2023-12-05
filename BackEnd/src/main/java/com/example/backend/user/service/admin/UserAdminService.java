package com.example.backend.user.service.admin;

import com.example.backend.user.constain.UserStatus;
import com.example.backend.user.payload.request.UserFormCreate;
import com.example.backend.user.payload.request.UserFormUpdate;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


public interface UserAdminService {


    ResponseEntity<?> getDataUser(String search, Pageable pageable,String column, String sort);

    ResponseEntity<?> countUser(UserStatus status);

    ResponseEntity<?> countUserMonth(int year, UserStatus status);


    ResponseEntity<?> countUserByYear();

    ResponseEntity<?> getUserById(String id);

    ResponseEntity<?> createNewUser(UserFormCreate userFormAdmin);

    ResponseEntity<?> updateUser(UserFormUpdate userFormUpdate);

    ResponseEntity<?> changeStatus(String id, UserStatus status);

    ResponseEntity<?> getMinMaxYear();
}
