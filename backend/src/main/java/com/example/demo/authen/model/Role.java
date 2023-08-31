package com.example.demo.authen.model;


import com.example.demo.authen.contains.RoleName;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;


@Data
@Entity
public class Role {
    @Id
    private String id;
    @Enumerated(EnumType.STRING)
    private RoleName name;
}
