package com.example.backend.user.service.userManager;


import com.example.backend.authen.contains.RoleName;
import com.example.backend.authen.model.Role;
import com.example.backend.authen.service.Role.RoleService;
import com.example.backend.messageResponse.MessageResponse;
import com.example.backend.user.contains.EGender;
import com.example.backend.user.contains.UserStatus;
import com.example.backend.user.model.User;
import com.example.backend.user.payload.request.CreateUserForm;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserManagerServiceImp implements UserManagerService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleService roleService;
    @Override
    public ResponseEntity<?> getDataListUser() {
        List<User> users= userRepository.findAll();
        if(users.isEmpty()){
            MessageResponse response = new MessageResponse();
            response.setCode(HttpStatus.NO_CONTENT.value());
            response.setTitle(HttpStatus.NO_CONTENT.name());
            response.setMessage("Dữ liệu không tồn tại");
            return new ResponseEntity<>(response,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> createUser(CreateUserForm createUserForm) {
        if(userRepository.existsByEmail(createUserForm.getEmail())){
            MessageResponse response = new MessageResponse();
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setTitle(HttpStatus.BAD_REQUEST.name());
            response.setMessage("Lỗi email đã tồn tại");
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        if(userRepository.existsByUsername(createUserForm.getUsername())){
            MessageResponse response = new MessageResponse();
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setTitle(HttpStatus.BAD_REQUEST.name());
            response.setMessage("Lỗi username đã tồn tại");
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        User user= new User();
        user.setName(createUserForm.getName());
        user.setDob(createUserForm.getDob());
        switch (createUserForm.getGender()){
            case "MALE": user.setGender(EGender.MALE); break;
            case "FEMALE": user.setGender(EGender.FEMALE); break;
            case "OTHER": user.setGender(EGender.OTHER); break;
            default: break;
        }
        user.setIdCard(createUserForm.getIdCard());
        user.setPhone(createUserForm.getPhone());
        user.setAddress(createUserForm.getAddress());
        user.setAvatar(createUserForm.getAvatar());
        user.setEmail(createUserForm.getEmail());
        user.setUsername(createUserForm.getUsername());
        user.setPassword(passwordEncoder.encode(createUserForm.getPassword()));
        switch (createUserForm.getGender()){
            case "ACTIVE": user.setStatus(UserStatus.ACTIVE); break;
            default:  user.setStatus(UserStatus.BLOCK); break;
        }
        user.setCreateAt(LocalDateTime.now());

        Set<String> stringRoles= createUserForm.getRoles();
        Set<Role> roleSet= new HashSet<>();
        for (String roleName : stringRoles) {
            Role role = roleService.findByName(RoleName.valueOf(roleName))
                    .orElseThrow(() -> new RuntimeException("Fail! -> Cause: Role not found for " + roleName));
            roleSet.add(role);
        }
        user.setRoles(roleSet);
        userRepository.save(user);

        MessageResponse response = new MessageResponse();
        response.setCode(HttpStatus.OK.value());
        response.setTitle(HttpStatus.OK.name());
        response.setMessage("Đã tạo thành công");
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getDataListUserByStatus(String status) {
        List<User> users;
        MessageResponse response = new MessageResponse();
        switch (status){
            case "ACTIVE" :
                users= userRepository.getUserByStatus(UserStatus.ACTIVE); break;
            case "BLOCK":
                users= userRepository.getUserByStatus(UserStatus.BLOCK); break;
            default:
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setTitle(HttpStatus.BAD_REQUEST.name());
                response.setMessage("Lỗi dữ liệu đầu vào status");
                return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        if(users.isEmpty()){
            response.setCode(HttpStatus.NO_CONTENT.value());
            response.setTitle(HttpStatus.NO_CONTENT.name());
            response.setMessage("Dữ liệu không tồn tại");
            return new ResponseEntity<>(response,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getDataUserById(String id) {
        MessageResponse response = new MessageResponse();
        if(userRepository.existsById(id)){
            User user= userRepository.getUserById(id);
            return new ResponseEntity<>(user,HttpStatus.OK);
        }
        response.setCode(HttpStatus.NO_CONTENT.value());
        response.setTitle(HttpStatus.NO_CONTENT.name());
        response.setMessage("Dữ liệu không tồn tại");
        return new ResponseEntity<>(response,HttpStatus.NO_CONTENT);
    }
}
