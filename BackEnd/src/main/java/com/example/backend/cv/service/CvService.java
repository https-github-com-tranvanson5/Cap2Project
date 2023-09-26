package com.example.backend.cv.service;

import com.example.backend.cv.payload.request.CurriculumVitaeCreateForm;
import org.springframework.http.ResponseEntity;

public interface CvService {
    ResponseEntity<?> getCV();

    ResponseEntity<?> createCvByUser(CurriculumVitaeCreateForm curriculumVitaeCreateForm);

    ResponseEntity<?> updateCvByUser(CurriculumVitaeCreateForm curriculumVitaeCreateForm, Long id);

    ResponseEntity<?> getAllCvByUser();

    ResponseEntity<?> getCvbyIdbyUser(Long id);

    ResponseEntity<?> deleteCvbyIdbyUser(Long id);

    ResponseEntity<?> getCvbyIdByAdmin(Long id);
}
