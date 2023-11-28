package com.example.backend.cv.service.user.cv;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.cv.constain.CvStatus;
import com.example.backend.cv.model.*;
import com.example.backend.cv.payload.request.CreateCvForm;
import com.example.backend.cv.repository.*;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CvUserServiceImp implements CvUserService{
    @Autowired
    private CvRepository cvRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ResponseEntity<?> createCv(CreateCvForm createCvForm) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(idUser);
            User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found"));

            if (createCvForm.getId() != null) {
                createCvForm.setId(null);
            }

            Cv cv = new Cv();
            cv.setContent(createCvForm.getContent());
            cv.setCreateAt(LocalDateTime.now());
            cv.setStatus(CvStatus.ACTIVE);
            cv.setUser(user);
            cvRepository.save(cv);

            return new ResponseEntity<>("Create cv thành công", HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it as needed
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred while creating cv", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateCv(CreateCvForm createCvForm) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(idUser);
            User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found"));

            if (createCvForm.getId() == null) {
                throw new RuntimeException("Id cv không hợp lệ");
            }

            Optional<Cv> optionalCv = cvRepository.findByIdAndUser(createCvForm.getId(), user);

            if (optionalCv.isEmpty()) {
                throw new RuntimeException("CV không tồn tại");
            }

            Cv cv = optionalCv.get();
            cv.setContent(createCvForm.getContent());
            cvRepository.save(cv);

            return new ResponseEntity<>("CV được cập nhật thành công", HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it as needed
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred while updating cv", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> getAllCv(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
        Optional<User> optionalUser = userRepository.findById(idUser);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found")); // Handle the case when user is not found
        Page<Cv> cvPage = cvRepository.findByUserAndStatus(user, CvStatus.ACTIVE, pageable);
        return new ResponseEntity<>(cvPage, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getCvById(String id, Pageable pageable) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(idUser);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                Optional<Cv> optionalCv = cvRepository.findByIdAndUserAndStatus(id, user, CvStatus.ACTIVE);

                if (optionalCv.isPresent()) {
                    return new ResponseEntity<>(optionalCv.get(), HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Cv not found", HttpStatus.NOT_FOUND);
                }
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log the exception or handle it as needed
            e.printStackTrace();
            return new ResponseEntity<>("An error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<?> deleteCvById(String id, Pageable pageable) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(idUser);
            User user = optionalUser.orElseThrow(() -> new RuntimeException("User not found")); // Handle the case when user is not found
            Optional<Cv> optionalCv = cvRepository.findByIdAndUserAndStatus(id, user, CvStatus.ACTIVE);

            if (optionalCv.isPresent()) {
                Cv cv = optionalCv.get();
                cv.setStatus(CvStatus.DELETE);
                cvRepository.save(cv); // Save the updated Cv entity
                return new ResponseEntity<>("Đã xóa thành công", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Cv not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log the exception or handle it as needed
            e.printStackTrace();
            return new ResponseEntity<>("Lỗi", HttpStatus.BAD_REQUEST);
        }
    }



}
