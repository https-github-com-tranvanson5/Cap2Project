package com.example.backend.blog.model;


import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.job.model.Job;
import com.example.backend.user.model.User;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Long.class)
public class Blog {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2", parameters = {
            @Parameter(name = "variant", value = "timeBased")
    })
    private String id;
    @Column(columnDefinition = "longtext")
    private String content;
    private LocalDateTime createdAt;
    @Enumerated(EnumType.STRING)
    private BlogStatus status;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",referencedColumnName = "id", nullable=false)
    @JsonManagedReference
    @JsonIdentityReference(alwaysAsId = true)
    private User user;

    @ManyToMany
    @JoinTable(
            name = "blog_image",
            joinColumns = @JoinColumn(name = "blog_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private Set<Image> images= new HashSet<>();

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<Comment> comments= new HashSet<>();
}
