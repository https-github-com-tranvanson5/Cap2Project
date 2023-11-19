package com.example.backend.job.controller;

<<<<<<< Updated upstream
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
=======
import com.example.backend.job.constain.JobEducation;
import com.example.backend.job.constain.JobExperience;
import com.example.backend.job.constain.JobPosition;
import com.example.backend.job.constain.JobType;
import com.example.backend.job.service.user.JobUserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;

@RestController
@RequestMapping("/api/user/job")
@CrossOrigin(origins = "*")
public class JobUserController {
    @Autowired
    private JobUserSerivce jobUserSerivce;
    @GetMapping("/getAllDataListJobBySearch")
    public ResponseEntity<?> getAllDataListJobBySearch(@RequestParam(required = false) String search,
                                                       @RequestParam(required = false) String searchAddress,
                                                       @RequestParam(required = false) JobEducation jobEducation,
                                                       @RequestParam(required = false) JobExperience jobExperience,
                                                       @RequestParam(required = false) JobPosition jobPosition,
                                                       @RequestParam(required = false) JobType jobType,
                                                       @RequestParam(required = false) Integer salary,
                                                       @RequestParam(required = false) Integer career,
                                                       @PageableDefault Pageable pageable){
        return jobUserSerivce.getAllDataListJob( search, searchAddress,
                jobEducation,
                jobExperience,
                jobPosition,
                jobType,
                salary,
                career,
                pageable);
    }
    @GetMapping("/getJobById")
    public ResponseEntity<?> getJobById(@RequestParam String id){
        return jobUserSerivce.getJobById(id);
>>>>>>> Stashed changes
    }
}
