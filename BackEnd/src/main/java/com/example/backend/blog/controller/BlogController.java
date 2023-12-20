package com.example.backend.blog.controller;

import com.example.backend.authen.constain.RoleName;
import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.payload.request.BlogCreate;
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
    private BlogService blogService;

    @PostMapping("create")
    public ResponseEntity<?> create(@RequestBody BlogCreate blogCreate) {
        return blogService.create(blogCreate);
    }

    @GetMapping("getAll")
    public ResponseEntity<?> getAll(@RequestParam(required = false) String search, @PageableDefault Pageable pageable) {
        return blogService.getAll(search, pageable);
    }

    @GetMapping("getById")
    public ResponseEntity<?> getById(@RequestParam String id) {
        return blogService.getById(id);
    }

    @PutMapping("updateMyBlog")
    public ResponseEntity<?> update(@RequestBody BlogCreate blogCreate, @RequestParam String id) {
        return blogService.updateMyBlog(blogCreate, id);
    }

    @DeleteMapping("deleteMyBlog")
    public ResponseEntity<?> delete(@RequestParam String id) {
        return blogService.deleteMyBlog(id);
    }

    @GetMapping("getAllMyBlog")
    public ResponseEntity<?> getAllMyBlog(@RequestParam(required = false) String search,
            @PageableDefault Pageable pageable) {
        return blogService.getAllMyBlog(search, pageable);
    }

    @GetMapping("getByIdMyBlog")
    public ResponseEntity<?> getByIdMyBlog(@RequestParam String id) {
        return blogService.getByIdMyBlog(id);
    }

    @PostMapping("admin/create")
    public ResponseEntity<?> adminCreate(@RequestBody BlogCreate blogCreate) {
        return blogService.adminCreate(blogCreate);
    }

    @PutMapping("admin/update")
    public ResponseEntity<?> adminUpdate(@RequestBody BlogCreate blogCreate, @RequestParam String id) {
        return blogService.adminUpdate(id, blogCreate);
    }

    @GetMapping("admin/getAll")
    public ResponseEntity<?> adminGetAll(@RequestParam(required = false) String search,
            @PageableDefault Pageable pageable) {
        return blogService.adminGetAll(search, pageable);
    }

    @GetMapping("admin/getById")
    public ResponseEntity<?> adminGetById(@RequestParam String id) {
        return blogService.adminGetById(id);
    }

    @DeleteMapping("admin/delete")
    public ResponseEntity<?> adminDelete(@RequestParam String id) {
        return blogService.adminDelete(id);
    }

    @GetMapping("admin/countBlog")
    public ResponseEntity<?> countBlog(@RequestParam(required = false) BlogStatus status) {
        return blogService.countBlog(status);
    }

    @GetMapping("admin/countBlogMonth")
    public ResponseEntity<?> countBlogMonth(@RequestParam(required = false) BlogStatus status,
            @RequestParam(required = false) Integer year) {
        return blogService.countBlogMonth(status, year);
    }

    @GetMapping("admin/yearMinMax")
    public ResponseEntity<?> yearMinMax() {
        return blogService.yearMinMax();
    }

    @GetMapping("admin/countBlogYear")
    public ResponseEntity<?> countBlogYear(
            @RequestParam(required = false) BlogStatus status,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) RoleName role) {
        return blogService.countBlogYear(status,year, role);
    }
    @GetMapping("admin/rankTopBlog")
    public ResponseEntity<?> rankTopBlog(@RequestParam(required = false) Integer limit,
            @RequestParam(required = false) BlogStatus status) {
        return blogService.rankTopBlog(limit, status);
    }
    @GetMapping("admin/minMaxYear")
    public ResponseEntity<?> minMaxYear() {
        return blogService.minMaxYear();
    }
}
