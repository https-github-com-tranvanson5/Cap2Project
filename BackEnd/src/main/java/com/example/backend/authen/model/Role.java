package com.example.backend.authen.model;

<<<<<<< Updated upstream

import com.example.backend.authen.contains.RoleName;

=======
import com.example.backend.authen.constain.RoleName;
>>>>>>> Stashed changes
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
@Data
@Entity
public class Role {
    @Id
    private String id;
    @Enumerated(EnumType.STRING)
    private RoleName name;
}
