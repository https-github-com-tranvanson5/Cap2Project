package com.example.backend.job.controller;

<<<<<<< Updated upstream
import com.example.backend.job.payload.request.CreateJobForm;
import com.example.backend.job.service.job.JobService;
import org.springframework.beans.factory.annotation.Autowired;
=======
import com.example.backend.job.constain.*;
import com.example.backend.job.model.Job;
import com.example.backend.job.payload.request.JobForm;
import com.example.backend.job.service.admin.JobAdminService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
>>>>>>> Stashed changes
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin/job")
@CrossOrigin(origins = "*")
public class JobAdminController {
    @Autowired
<<<<<<< Updated upstream
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
=======
    private JobAdminService jobAdminService;

//    @GetMapping("/getAllDataListJob")
//    public ResponseEntity<?> getAllDataListJob() {
//        return jobAdminService.getAllDataListJob();
//    }

    @GetMapping("/getAllDataJob")
    public ResponseEntity<?> getAllDataListJobBySearch(@RequestParam(required = false) String search,
                                                       @RequestParam(required = false) String searchAddress,
                                                       @RequestParam(required = false) JobEducation jobEducation,
                                                       @RequestParam(required = false) JobExperience jobExperience,
                                                       @RequestParam(required = false) JobPosition jobPosition,
                                                       @RequestParam(required = false) JobType jobType,
                                                       @RequestParam(required = false) Integer salary,
                                                       @RequestParam(required = false) Integer career,
                                                       @RequestParam(required = false) JobStatus status,
                                                       @RequestParam(required = false) String userId,
                                                       @PageableDefault Pageable pageable) {
        return jobAdminService.getDataJob(search, searchAddress, jobEducation, jobExperience, jobPosition, jobType, salary, career, status,userId, pageable);
    }
    @PostMapping("/createJob")
    public ResponseEntity<?> createJob(@Valid @RequestBody JobForm jobForm) {
        return jobAdminService.createJob(jobForm);
    }

    @PutMapping("/updateJob")
    public ResponseEntity<?> updateJob(@Valid @RequestBody JobForm jobForm) {
        return jobAdminService.updateJob(jobForm);
    }
    @PutMapping("/changeStatusJob")
    public ResponseEntity<?> changeStatusJob(@RequestParam String id, @RequestParam JobStatus jobStatus) {
        return jobAdminService.changeStatusJob(id,jobStatus);
    }
    @GetMapping("/jobGroupByUser")
    public ResponseEntity<?> jobGroupByUserBySort(@PageableDefault Pageable pageable,
                                                  @RequestParam(name = "sort",required = false) String sort){
        return jobAdminService.jobGroupByUserBySort(pageable,sort);
    }
    @GetMapping("/getCareerJob")
    public ResponseEntity<?> getCareerJob(){
        return jobAdminService.getCareerJob();
    }
    // thống kê
    @GetMapping("/jobGroupByUserMonth")
    public ResponseEntity<?> jobGroupByUserBySortMonth(@PageableDefault Pageable pageable,
                                                       @RequestParam(name = "sort",required = false) String sort,
                                                       @RequestParam(name = "year") int year){
        return jobAdminService.jobGroupByUserBySortMonth(pageable,sort,year);
    }
    @GetMapping("/getqualityJob")
    public ResponseEntity<?> getqualityJob() {
        return jobAdminService.getqualityJob();
    }
    @GetMapping("/getqualityJobDontDelete")
    public ResponseEntity<?> getqualityJobNoDelete() {
        return jobAdminService.getqualityJobNoDelete();
    }
    @GetMapping("/getqualityJobByStatus")
    public ResponseEntity<?> getqualityJobByStatus(@RequestParam JobStatus status) {
        return jobAdminService.getqualityJobByStatus(status);
    }
    // thống kê theo tháng
    @GetMapping("/getqualityJobByMonth")
    public ResponseEntity<?> getqualityJobByMoth(@RequestParam int year) {
        return jobAdminService.getqualityJobByMoth(year);
    }
    @GetMapping("/getqualityJobMothByStatus")
    public ResponseEntity<?> getqualityJobMothByStatus(@RequestParam JobStatus status, @RequestParam int year) {
        return jobAdminService.getqualityJobMothByStatus(status,year);
    }
    // thống kê theo NĂM
    @GetMapping("/getqualityJobByYear")
    public ResponseEntity<?> getqualityJobByYear() {
        return jobAdminService.getqualityJobByYear();
    }
    @GetMapping("/getqualityJobYearByStatus")
    public ResponseEntity<?> getqualityJobYearByStatus(@RequestParam JobStatus status) {
        return jobAdminService.getqualityJobYearByStatus(status);
    }

>>>>>>> Stashed changes
}
