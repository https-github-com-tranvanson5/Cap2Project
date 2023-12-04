package com.example.backend.blog.controller;

import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.payload.request.BlogFormCreate;
import com.example.backend.blog.payload.request.BlogFormUpdate;
import com.example.backend.blog.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin(origins = "*")
public class BlogController {
    @Autowired
    private BlogService blogUserService;
    @PostMapping("/create")
    public ResponseEntity<?> createUserBlog(@RequestBody BlogFormCreate blogFormCreate){
        return blogUserService.createUserBlog(blogFormCreate);
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateUserBlog(@RequestBody BlogFormUpdate blogFormUpdate){
        return blogUserService.updateUserBlog(blogFormUpdate);
    }
    @GetMapping("/getById")
    public ResponseEntity<?> getUserByIdBlog(@RequestParam String id, @RequestParam(required = false) BlogStatus status){
        return blogUserService.getUserByIdBlog(id, status);
    }
    @GetMapping("/changeStatus")
    public ResponseEntity<?> changeStatusBlog(@RequestParam String id, @RequestParam BlogStatus status){
        return blogUserService.changeStatusBlog(id, status);
    }
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllBlog(@RequestParam(required = false) String search,
                                        @RequestParam(required = false) BlogStatus status,
                                        @PageableDefault Pageable pageable){
        return blogUserService.getAllBlog(search, status , pageable);
    }
    @GetMapping("/admin/getAll")
    public ResponseEntity<?> getAllBlogAdmin(@RequestParam(required = false) String search,
                                        @RequestParam(required = false) BlogStatus status,
                                        @PageableDefault Pageable pageable){
        return blogUserService.getAllBlogAdmin(search, status , pageable);
    }
    @PutMapping("/admin/update")
    public ResponseEntity<?> updateUserBlogAdmin(@RequestBody BlogFormUpdate blogFormUpdate){
        return blogUserService.updateUserBlogAdmin(blogFormUpdate);
    }
    @GetMapping("/admin/getById")
    public ResponseEntity<?> getUserByIdBlogAdmin(@RequestParam String id, @RequestParam(required = false) BlogStatus status){
        return blogUserService.getUserByIdBlogAdmin(id, status);
    }
    @GetMapping("/admin/changeStatus")
    public ResponseEntity<?> changeStatusBlogAdmin(@RequestParam String id, @RequestParam BlogStatus status, @RequestParam String userId){
        return blogUserService.changeStatusBlogAdmin(id, status , userId);
    }
//    @PostMapping("/addCommentBlog")
//    public ResponseEntity<?> addCommentBlog(@RequestParam String id, @RequestParam String comment){
//        return blogUserService.commentBlog(id,comment);
//    }
}
