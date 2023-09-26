package com.example.backend.cv.controller;

import com.example.backend.cv.model.CurriculumVitae;
import com.example.backend.cv.payload.request.CurriculumVitaeCreateForm;
import com.example.backend.cv.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/user/CurriculumVitae")
@CrossOrigin(origins = "*")
public class UserCvController {
    @Autowired
    private CvService cvService;
    @GetMapping("/getAllCvByUser")
    public ResponseEntity<?> getAllCvByUser() {
        return cvService.getAllCvByUser();
    }
    @GetMapping("/getCvbyIdbyUser")
    public ResponseEntity<?> getCvbyIdbyUser(@RequestParam Long id) {

        return cvService.getCvbyIdbyUser(id);
    }
    @GetMapping("/deleteCvbyIdbyUser")
    public ResponseEntity<?> deleteCvbyIdbyUser(@RequestParam Long id) {
        return cvService.deleteCvbyIdbyUser(id);
    }
    @PutMapping("/updateCv")
    public ResponseEntity<?> updateCvByUser(@Valid @RequestBody CurriculumVitaeCreateForm curriculumVitaeCreateForm, @RequestParam Long id ){
        return cvService.updateCvByUser(curriculumVitaeCreateForm, id);
    }
    @PostMapping("/createCv")
    public ResponseEntity<?> createCvByUser(@Valid @RequestBody CurriculumVitaeCreateForm curriculumVitaeCreateForm) {
        return cvService.createCvByUser(curriculumVitaeCreateForm);
    }
}
