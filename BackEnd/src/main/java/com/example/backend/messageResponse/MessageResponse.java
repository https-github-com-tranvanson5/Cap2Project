package com.example.backend.messageResponse;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class MessageResponse {
    private int code;
    private String title;
    private String message;
}
