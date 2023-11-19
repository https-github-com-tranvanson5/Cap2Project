package com.example.backend.authen.service.auth;

<<<<<<< Updated upstream
=======
import com.example.backend.authen.payload.request.RestPassword;
>>>>>>> Stashed changes
import com.example.backend.authen.payload.request.SignInForm;
import com.example.backend.authen.payload.request.SignUpForm;
import org.springframework.http.ResponseEntity;

<<<<<<< Updated upstream
=======
import javax.servlet.http.HttpServletRequest;
>>>>>>> Stashed changes

public interface AuthService {
    ResponseEntity<?> SignIn(SignInForm signInForm);

    ResponseEntity<?> SignUp(SignUpForm signUpForm);

<<<<<<< Updated upstream
=======
    ResponseEntity<?> generateOtpForgotPassword(String email);

    ResponseEntity<?> veritifyOtpForgotPassword(String email, String otp);

    ResponseEntity<?> resetPassword(RestPassword password, HttpServletRequest request);
>>>>>>> Stashed changes
}
