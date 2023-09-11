package com.example.backend.cv.controller;

import com.example.backend.authen.payload.request.SignInForm;
import com.example.backend.authen.service.auth.AuthService;
import com.example.backend.cv.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/CurriculumVitae")
@CrossOrigin(origins = "*")
public class CvController {
    @Autowired
    private CvService cvService;

    @GetMapping("/getCv")
    public ResponseEntity<?> authenticateUser() {
        return cvService.getCV();
    }
}
