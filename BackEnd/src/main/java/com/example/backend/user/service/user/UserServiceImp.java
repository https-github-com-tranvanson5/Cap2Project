package com.example.backend.user.service.user;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.messageResponse.MessageResponse;
import com.example.backend.user.contains.EGender;
import com.example.backend.user.model.User;
import com.example.backend.user.payload.request.ChangePasswordForm;
import com.example.backend.user.payload.request.ProfileForm;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> getProfileUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userRepository.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> changePassword(ChangePasswordForm changePasswordForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userRepository.getUserById(id);
        if(passwordEncoder.matches(changePasswordForm.getPassword(),user.getPassword())){
            if(passwordEncoder.matches(changePasswordForm.getNewPassword(),user.getPassword())){
                MessageResponse response = new MessageResponse();
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setTitle(HttpStatus.BAD_REQUEST.name());
                response.setMessage("Mật khẩu mới không được trùng với mật khẩu cũ");
                return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
            }
            user.setPassword(passwordEncoder.encode(changePasswordForm.getNewPassword()));
            userRepository.save(user);
            MessageResponse response = new MessageResponse();
            response.setCode(HttpStatus.OK.value());
            response.setTitle(HttpStatus.OK.name());
            response.setMessage("Đổi mật khẩu thành công");
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        MessageResponse response = new MessageResponse();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setTitle(HttpStatus.BAD_REQUEST.name());
        response.setMessage("Mật khẩu không khớp");
        return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<?> updateProfile(ProfileForm profileForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userRepository.getUserById(id);
        user.setName(profileForm.getName());
        user.setDob(profileForm.getDob());
        switch (profileForm.getGender()){
            case "MALE": user.setGender(EGender.MALE); break;
            case "FEMALE": user.setGender(EGender.FEMALE); break;
            case "OTHER": user.setGender(EGender.OTHER); break;
            default: break;
        }
        user.setIdCard(profileForm.getIdCard());
        user.setPhone(profileForm.getPhone());
        user.setAddress(profileForm.getAddress());
        user.setAvatar(profileForm.getAvatar());
        userRepository.save(user);

        MessageResponse response = new MessageResponse();
        response.setCode(HttpStatus.OK.value());
        response.setTitle(HttpStatus.OK.name());
        response.setMessage("Thông đổi thông tin thành công");
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
