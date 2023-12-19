package com.example.backend.blog.model;

import com.example.backend.blog.constain.CommentStatus;
import com.example.backend.user.model.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Long.class)
public class Comment {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2", parameters = {
            @Parameter(name = "variant", value = "timeBased")
    })
    private String id;

    @Column(columnDefinition = "text")
    private String comment;

    private LocalDateTime createAt;

    @Column(nullable = false)
    private String userId;

    @Enumerated(EnumType.STRING)
    @Nullable
    private CommentStatus status;

    @Column(nullable = false)
    private Boolean repcomment;

    private String commentId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "blog_id",referencedColumnName = "id", nullable=false)
    @JsonManagedReference
    @JsonIdentityReference(alwaysAsId = true)
    private Blog blog;
}
