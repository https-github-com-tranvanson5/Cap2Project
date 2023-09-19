package com.example.backend.cv.reponsitory;

import com.example.backend.cv.model.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkExperiencesRepository extends JpaRepository<WorkExperience, Long> {
}
