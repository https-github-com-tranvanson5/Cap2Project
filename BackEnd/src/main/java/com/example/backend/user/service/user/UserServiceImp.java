package com.example.backend.user.service.user;

import com.example.backend.authen.service.userdetail.UserPrinciple;
<<<<<<< Updated upstream
import com.example.backend.messageResponse.MessageResponse;
import com.example.backend.user.contains.EGender;
import com.example.backend.user.model.User;
import com.example.backend.user.payload.request.ChangePasswordForm;
import com.example.backend.user.payload.request.ProfileForm;
import com.example.backend.user.repository.UserRepository;
=======
import com.example.backend.user.model.User;
import com.example.backend.user.payload.request.ChangePasswordForm;
import com.example.backend.user.payload.request.ProfileForm;
import com.example.backend.user.payload.request.UserFormCreate;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
>>>>>>> Stashed changes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

<<<<<<< Updated upstream
@Service
public class UserServiceImp implements UserService{

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

=======
import java.util.Optional;

@Service
public class UserServiceImp implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
>>>>>>> Stashed changes
    @Override
    public ResponseEntity<?> getProfileUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = ((UserPrinciple) authentication.getPrincipal()).getId();
<<<<<<< Updated upstream
        User user= userRepository.getUserById(id);
=======
        Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
        }
        User user = optionalUser.get();
>>>>>>> Stashed changes
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> changePassword(ChangePasswordForm changePasswordForm) {
<<<<<<< Updated upstream
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
=======
        // Get the authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrinciple principal = (UserPrinciple) authentication.getPrincipal();
        String id = principal.getId();

        // Find the user in the database
        Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.badRequest().body("Người dùng không tồn tại");
        }
        User user = optionalUser.get();

        // Check if the old password is correct
        if (!passwordEncoder.matches(changePasswordForm.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Mật khẩu cũ không đúng");
        }

        // Encode the new password and save it to the database
        user.setPassword(passwordEncoder.encode(changePasswordForm.getNewPassword()));
        userRepository.save(user);

        return ResponseEntity.ok("Cập nhập mật khẩu thành công");
>>>>>>> Stashed changes
    }

    @Override
    public ResponseEntity<?> updateProfile(ProfileForm profileForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
<<<<<<< Updated upstream
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
=======
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
        String userId = userPrinciple.getId();

        Optional<User> optionalUser = userRepository.findById(userId);

        if (!optionalUser.isPresent()) {
            return ResponseEntity.badRequest().body("Người dùng không tồn tại");
        }

        User user = optionalUser.get();
        BeanUtils.copyProperties(profileForm, user);

        userRepository.save(user);

        return ResponseEntity.ok("Cập nhật thông tin thành công");
    }

>>>>>>> Stashed changes
}
