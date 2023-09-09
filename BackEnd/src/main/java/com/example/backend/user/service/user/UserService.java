package com.example.backend.user.service.user;

import com.example.backend.user.payload.request.ChangePasswordForm;
import com.example.backend.user.payload.request.ProfileForm;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> getProfileUser();

    ResponseEntity<?> changePassword(ChangePasswordForm changePasswordForm);

    ResponseEntity<?> updateProfile(ProfileForm profileForm);
}
