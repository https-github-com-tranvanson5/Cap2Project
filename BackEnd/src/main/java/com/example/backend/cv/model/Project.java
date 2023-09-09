package com.example.backend.cv.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nameCustomer;
    private int sizeTeam;
    private String position;
    private String responsibility;
    @Column(columnDefinition = "longtext")
    private String technology_Description;
    private String start;
    private String end;
}
