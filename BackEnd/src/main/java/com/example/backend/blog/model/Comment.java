package com.example.backend.blog.model;

import com.example.backend.blog.constain.CommentStatus;
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
public class Comment {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2", parameters = {
            @Parameter(name = "variant", value = "timeBased")
    })
    private String id;
    private String content;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private CommentStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "blog_id",referencedColumnName = "id", nullable=false)
    @JsonManagedReference
    @JsonIdentityReference(alwaysAsId = true)
    private Blog blog;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<Recomment> recomments;

    private String userId;
}
