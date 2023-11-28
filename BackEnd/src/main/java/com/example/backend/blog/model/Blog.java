package com.example.backend.blog.model;

import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.job.model.Job;
import com.example.backend.user.model.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
public class Blog {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2", parameters = {
            @Parameter(name = "variant", value = "timeBased")
    })
    private String id;
    @Column(columnDefinition = "longtext")
    private String title;
    @Column(columnDefinition = "longtext")
    private String content;
    private String author;
    @Column(columnDefinition = "longtext")
    private String imageUrl;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private BlogStatus status;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<Comment> comments;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",referencedColumnName = "id", nullable=false)
    @JsonManagedReference
    @JsonIdentityReference(alwaysAsId = true)
    private User user;
}
