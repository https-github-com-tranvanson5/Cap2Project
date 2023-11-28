package com.example.backend.cv.payload.request;

import com.example.backend.cv.model.*;
import com.example.backend.user.model.User;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
@Data
public class CreateCvForm {
    private String id;
    private String content;
}
