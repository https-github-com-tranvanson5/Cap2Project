package com.example.backend.cv.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
<<<<<<< Updated upstream
    private String name;
    private String nameCustomer;
    private int sizeTeam;
    private String position;
    private String responsibility;
    @Column(columnDefinition = "longtext")
    private String technology_Description;
    private String start;
    private String end;
=======
    private String title;
    @Column(columnDefinition = "longtext")
    private String name;
    private String start;
    private String end;
    @Column(columnDefinition = "longtext")
    private String customer;
    private String size;
    private String position;
    @Column(columnDefinition = "longtext")
    private String responsibility;
    @Column(columnDefinition = "longtext")
    private String technology;
>>>>>>> Stashed changes
}
