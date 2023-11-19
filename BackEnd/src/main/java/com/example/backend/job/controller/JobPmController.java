package com.example.backend.job.controller;

<<<<<<< Updated upstream
import com.example.backend.job.payload.request.CreateJobForm;
import com.example.backend.job.service.job.JobService;
import org.springframework.beans.factory.annotation.Autowired;
=======
import com.example.backend.job.constain.*;
import com.example.backend.job.payload.request.JobForm;
import com.example.backend.job.service.pm.JobPmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
>>>>>>> Stashed changes
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/pm/job")
@CrossOrigin(origins = "*")
public class JobPmController {
    @Autowired
<<<<<<< Updated upstream
    private JobService jobService;
    @GetMapping("getJob")
    public ResponseEntity<?> getAllDataListJobPm(){
        return jobService.getAllDataListJobPm();
    }
    @PostMapping("createJob")
    public ResponseEntity<?> createJob(@Valid @RequestBody CreateJobForm createJobForm){
        return jobService.createJob(createJobForm);
=======
    private JobPmService jobPmService;
    @GetMapping("/getDataJob")
    public ResponseEntity<?> getDataJob(@RequestParam(required = false) String search,
                                        @RequestParam(required = false) String searchAddress,
                                        @RequestParam(required = false) JobEducation jobEducation,
                                        @RequestParam(required = false) JobExperience jobExperience,
                                        @RequestParam(required = false) JobPosition jobPosition,
                                        @RequestParam(required = false) JobType jobType,
                                        @RequestParam(required = false) JobStatus status,
                                        @RequestParam(required = false) Integer career,
                                        @RequestParam(required = false) Integer salary,
                                        @PageableDefault Pageable pageable){
        return jobPmService.getDataJob(search,searchAddress,jobEducation, jobExperience ,jobPosition, jobType,status ,career,salary,pageable);
    }
    @PostMapping("/createJob")
    public ResponseEntity<?> createJob(@RequestBody JobForm jobForm){
        return  jobPmService.createJob(jobForm);
    }
    @PutMapping("/updateJob")
    public ResponseEntity<?> updateJob(@Valid @RequestBody JobForm jobForm) {
        return jobPmService.updateJob(jobForm);
    }
    @PutMapping("/changeStatusJob")
    public ResponseEntity<?> changeStatusJob(@RequestParam String id, @RequestParam JobStatus jobStatus) {
        return jobPmService.changeStatusJob(id,jobStatus);
    }
    @GetMapping("/getDataJobById")
    public ResponseEntity<?> getDataJobById(@RequestParam String id){
        return jobPmService.getDataJobById(id);
    }
    @GetMapping("/getCareerJob")
    public ResponseEntity<?> getCareerJob(){
        return jobPmService.getCareerJob();
    }
    // thống kê
    @GetMapping("/getqualityJob")
    public ResponseEntity<?> getqualityJob() {
        return jobPmService.getqualityJob();
    }
    @GetMapping("/getqualityJobDontDelete")
    public ResponseEntity<?> getqualityJobNoDelete() {
        return jobPmService.getqualityJobNoDelete();
    }
    @GetMapping("/getqualityJobByStatus")
    public ResponseEntity<?> getqualityJobByStatus(@RequestParam JobStatus status) {
        return jobPmService.getqualityJobByStatus(status);
>>>>>>> Stashed changes
    }
}
