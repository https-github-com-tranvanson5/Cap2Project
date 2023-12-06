package com.example.backend.blog.service;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.constain.CommentStatus;
import com.example.backend.blog.model.Blog;
import com.example.backend.blog.model.Comment;
import com.example.backend.blog.payload.request.CommentCreate;
import com.example.backend.blog.repository.BlogRepository;
import com.example.backend.blog.repository.CommentRepository;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@Service
public class CommentServiceImpl implements CommentService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private BlogRepository blogRepository;

    @Override
    public ResponseEntity<?> getAllComment(String blogId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
            }

            Optional<Blog> optionalBlog = blogRepository.findById(blogId);
            if (optionalBlog.isEmpty() || optionalBlog.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }
            Set<Comment> comments = commentRepository.findByBlogAndRepcommentAndStatus(optionalBlog.get(),false,CommentStatus.ACTIVE);
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> createComment(CommentCreate commentCreate, String blogId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
            }

            Optional<Blog> optionalBlog = blogRepository.findById(blogId);
            if (optionalBlog.isEmpty() || optionalBlog.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }

            Comment comment = new Comment();
            comment.setComment(commentCreate.getComment());
            comment.setCreateAt(LocalDateTime.now());
            comment.setStatus(CommentStatus.ACTIVE);
            comment.setUserId(optionalUser.get().getId());
            comment.setBlog(optionalBlog.get());
            comment.setRepcomment(false);

            return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<?> updateComment(CommentCreate commentCreate, String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
            }

            Optional<Comment> commentOptional = commentRepository.findById(id);
            if (commentOptional.isEmpty() || commentOptional.get().getStatus() == CommentStatus.DELETE) {
                return new ResponseEntity<>("Comment not found or deleted", HttpStatus.NOT_FOUND);
            }
            Comment comment = commentOptional.get();
            comment.setComment(commentCreate.getComment());

            return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> deleteComment(String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
            }

            Optional<Comment> commentOptional = commentRepository.findById(id);
            if (commentOptional.isEmpty() || commentOptional.get().getStatus() == CommentStatus.DELETE) {
                return new ResponseEntity<>("Comment not found or deleted", HttpStatus.NOT_FOUND);
            }
            Comment comment = commentOptional.get();
            comment.setStatus(CommentStatus.DELETE);
            return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> createRepcomment(CommentCreate commentCreate, String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
            }

            Optional<Comment> commentOptional = commentRepository.findById(id);
            if (commentOptional.isEmpty() || commentOptional.get().getStatus() == CommentStatus.DELETE) {
                return new ResponseEntity<>("Comment not found or deleted", HttpStatus.NOT_FOUND);
            }

            Comment repComment = new Comment();
            repComment.setComment(commentCreate.getComment());
            repComment.setCreateAt(LocalDateTime.now());
            repComment.setStatus(CommentStatus.ACTIVE);
            repComment.setUserId(optionalUser.get().getId());
            repComment.setRepcomment(true);
            repComment.setBlog(commentOptional.get().getBlog());
            repComment.setCommentId(id);

            return new ResponseEntity<>(commentRepository.save(repComment), HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception for better debugging
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<?> getAllRepcomment(String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
            }

            Optional<Comment> optionalComment = commentRepository.findById(id);
            if (optionalComment.isEmpty() || optionalComment.get().getStatus() == CommentStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }
            Set<Comment> comments = commentRepository.findByCommentIdAndRepcommentAndStatus(optionalComment.get().getId(),true,CommentStatus.ACTIVE);
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> adminUpdateComment(CommentCreate commentCreate, String id) {
        try {
            Optional<Comment> commentOptional = commentRepository.findById(id);
            if (commentOptional.isEmpty() || commentOptional.get().getStatus() == CommentStatus.DELETE) {
                return new ResponseEntity<>("Comment not found or deleted", HttpStatus.NOT_FOUND);
            }
            Comment comment = commentOptional.get();
            comment.setComment(commentCreate.getComment());

            return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> adminDeleteComment(String id) {
        try {
            Optional<Comment> commentOptional = commentRepository.findById(id);
            if (commentOptional.isEmpty() || commentOptional.get().getStatus() == CommentStatus.DELETE) {
                return new ResponseEntity<>("Comment not found or deleted", HttpStatus.NOT_FOUND);
            }
            Comment comment = commentOptional.get();
            comment.setStatus(CommentStatus.DELETE);
            return new ResponseEntity<>(commentRepository.save(comment), HttpStatus.OK);

        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
