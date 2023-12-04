package com.example.backend.cv.service.user.cv;

import com.example.backend.cv.payload.request.CreateCvForm;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface CvUserService {
    ResponseEntity<?> createCv(CreateCvForm createCvForm);

    ResponseEntity<?> updateCv(CreateCvForm createCvForm);

    ResponseEntity<?> getAllCv(Pageable pageable);

    ResponseEntity<?> getCvById(String id,Pageable pageable);

    ResponseEntity<?> deleteCvById(String id, Pageable pageable);
}
