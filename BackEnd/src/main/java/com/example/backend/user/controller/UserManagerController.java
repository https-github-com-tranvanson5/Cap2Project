package com.example.backend.user.controller;

import com.example.backend.user.payload.request.UserRolePmForm;
import com.example.backend.user.service.userManager.UserManagerService;
import org.apache.logging.log4j.message.StringFormattedMessage;
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
    @PostMapping("/createUserRolePm")
    public ResponseEntity<?> createUserRolePm(@Valid @RequestBody UserRolePmForm userRolePmForm) {
        return userManagerService.createUserRolePm(userRolePmForm);
    }
    @GetMapping("/getDataListUserByStatus")
    public ResponseEntity<?> getDataListUserByStatus(@RequestParam String status) {
        return userManagerService.getDataListUserByStatus(status);
    }
}
