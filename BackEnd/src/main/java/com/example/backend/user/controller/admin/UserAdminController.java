package com.example.backend.user.controller.admin;

import com.example.backend.authen.constain.RoleName;
import com.example.backend.user.constain.UserStatus;
import com.example.backend.user.payload.request.UserFormCreate;
import com.example.backend.user.payload.request.UserFormUpdate;
import com.example.backend.user.service.admin.UserAdminService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class UserAdminController {
    @Autowired
    private UserAdminService userAdminService;

    @GetMapping("/getDataUser")
    public ResponseEntity<?> getDataUser(
            @RequestParam(required = false) String search,
            @PageableDefault(5) Pageable pageable,
            @RequestParam(required = false) String column,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(required = false) RoleName role) {
        return userAdminService.getDataUser(search, pageable, column, sort, status, role);
    }

    @GetMapping("/getUserById")
    public ResponseEntity<?> getUserById(@RequestParam String id) {
        return userAdminService.getUserById(id);
    }

    @PostMapping("/createNewUser")
    public ResponseEntity<?> createNewUser(@RequestBody UserFormCreate userFormAdmin) {
        return userAdminService.createNewUser(userFormAdmin);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UserFormUpdate userFormUpdate) {
        return userAdminService.updateUser(userFormUpdate);
    }

    @GetMapping("/changeStatus")
    public ResponseEntity<?> changeStatus(@RequestParam String id, @RequestParam UserStatus status) {
        return userAdminService.changeStatus(id, status);
    }

    // THỐNG KÊ
    // @GetMapping("/countUser")
    // public ResponseEntity<?> countUser(){
    // return userAdminService.countUsser();
    // }
    @GetMapping("/countUserByMoth")
    public ResponseEntity<?> countUserMonth(@RequestParam("year") int year,
            @RequestParam(required = false) UserStatus status) {
        return userAdminService.countUserMonth(year, status);
    }

    @GetMapping("/countUserByYear")
    public ResponseEntity<?> countUserByYear(@RequestParam(required = false) UserStatus status) {
        return userAdminService.countUserByYear(status);
    }

    @GetMapping("/countUser")
    public ResponseEntity<?> countUser(@RequestParam(required = false) UserStatus status) {
        return userAdminService.countUser(status);
    }

    @GetMapping("/getMinMaxYear")
    public ResponseEntity<?> getMinMaxYear() {
        return userAdminService.getMinMaxYear();
    }

    @GetMapping("/countRole")
    public ResponseEntity<?> countUserRole(@RequestParam(required = false) Integer year,
            @RequestParam(required = false) UserStatus status) {
        return userAdminService.countUserRole(year, status);
    }
}
