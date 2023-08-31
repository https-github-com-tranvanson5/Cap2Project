package com.example.demo.authen.service.auth;


import com.example.demo.authen.contains.RoleName;
import com.example.demo.authen.model.Role;
import com.example.demo.authen.payload.request.SignInForm;
import com.example.demo.authen.payload.request.SignUpForm;
import com.example.demo.authen.payload.response.JwtReponse;
import com.example.demo.authen.service.Role.RoleService;
import com.example.demo.authen.service.jwt.JwtProvider;
import com.example.demo.authen.service.userdetail.UserPrinciple;
import com.example.demo.user.contains.UserStatus;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImp implements AuthService{
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserRepository userRepository;
    @Override
    public ResponseEntity<?> SignIn(SignInForm signInForm) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInForm.getUsername(),signInForm.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateJwtToken(authentication);
        UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtReponse(jwt, userDetails.getId(),userDetails.getName(),userDetails.getUsername(),userDetails.getEmail(),userDetails.getAuthorities()));
    }

    @Override
    public ResponseEntity<?> SignUp(SignUpForm signUpForm) {

        if(!userRepository.existsByEmail(signUpForm.getEmail())&&!userRepository.existsByUsername(signUpForm.getUsername())){
            User user= new User();
            user.setName(signUpForm.getName());
            user.setUsername(signUpForm.getUsername());
            user.setEmail(signUpForm.getEmail());
            user.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
            Set<Role> roleSet= new HashSet<>();
            Role userRole = roleService.findByName(RoleName.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
            roleSet.add(userRole);
            user.setRoles(roleSet);
            user.setCreateAt(LocalDateTime.now());
            user.setStatus(UserStatus.ACTIVE);
            userRepository.save(user);
            return new ResponseEntity<>(user,HttpStatus.OK);
        }
       return new ResponseEntity<>(HttpStatus.BAD_REQUEST,HttpStatus.BAD_REQUEST);

    }
}
