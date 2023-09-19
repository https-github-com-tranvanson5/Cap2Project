package com.example.backend.cv.controller;

import com.example.backend.cv.model.CurriculumVitae;
import com.example.backend.cv.payload.request.CurriculumVitaeCreateForm;
import com.example.backend.cv.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/CurriculumVitae")
@CrossOrigin(origins = "*")
public class UserCvController {
    @Autowired
    private CvService cvService;
    @PostMapping("/createCv")
    public ResponseEntity<?> createCvByUser(@RequestBody CurriculumVitaeCreateForm curriculumVitaeCreateForm) {
        return cvService.createCvByUser(curriculumVitaeCreateForm);
    }
}
