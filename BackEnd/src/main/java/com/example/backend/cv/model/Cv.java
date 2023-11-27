package com.example.backend.cv.model;

import com.example.backend.cv.constain.CvStatus;
import com.example.backend.user.model.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Long.class)
public class Cv {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2", parameters = {
            @Parameter(name = "variant", value = "timeBased")
    })
    private String id;
    @Column(columnDefinition = "longtext")
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",referencedColumnName = "id", nullable=false)
    @JsonManagedReference
    @JsonIdentityReference(alwaysAsId = true)
    private User user;
    private LocalDateTime createAt;
    @Enumerated(EnumType.STRING)
    private CvStatus status;
}
