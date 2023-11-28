package com.example.backend.cv.controller;

import com.example.backend.cv.payload.request.CreateCvForm;
import com.example.backend.cv.service.user.cv.CvUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/cv")
@CrossOrigin(origins = "*")
public class CvUserController {
    @Autowired
    private CvUserService cvUserService;
    @PostMapping("/createCv")
    public ResponseEntity<?> createCv(@RequestBody CreateCvForm createCvForm){
        return cvUserService.createCv(createCvForm);
    }
    @PutMapping("/updateCv")
    public ResponseEntity<?> updateCv(@RequestBody CreateCvForm createCvForm){
        return cvUserService.updateCv(createCvForm);
    }
    @GetMapping("/getAllCv")
    public ResponseEntity<?> getAllCv(@PageableDefault Pageable pageable){
        return cvUserService.getAllCv(pageable);
    }
    @GetMapping("/getById")
    public ResponseEntity<?> getCvById(@RequestParam String id,@PageableDefault Pageable pageable){
        return cvUserService.getCvById(id,pageable);
    }
    @DeleteMapping("/deleteCvById")
    public ResponseEntity<?> deleteCvById(@RequestParam String id,@PageableDefault Pageable pageable){
        return cvUserService.deleteCvById(id,pageable);
    }
}
