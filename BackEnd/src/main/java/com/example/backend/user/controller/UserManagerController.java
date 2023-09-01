package com.example.backend.user.controller;

import com.example.backend.user.service.userManager.UserManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
