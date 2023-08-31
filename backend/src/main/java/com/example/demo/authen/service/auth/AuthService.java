package com.example.demo.authen.service.auth;

import com.example.demo.authen.payload.request.SignInForm;
import com.example.demo.authen.payload.request.SignUpForm;
import org.springframework.http.ResponseEntity;


public interface AuthService {
    ResponseEntity<?> SignIn(SignInForm signInForm);

    ResponseEntity<?> SignUp(SignUpForm signUpForm);

}
