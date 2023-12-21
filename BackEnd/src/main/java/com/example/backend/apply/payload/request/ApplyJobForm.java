package com.example.backend.apply.payload.request;
import lombok.Data;
@Data
public class ApplyJobForm {
    private Long id;
    private String title;
    private String message;
    private String name;
    private String phone;

    private String email;
    private String jobId;
    private String urlCv;
    private String cvId;
}
