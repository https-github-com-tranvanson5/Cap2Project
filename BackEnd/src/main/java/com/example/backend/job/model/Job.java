package com.example.backend.job.model;

import com.example.backend.job.contains.JobStatus;
import com.example.backend.user.model.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity

public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    private String position;
    private String nameCompany;
    private String address;
    private String salary;
    private int quantity;
    @Column(columnDefinition = "longtext")
    private String description;
    @Column(columnDefinition = "longtext")
    private String welfare;
    @Column(columnDefinition = "longtext")
    private String requirements; // Renamed from "require"
    @Column(columnDefinition = "longtext")
    private String info;
    @Column(columnDefinition = "longtext")
    private String image;
    @Enumerated(EnumType.STRING)
    private JobStatus status;
    private LocalDateTime createdAt; // Renamed from "created_at"
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonManagedReference
    private Category category;

}
