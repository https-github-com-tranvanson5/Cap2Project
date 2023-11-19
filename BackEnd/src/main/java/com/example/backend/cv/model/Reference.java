package com.example.backend.cv.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Reference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
<<<<<<< Updated upstream
    @Column(columnDefinition = "longtext")
    private String info;
=======
    private String title;
    @Column(columnDefinition = "longtext")
    private String description;
>>>>>>> Stashed changes
}
