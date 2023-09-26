package com.example.backend.job.repository;

import com.example.backend.job.contains.JobStatus;
import com.example.backend.job.model.Job;
import com.example.backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {
    Boolean existsByStatus(JobStatus status);
    List<Job> findByStatus(JobStatus status);
    List<Job> findAllByUser(User user);
}