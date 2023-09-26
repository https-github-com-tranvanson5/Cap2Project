package com.example.backend.cv.controller;

import com.example.backend.cv.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/CurriculumVitae")
@CrossOrigin(origins = "*")
public class AdminCvController {
    @Autowired
    private CvService cvService;

    @GetMapping("/getCv")
    public ResponseEntity<?> getAllCvByAdmin() {
        return cvService.getCV();
    }
    @GetMapping("getCvbyId")
    public ResponseEntity<?> getCvbyIdByAdmin(@RequestParam Long id) {
        return cvService.getCvbyIdByAdmin(id);
    }
}
