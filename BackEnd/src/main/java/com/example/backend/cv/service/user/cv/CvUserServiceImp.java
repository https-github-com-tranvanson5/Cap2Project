package com.example.backend.cv.service.user.cv;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.cv.constain.CvStatus;
import com.example.backend.cv.model.*;
import com.example.backend.cv.payload.request.CreateCvForm;
import com.example.backend.cv.repository.*;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CvUserServiceImp implements CvUserService{
    @Autowired
    private CvRepository cvRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired

    @Override
    @Transactional
    public ResponseEntity<?> createCv(CreateCvForm createCvForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
        Optional<User> optionalUser = userRepository.findById(idUser);
        User user = optionalUser.get();
        if (createCvForm.getId() != null) {
            createCvForm.setId(null);
        }
        Cv cv= new Cv();
        cv.setCreateAt(LocalDateTime.now());
        cv.setStatus(CvStatus.ACTIVE);
        cv.setUser(user);
        cvRepository.save(cv);
        return new ResponseEntity<>("create cv thành công", HttpStatus.OK);
    }


    @Override
    public ResponseEntity < ? > updateCv(CreateCvForm createCvForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
        Optional < User > optionalUser = userRepository.findById(idUser);
        User user = optionalUser.get();
        if (createCvForm.getId() == null) {
            throw new RuntimeException("Id cv không hợp lệ");
        }
        Optional < Cv > optionalCv = cvRepository.findByIdAndUser(createCvForm.getId(), user);
        if (optionalCv.isEmpty()) {
            throw new RuntimeException("CV không tồn tại");
        }
        Cv cv = optionalCv.get();
        cv.setUser(user);
        cvRepository.save(cv);
        return new ResponseEntity < > (cv, HttpStatus.OK);
    }
}
