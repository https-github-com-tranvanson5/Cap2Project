package com.example.backend.user.model;


import com.example.backend.authen.model.Role;
import com.example.backend.user.contains.UserStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
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

    private LocalDateTime createAt;
    @Enumerated(EnumType.STRING)
    private UserStatus status;

    public User() {
        this.id = "user-" + UUID.randomUUID().toString();
    }
}
