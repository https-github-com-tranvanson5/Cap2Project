package com.example.backend.user.payload.request;

import com.example.backend.user.contains.EGender;
import com.example.backend.user.contains.UserStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
public class UserRolePmForm {
    private String name;

    private String dob;
    private String gender;
    private String idCard;
    private String phone;
    private String address;
    private String avatar;
    private String email;
    private String username;
    private String password;
    private String status;
}
