package com.example.backend.blog.service;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.model.Blog;
import com.example.backend.blog.payload.request.BlogFormCreate;
import com.example.backend.blog.payload.request.BlogFormUpdate;
import com.example.backend.blog.respository.BlogRepository;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public ResponseEntity<?> createUserBlog(BlogFormCreate blogFormCreate) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String id = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(id);
            if (!optionalUser.isPresent()) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
            }
            User user = optionalUser.get();

            Blog blog=new Blog();
            blog.setTitle(blogFormCreate.getTitle());
            blog.setContent(blogFormCreate.getContent());
            blog.setAuthor(blogFormCreate.getAuthor());
            blog.setImageUrl(blogFormCreate.getImageUrl());
            blog.setCreatedAt(LocalDateTime.now());
            blog.setStatus(BlogStatus.ACTIVE);
            blog.setUser(user);
            blogRepository.save(blog);
            return new ResponseEntity<>("tạo thành công", HttpStatus.OK);
        } catch (Error error){
            return new ResponseEntity<>("tạo thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> updateUserBlog(BlogFormUpdate blogFormUpdate) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String id = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(id);
            if (!optionalUser.isPresent()) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
            }
            User user = optionalUser.get();

            Optional<Blog> blogOptional= blogRepository.findByIdAndUser(blogFormUpdate.getId(), user);
            if (!blogOptional.isPresent()) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Blog blog= blogOptional.get();

            if (blog.getStatus()==BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }

            blog.setTitle(blogFormUpdate.getTitle());
            blog.setContent(blogFormUpdate.getContent());
            blog.setAuthor(blogFormUpdate.getAuthor());
            blog.setImageUrl(blogFormUpdate.getImageUrl());
            blog.setUser(user);
            blogRepository.save(blog);
            return new ResponseEntity<>("cập nhật thành công", HttpStatus.OK);
        } catch (Exception error){
            return new ResponseEntity<>("cập nhật thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getUserByIdBlog(String id, BlogStatus status) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(userId);
            if (!optionalUser.isPresent()) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
            }
            User user = optionalUser.get();

            Optional<Blog> blogOptional;
            if(status!=null){
                blogOptional = blogRepository.findByIdAndUserAndStatus(id, user, status);
            }else {
                blogOptional = blogRepository.findByIdAndUser(id, user);
            }
            if (!blogOptional.isPresent()) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Blog blog= blogOptional.get();

            if (blog.getStatus()==BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(blog, HttpStatus.OK);
        } catch (Exception error){
            return new ResponseEntity<>("get thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> changeStatusBlog(String id, BlogStatus status) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(userId);
            if (!optionalUser.isPresent()) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
            }
            User user = optionalUser.get();

            Optional<Blog> blogOptional;
            blogOptional = blogRepository.findByIdAndUser(id, user);
            if (!blogOptional.isPresent()) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Blog blog= blogOptional.get();

            if (blog.getStatus()==BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            blog.setStatus(status);
            blogRepository.save(blog);
            return new ResponseEntity<>("thay đổi trạng thái thành công", HttpStatus.OK);
        } catch (Exception error){
            return new ResponseEntity<>("thay đổi trạng thái thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> getAllBlog(String search, BlogStatus status, Pageable pageable) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(userId);
            if (!optionalUser.isPresent()) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
            }
            String statusString = status!=null?status.toString(): null;
            Page<Blog> blogs = blogRepository.getAllBlog(search,statusString,userId,pageable);

            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("get thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getAllBlogAdmin(String search, BlogStatus status, Pageable pageable) {
        try{
            String userId = null;
            String statusString = status!=null?status.toString(): null;
            Page<Blog> blogs = blogRepository.getAllBlog(search,statusString,userId,pageable);

            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>("get thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> updateUserBlogAdmin(BlogFormUpdate blogFormUpdate) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String id = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(id);
            if (!optionalUser.isPresent()) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
            }
            User user = optionalUser.get();

            Optional<Blog> blogOptional= blogRepository.findById(blogFormUpdate.getId());
            if (!blogOptional.isPresent()) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Blog blog= blogOptional.get();

            if (blog.getStatus()==BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }

            blog.setTitle(blogFormUpdate.getTitle());
            blog.setContent(blogFormUpdate.getContent());
            blog.setAuthor(blogFormUpdate.getAuthor());
            blog.setImageUrl(blogFormUpdate.getImageUrl());
            blog.setUser(user);
            blogRepository.save(blog);
            return new ResponseEntity<>("cập nhật thành công", HttpStatus.OK);
        } catch (Exception error){
            return new ResponseEntity<>("cập nhật thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> getUserByIdBlogAdmin(String id, BlogStatus status) {
        try{
            Optional<Blog> blogOptional;
            if(status!=null){
                blogOptional = blogRepository.findByIdAndStatus(id, status);
            }else {
                blogOptional = blogRepository.findById(id);
            }
            if (!blogOptional.isPresent()) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Blog blog= blogOptional.get();

            if (blog.getStatus()==BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(blog, HttpStatus.OK);
        } catch (Exception error){
            return new ResponseEntity<>("get thất bại", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<?> changeStatusBlogAdmin(String id, BlogStatus status, String userId) {
        try{
            Optional<User> optionalUser = userRepository.findById(userId);
            if (!optionalUser.isPresent()) {
                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
            }
            User user = optionalUser.get();

            Optional<Blog> blogOptional;
            blogOptional = blogRepository.findByIdAndUser(id, user);
            if (!blogOptional.isPresent()) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Blog blog= blogOptional.get();

            if (blog.getStatus()==BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog không tồn tại", HttpStatus.BAD_REQUEST);
            }
            blog.setStatus(status);
            blogRepository.save(blog);
            return new ResponseEntity<>("thay đổi trạng thái thành công", HttpStatus.OK);
        } catch (Exception error){
            return new ResponseEntity<>("thay đổi trạng thái thất bại", HttpStatus.BAD_REQUEST);
        }
    }

//    @Override
//    public ResponseEntity<?> commentBlog(String id, String comment) {
//        try {
//            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//            String userId = ((UserPrinciple) authentication.getPrincipal()).getId();
//            Optional<User> optionalUser = userRepository.findById(userId);
//            if (!optionalUser.isPresent()) {
//                return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
//            }
//            User user = optionalUser.get();
//            return new ResponseEntity<>("thay đổi trạng thái thành công", HttpStatus.OK);
//        }catch (Exception e){
//            return new ResponseEntity<>("comment thất bại", HttpStatus.BAD_REQUEST);
//        }
//    }
}
