package com.example.backend.cv.payload.request;

import com.example.backend.cv.model.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
public class CurriculumVitaeCreateForm {
    private String name;
    private LocalDate dob;
    private String phone;
    private String email;
    private String linkWebsite;
    private String address;
    private String image;

    //Mục tiêu định hướng
    private String objective;

    //vị trí ứng tuyển
    private String position;
//
    //     kĩ năng
    private List<Skill> skills;
//
    //Chứng chỉ
    private List<Certification> certifications;
//
    private List<WorkExperience> workExperiences;
    // hoạt động
    private List<Active> actives;
    // trình độ
    private List<Education> educatuions;
    // dự án
    private List<Project> projects;
//
    //Người tham chiếu
    private List<Reference> references;
}
