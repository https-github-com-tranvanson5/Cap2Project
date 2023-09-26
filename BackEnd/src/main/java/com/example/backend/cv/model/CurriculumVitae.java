package com.example.backend.cv.model;

import com.example.backend.cv.contains.CvStatus;
import com.example.backend.user.model.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class CurriculumVitae {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    //thông tin profile
    private String name;
    private LocalDate dob;
    private String phone;
    private String email;
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

//     kĩ năng
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_skill",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    private List<Skill> skills;

    //Chứng chỉ
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_certification",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "certification_id")
    )
    private List<Certification> certifications;


    // Kinh nghiệm
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_experience",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "experience_id")
    )
    private List<WorkExperience> workExperiences;
    // hoạt động
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_active",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "active_id")
    )
    private List<Active> actives;
    // trình độ
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_education",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "education_id")
    )
    private List<Education> educations;
    // dự án
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_project",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<Project> projects;

    //Người tham chiếu
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "cv_reference",
            joinColumns = @JoinColumn(name = "cv_id"),
            inverseJoinColumns = @JoinColumn(name = "reference_id")
    )
    private List<Reference> references;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private User user;

    private LocalDateTime createAt;
    @Enumerated(EnumType.STRING)
    private CvStatus status;
}
