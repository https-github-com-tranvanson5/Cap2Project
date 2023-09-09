package com.example.backend.job.controller;

import com.example.backend.job.payload.request.CreateJobForm;
import com.example.backend.job.service.job.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin/job")
@CrossOrigin(origins = "*")
public class JobAdminController {
    @Autowired
    private JobService jobService;
    @GetMapping("/getAllDataListJob")
    public ResponseEntity<?> getAllDataListJob(){
        return jobService.getAllDataListJob();
    }
    @PostMapping("createJob")
    public ResponseEntity<?> createJob(@Valid @RequestBody CreateJobForm createJobForm){
        return jobService.createJob(createJobForm);
    }
    @PutMapping("updateJob")
    public ResponseEntity<?> updateJob(@Valid @RequestBody CreateJobForm createJobForm, @RequestParam long id){
        return jobService.updateJob(createJobForm, id);
    }
    @GetMapping("changStatusJob")
    public ResponseEntity<?> changStatusJob(@RequestParam long id, @RequestParam String status){
        return jobService.changStatusJob(id, status);
    }
    @GetMapping("getDataJobById")
    public ResponseEntity<?> getDataJobById(@RequestParam long id){
        return jobService.getDataJobById(id);
    }@GetMapping("getDataJobByStatus")
    public ResponseEntity<?> getDataJobByStatus(@RequestParam String status){
        return jobService.getDataJobByStatus(status);
    }
}
