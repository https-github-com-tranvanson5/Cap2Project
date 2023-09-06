package com.example.backend.user.controller;

import com.example.backend.user.payload.request.CreateUserForm;
import com.example.backend.user.service.userManager.UserManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/userManager")
@CrossOrigin(origins = "*")
public class UserManagerController {
    @Autowired
    private UserManagerService userManagerService;
    @GetMapping("/getDataListUser")
    public ResponseEntity<?> getDataListUser() {
        return userManagerService.getDataListUser();
    }
    @PostMapping("/createUser")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserForm userRolePmForm) {
        return userManagerService.createUser(userRolePmForm);
    }
    @GetMapping("/getDataListUserByStatus")
    public ResponseEntity<?> getDataListUserByStatus(@RequestParam String status) {
        return userManagerService.getDataListUserByStatus(status);
    }
    @GetMapping("/getDataUserById")
    public ResponseEntity<?> getDataUserById(@RequestParam String id) {
        return userManagerService.getDataUserById(id);
    }
}
