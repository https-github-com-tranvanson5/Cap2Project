package com.example.backend.blog.service;

import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.payload.request.BlogFormCreate;
import com.example.backend.blog.payload.request.BlogFormUpdate;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface BlogService {
    ResponseEntity<?> createUserBlog(BlogFormCreate blogFormCreate);

    ResponseEntity<?> updateUserBlog(BlogFormUpdate blogFormUpdate);

    ResponseEntity<?> getUserByIdBlog(String id, BlogStatus status);

    ResponseEntity<?> changeStatusBlog(String id, BlogStatus status);

    ResponseEntity<?> getAllBlog(String search, BlogStatus status, Pageable pageable);

    ResponseEntity<?> getAllBlogAdmin(String search, BlogStatus status, Pageable pageable);

    ResponseEntity<?> updateUserBlogAdmin(BlogFormUpdate blogFormUpdate);

    ResponseEntity<?> getUserByIdBlogAdmin(String id, BlogStatus status);

    ResponseEntity<?> changeStatusBlogAdmin(String id, BlogStatus status, String userId);

//    ResponseEntity<?> commentBlog(String id, String comment);
}
