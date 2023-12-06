package com.example.backend.blog.service;

import com.example.backend.blog.payload.request.BlogCreate;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface BlogService {
    ResponseEntity<?> create(BlogCreate blogCreate);

    ResponseEntity<?> updateMyBlog(BlogCreate blogCreate, String id);

    ResponseEntity<?> getAll(String search, Pageable pageable);

    ResponseEntity<?> getById(String id);

    ResponseEntity<?> deleteMyBlog(String id);

    ResponseEntity<?> getByIdMyBlog(String id);

    ResponseEntity<?> getAllMyBlog(String search, Pageable pageable);

    ResponseEntity<?> adminCreate(BlogCreate blogCreate);

    ResponseEntity<?> adminGetAll(String search, Pageable pageable);

    ResponseEntity<?> adminGetById(String id);

    ResponseEntity<?> adminDelete(String id);

    ResponseEntity<?> adminUpdate(String id,BlogCreate blogCreate);
}
