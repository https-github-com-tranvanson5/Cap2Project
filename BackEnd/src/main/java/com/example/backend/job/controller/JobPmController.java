package com.example.backend.job.controller;

import com.example.backend.job.payload.request.CreateJobForm;
import com.example.backend.job.service.job.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/pm/job")
@CrossOrigin(origins = "*")
public class JobPmController {
    @Autowired
    private JobService jobService;
    @GetMapping("getJob")
    public ResponseEntity<?> getAllDataListJobPm(){
        return jobService.getAllDataListJobPm();
    }
    @PostMapping("createJob")
    public ResponseEntity<?> createJob(@Valid @RequestBody CreateJobForm createJobForm){
        return jobService.createJob(createJobForm);
    }
}
