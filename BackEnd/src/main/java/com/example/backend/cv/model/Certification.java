package com.example.backend.cv.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
<<<<<<< Updated upstream
public class Certification{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String start;
    private String end;
    @Column(columnDefinition = "longtext")
    private String description;
=======
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String time;
    @Column(columnDefinition = "longtext")
    private String name;
    @Column(columnDefinition = "longtext")
    private String descripton;
>>>>>>> Stashed changes
}
