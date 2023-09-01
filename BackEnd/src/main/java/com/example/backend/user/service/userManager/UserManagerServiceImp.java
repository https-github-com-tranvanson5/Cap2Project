package com.example.backend.user.service.userManager;


import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserManagerServiceImp implements UserManagerService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public ResponseEntity<?> getDataListUser() {
        List<User> users= userRepository.findAll();
        if(users.isEmpty()){
            return new ResponseEntity<>("No content", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
}
