package com.example.backend.job.payload.request;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CreateJobForm {
    @NotNull(message = "Name is not null")
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 250, message = "Name must be between 2 and 250 characters")
    private String title;
    @NotNull(message = "Name is not null")
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 250, message = "Name must be between 2 and 250 characters")
    private String position;
    @NotNull(message = "Name is not null")
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 250, message = "Name must be between 2 and 250 characters")
    private String nameCompany;
    @NotNull(message = "Address is not null")
    @NotBlank(message = "Address is required")
    private String address;
    private String salary;
    private int quantity;
    @Column(columnDefinition = "longtext")
    @NotNull(message = "Description is not null")
    @NotBlank(message = "Description is required")
    private String description;
    @Column(columnDefinition = "longtext")
    @NotNull(message = "Welfare is not null")
    @NotBlank(message = "Welfare is required")
    private String welfare;
    @Column(columnDefinition = "longtext")
    @NotNull(message = "Requirements is not null")
    @NotBlank(message = "Requirements is required")
    private String requirements; // Renamed from "require"
    @Column(columnDefinition = "longtext")
    @NotNull(message = "Information is not null")
    @NotBlank(message = "Information is required")
    private String info;
    @Column(columnDefinition = "longtext")
    private String image;
    private String status;
    @NotNull(message = "Category is not null")
    private long categoryId;
}
