package com.example.backend.user.controller;

import com.example.backend.user.payload.request.ChangePasswordForm;
import com.example.backend.user.payload.request.ProfileForm;
import com.example.backend.user.service.user.UserService;
import com.example.backend.user.service.user.UserServiceImp;
import com.example.backend.user.service.userManager.UserManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/getProfileUser")
    public ResponseEntity<?> getProfileUser() {
        return userService.getProfileUser();
    }
    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody @Valid ChangePasswordForm changePasswordForm) {
        return userService.changePassword(changePasswordForm);
    }
    @PutMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody @Valid ProfileForm profileForm) {
        return userService.updateProfile(profileForm);
    }
}
