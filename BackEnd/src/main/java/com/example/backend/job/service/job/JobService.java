package com.example.backend.job.service.job;

import com.example.backend.job.payload.request.CreateJobForm;
import org.springframework.http.ResponseEntity;

public interface JobService {
    ResponseEntity<?> getAllDataListJob();

    ResponseEntity<?> createJob(CreateJobForm createJobForm);

    ResponseEntity<?> updateJob(CreateJobForm createJobForm, long id);

    ResponseEntity<?> changStatusJob(long id, String status);

    ResponseEntity<?> getDataJobById(long id);

    ResponseEntity<?> getDataJobByStatus(String status);

    ResponseEntity<?> getAllJobUser();
}
