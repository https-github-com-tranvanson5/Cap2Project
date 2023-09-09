package com.example.backend.cv.model;

import com.example.backend.cv.contains.CvStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class CurriculumVitae {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //thông tin profile
    private String name;
    private String phone;
    private String linkWebsite;
    @Column(columnDefinition = "longtext")
    private String address;
    @Column(columnDefinition = "longtext")
    private String image;

    //Mục tiêu định hướng
    @Column(columnDefinition = "longtext")
    private String objective;

    //vị trí ứng tuyển
    private String position;

    // kĩ năng
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_skill",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private Set<Skill> skills= new HashSet<>();

    //Chứng chỉ
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_certification",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "certification_id")
    )
    private Set<Certification> certifications= new HashSet<>();


    // Kinh nghiệm
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_experience",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "experience_id")
    )
    private Set<WorkExperience> workExperiences= new HashSet<>();
    // hoạt động
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_active",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "active_id")
    )
    private Set<Active> actives= new HashSet<>();
    // trình độ
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_education",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "education_id")
    )
    private Set<Educatuion> educatuions= new HashSet<>();
    // dự án
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_project",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private Set<Project> projects= new HashSet<>();

    //Người tham chiếu
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_reference",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "reference_id")
    )
    private Set<Reference> references= new HashSet<>();

    private LocalDateTime createAt;
    @Enumerated(EnumType.STRING)
    private CvStatus status;
}
