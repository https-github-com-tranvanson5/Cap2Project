package com.example.backend.blog.service;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.model.Blog;
import com.example.backend.blog.model.Image;
import com.example.backend.blog.payload.request.BlogCreate;
import com.example.backend.blog.repository.BlogRepository;
import com.example.backend.blog.repository.ImageRepository;
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

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class BlogServiceImpl implements BlogService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Override
    @Transactional
    public ResponseEntity<?> create(BlogCreate blogCreate) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(idUser);
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            Blog blog = new Blog();
            blog.setContent(blogCreate.getContent());
            blog.setStatus(BlogStatus.ACTIVE);
            blog.setCreatedAt(LocalDateTime.now());
            blog.setUser(optionalUser.get());

            // Ensure that blogCreate.getImages() is not null before attempting to save
            if (blogCreate.getImages() != null && !blogCreate.getImages().isEmpty()) {
                Set<Image> images = new HashSet<>(imageRepository.saveAll(blogCreate.getImages()));
                blog.setImages(images);
            }

            return new ResponseEntity<>(blogRepository.save(blog), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateMyBlog(BlogCreate blogCreate, String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            Optional<Blog> blogOptional = blogRepository.findByIdAndUser(id, optionalUser.get());
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }

            Blog blog = blogOptional.get();
            blog.setContent(blogCreate.getContent());

            Set<Image> newImages = new HashSet<>(blogCreate.getImages());

            // Delete images that are not present in the updated set
            if (blog.getImages() != null) {
                blog.getImages().stream()
                        .filter(existingImage -> !newImages.contains(existingImage))
                        .forEach(imageRepository::delete);
            }

            // Save new images
            Set<Image> savedImages = new HashSet<>(imageRepository.saveAll(newImages));
            blog.setImages(savedImages);

            return new ResponseEntity<>(blogRepository.save(blog), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> getAll(String search, Pageable pageable) {
        try {
            Page<Blog> blogs = blogRepository.findAllBlog( search, BlogStatus.ACTIVE.toString(),null,pageable);
            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> getById(String id) {
        try {
            Optional<Blog> blogOptional = blogRepository.findById(id);
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(blogOptional.get(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> deleteMyBlog(String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }
            Optional<Blog> blogOptional = blogRepository.findByIdAndUser(id, optionalUser.get());
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }
            Blog blog = blogOptional.get();
            blog.setStatus(BlogStatus.DELETE);
            return new ResponseEntity<>(blogRepository.save(blog), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Override
    public ResponseEntity<?> getByIdMyBlog(String id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (!authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            Optional<Blog> blogOptional = blogRepository.findByIdAndUser(id,optionalUser.get());
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(blogOptional.get(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> getAllMyBlog(String search, Pageable pageable) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (!authentication.isAuthenticated()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(userPrincipal.getId());
            Page<Blog> blogs = blogRepository.findAllBlog( search, BlogStatus.ACTIVE.toString(),optionalUser.get().getId(),pageable);
            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> adminCreate(BlogCreate blogCreate) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
            Optional<User> optionalUser = userRepository.findById(idUser);
            if (optionalUser.isEmpty()) {
                return new ResponseEntity<>("User not authenticated", HttpStatus.UNAUTHORIZED);
            }

            Blog blog = new Blog();
            blog.setContent(blogCreate.getContent());
            blog.setStatus(BlogStatus.ACTIVE);
            blog.setCreatedAt(LocalDateTime.now());
            blog.setUser(optionalUser.get());

            // Ensure that blogCreate.getImages() is not null before attempting to save
            if (blogCreate.getImages() != null && !blogCreate.getImages().isEmpty()) {
                Set<Image> images = new HashSet<>(imageRepository.saveAll(blogCreate.getImages()));
                blog.setImages(images);
            }

            return new ResponseEntity<>(blogRepository.save(blog), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> adminGetAll(String search, Pageable pageable) {
        try {
            Page<Blog> blogs = blogRepository.findAllBlog( search, BlogStatus.ACTIVE.toString(),null,pageable);
            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> adminGetById(String id) {
        try {
            Optional<Blog> blogOptional = blogRepository.findById(id);
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(blogOptional.get(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> adminDelete(String id) {
        try {
            Optional<Blog> blogOptional = blogRepository.findById(id);
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }
            Blog blog = blogOptional.get();
            blog.setStatus(BlogStatus.DELETE);
            return new ResponseEntity<>(blogRepository.save(blog), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> adminUpdate(String id,BlogCreate blogCreate) {
        try {
            Optional<Blog> blogOptional = blogRepository.findById(id);
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }

            Blog blog = blogOptional.get();
            blog.setContent(blogCreate.getContent());

            Set<Image> newImages = new HashSet<>(blogCreate.getImages());

            // Delete images that are not present in the updated set
            if (blog.getImages() != null) {
                blog.getImages().stream()
                        .filter(existingImage -> !newImages.contains(existingImage))
                        .forEach(imageRepository::delete);
            }

            // Save new images
            Set<Image> savedImages = new HashSet<>(imageRepository.saveAll(newImages));
            blog.setImages(savedImages);

            return new ResponseEntity<>(blogRepository.save(blog), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
