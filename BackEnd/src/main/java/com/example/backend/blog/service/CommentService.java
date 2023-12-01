package com.example.backend.blog.service;

import com.example.backend.blog.payload.request.CommentCreate;
import org.springframework.http.ResponseEntity;

public interface CommentService {

    ResponseEntity<?> getAllComment(String blogId);

    ResponseEntity<?> createComment(CommentCreate commentCreate, String blogId);

    ResponseEntity<?> updateComment(CommentCreate commentCreate, String id);

    ResponseEntity<?> deleteComment(String id);

    ResponseEntity<?> createRepcomment(CommentCreate commentCreate, String id);

    ResponseEntity<?> getAllRepcomment(String id);

    ResponseEntity<?> adminUpdateComment(CommentCreate commentCreate, String id);

    ResponseEntity<?> adminDeleteComment(String id);
}
