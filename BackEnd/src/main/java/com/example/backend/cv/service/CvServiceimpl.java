package com.example.backend.cv.service;

import com.example.backend.cv.model.CurriculumVitae;
import com.example.backend.cv.reponsitory.CvRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CvServiceimpl implements CvService{
    @Autowired
    private CvRepository cvRepository;
    @Override
    public ResponseEntity<?> getCV() {
        List<CurriculumVitae> curriculumVitaes = cvRepository.findAll();
        return new ResponseEntity<>(curriculumVitaes, HttpStatus.OK);
    }
}
