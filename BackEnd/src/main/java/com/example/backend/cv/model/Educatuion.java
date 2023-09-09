package com.example.backend.cv.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Educatuion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String course;
    private String school;
    @Column(columnDefinition = "longtext")
    private String description;
    private String start;
    private String end;
}
