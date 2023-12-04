package com.example.backend.blog.controller;

import com.example.backend.blog.payload.request.CommentFormCreate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @GetMapping
    public String getMessage() {
        return "Hello, this is a message!";
    }

    @PostMapping
    public String createMessage(@RequestBody CommentFormCreate message) {
        // Handle the creation of a new message
        return "Message created: " + message.getContent();
    }
}

