package com.example.backend.cv.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Active {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
<<<<<<< Updated upstream
    private String position;
    private String organization;
    @Column(columnDefinition = "longtext")
    private String description;
    private String start;
    private String end;
=======
    private String title;
    @Column(columnDefinition = "longtext")
    private String name;
    private String position;
    private String start;
    private String end;
    @Column(columnDefinition = "longtext")
    private String description;
>>>>>>> Stashed changes
}
