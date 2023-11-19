package com.example.backend.user.payload.request;

<<<<<<< Updated upstream
import lombok.Data;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Set;

@Data
public class ProfileForm {
    @NotNull(message = "Name is not null")
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotNull(message = "dob is not null")
    private LocalDate dob;
    private String gender;
    @NotNull(message = "idCard is not null")
    @NotBlank(message = "idCard is required")
    @Pattern(regexp = "^[0-9]{9,14}$", message = "ID Card phải gồm từ 9 đến 14 chữ số.")
    private String idCard;
    @Pattern(regexp = "^\\d{10,15}$", message = "Số điện thoại không hợp lệ. Số điện thoại phải gồm từ 10 đến 15 chữ số.")
    private String phone;
    private String address;
    private String avatar;


=======
import com.example.backend.user.constain.EGender;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ProfileForm {
    private String name;
    private LocalDate dob;
    private EGender gender;
    private String idCard;
    private String phone;
    private String address;
    private String avatar;
>>>>>>> Stashed changes
}
