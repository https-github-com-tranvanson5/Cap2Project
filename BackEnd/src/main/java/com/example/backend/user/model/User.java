package com.example.backend.user.model;


import com.example.backend.authen.model.Role;
import com.example.backend.cv.model.CurriculumVitae;
import com.example.backend.job.model.Job;
import com.example.backend.user.contains.EGender;
import com.example.backend.user.contains.UserStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2", parameters = {
            @Parameter(name = "variant", value = "timeBased")
    })
    private String id;
    private String name;

    private LocalDate dob;
    @Enumerated(EnumType.STRING)
    private EGender gender;
    private String idCard;
    private String phone;
    @Column(columnDefinition = "longtext")
    private String address;
    @Column(columnDefinition = "longtext")
    private String avatar;



    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    @JsonIgnore
    private String password;
    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private Set<Job> jobs= new HashSet<>();

//    @OneToMany(mappedBy = "user")
//    @JsonBackReference
//    private Set<CurriculumVitae> curriculumVitaes= new HashSet<>();

    private LocalDateTime createAt;
    @Enumerated(EnumType.STRING)
    private UserStatus status;
}
