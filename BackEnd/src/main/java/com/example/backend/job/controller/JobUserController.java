package com.example.backend.job.controller;

import com.example.backend.job.service.job.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/job")
@CrossOrigin(origins = "*")
public class JobUserController {
    @Autowired
    private JobService jobService;
    @GetMapping("/getAllJobUser")
    public ResponseEntity<?> getAllDataListJob(){
        return jobService.getAllJobUser();
    }
}
