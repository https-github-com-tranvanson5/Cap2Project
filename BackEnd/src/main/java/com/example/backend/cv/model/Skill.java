package com.example.backend.cv.model;

import lombok.Data;

<<<<<<< Updated upstream
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
=======
import javax.persistence.*;
>>>>>>> Stashed changes

@Data
@Entity
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
<<<<<<< Updated upstream
    private String name;
    private String description;
    private int level;
=======
    private String title;
    private String name;
    @Column(columnDefinition = "longtext")
    private String description;
>>>>>>> Stashed changes
}
