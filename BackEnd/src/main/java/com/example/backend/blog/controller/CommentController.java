package com.example.backend.blog.controller;

import com.example.backend.blog.payload.request.CommentCreate;
import com.example.backend.blog.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog/comment")
@CrossOrigin(origins = "*")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @GetMapping("getAll")
    public ResponseEntity<?> getAllComment(@RequestParam String blogId){
        return commentService.getAllComment(blogId);
    }
    @PostMapping("create")
    public ResponseEntity<?> createComment(@RequestBody CommentCreate commentCreate, @RequestParam String blogId){
        return commentService.createComment(commentCreate,blogId);
    }
    @PutMapping("update")
    public ResponseEntity<?> updateComment(@RequestBody CommentCreate commentCreate,  @RequestParam String id){
        return commentService.updateComment(commentCreate,id);
    }
    @DeleteMapping("delete")
    public ResponseEntity<?> deleteComment(@RequestParam String id){
        return commentService.deleteComment(id);
    }
    @PostMapping("createRepcomment")
    public ResponseEntity<?> createRepcomment(@RequestBody CommentCreate commentCreate, @RequestParam String id){
        return commentService.createRepcomment(commentCreate, id);
    }
    @GetMapping("getAllRepcomment")
    public ResponseEntity<?> getAllRepcomment(@RequestParam String id){
        return commentService.getAllRepcomment(id);
    }

    @PutMapping("admin/update")
    public ResponseEntity<?> adminUpdateComment(@RequestBody CommentCreate commentCreate,  @RequestParam String id){
        return commentService.adminUpdateComment(commentCreate,id);
    }
    @DeleteMapping("admin/delete")
    public ResponseEntity<?> adminDeleteComment(@RequestParam String id){
        return commentService.adminDeleteComment(id);
    }

}
