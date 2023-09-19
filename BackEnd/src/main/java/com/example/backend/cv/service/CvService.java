package com.example.backend.cv.service;

import com.example.backend.cv.payload.request.CurriculumVitaeCreateForm;
import org.springframework.http.ResponseEntity;

public interface CvService {
    ResponseEntity<?> getCV();

    ResponseEntity<?> createCvByUser(CurriculumVitaeCreateForm curriculumVitaeCreateForm);
}
