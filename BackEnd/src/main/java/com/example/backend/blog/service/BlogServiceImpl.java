package com.example.backend.blog.service;

import com.example.backend.authen.constain.RoleName;
import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.model.Blog;
import com.example.backend.blog.model.Image;
import com.example.backend.blog.payload.request.BlogCreate;
import com.example.backend.blog.repository.BlogRepository;
import com.example.backend.blog.repository.ImageRepository;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {
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
            blog.setTitle(blogCreate.getTitle());
            blog.setAuthor(optionalUser.get().getName());
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
            blog.setTitle(blogCreate.getTitle());
            Set<Image> newImages = new HashSet<>(blogCreate.getImages());

            // Delete images that are not present in the updated set
            if (blog.getImages() != null) {
                blog.getImages().stream().filter(existingImage -> !newImages.contains(existingImage))
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
            Page<Blog> blogs = blogRepository.findAllBlog(search, BlogStatus.ACTIVE.toString(), null, pageable);
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
        } catch (Exception e) {
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
            Optional<Blog> blogOptional = blogRepository.findByIdAndUser(id, optionalUser.get());
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(blogOptional.get(), HttpStatus.OK);
        } catch (Exception e) {
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
            System.out.println(optionalUser.get().getId());
            Page<Blog> blogs = blogRepository.findAllBlog(search, BlogStatus.ACTIVE.toString(),
                    optionalUser.get().getId(), pageable);
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
            blog.setTitle(blogCreate.getTitle());
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
            Page<Blog> blogs = blogRepository.findAllBlog(search, BlogStatus.ACTIVE.toString(), null, pageable);
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
        } catch (Exception e) {
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
    public ResponseEntity<?> adminUpdate(String id, BlogCreate blogCreate) {
        try {
            Optional<Blog> blogOptional = blogRepository.findById(id);
            if (blogOptional.isEmpty() || blogOptional.get().getStatus() == BlogStatus.DELETE) {
                return new ResponseEntity<>("Blog not found or deleted", HttpStatus.NOT_FOUND);
            }

            Blog blog = blogOptional.get();
            blog.setContent(blogCreate.getContent());
            blog.setTitle(blogCreate.getTitle());
            Set<Image> newImages = new HashSet<>(blogCreate.getImages());

            // Delete images that are not present in the updated set
            if (blog.getImages() != null) {
                blog.getImages().stream().filter(existingImage -> !newImages.contains(existingImage))
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
    public ResponseEntity<?> countBlog(BlogStatus status) {
        try {
            String statusString = (status == null) ? null : status.toString();

            // Assuming blogRepository.countBlog expects BlogStatus directly
            int count = blogRepository.countBlog(statusString);
            // Create a Map to represent the structure
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("count", count);

            // Convert the Map to JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResult = objectMapper.writeValueAsString(Collections.singletonList(resultMap));

            return new ResponseEntity<>(jsonResult, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> countBlogMonth(BlogStatus status, Integer year) {
        try {
            String statusString = (status == null) ? null : status.toString();
// Assuming blogRepository.countBlog expects BlogStatus directly
            List<Object[]> countList = blogRepository.countBlogMonth(statusString, year);

            // Convert the list of arrays to a list of maps
            List<Map<String, Object>> responseList = countList.stream().map(array -> {
                Map<String, Object> item = new HashMap<>();
                item.put("month", array[1]); // Assuming the month is at index 1
                item.put("count", array[0]); // Assuming the count is at index 0
                return item;
            }).collect(Collectors.toList());

            return new ResponseEntity<>(responseList, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> yearMinMax() {
        try {
            List<Object[]> yearRangeList = blogRepository.yearMinMax();

            if (!yearRangeList.isEmpty()) {
                Object[] yearRange = yearRangeList.get(0);

                Map<String, Object> resultMap = new HashMap<>();
                resultMap.put("minYear", yearRange[0]);
                resultMap.put("maxYear", yearRange[1]);

                ObjectMapper objectMapper = new ObjectMapper();
                String jsonResult = objectMapper.writeValueAsString(resultMap); // Remove Collections.singletonList
                return new ResponseEntity<>(jsonResult, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Year range data is empty", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> countBlogYear(BlogStatus status, Integer year, RoleName role) {
        try {
            String statusString = (status == null) ? null : status.toString();
            String roleString = (role == null) ? null : role.toString();

            List<Object[]> result = blogRepository.countBlogYear(statusString,year,roleString);

            if (!result.isEmpty()) {
                ObjectMapper objectMapper = new ObjectMapper();
                String jsonResult = objectMapper.writeValueAsString(result.stream()
                        .map(row -> {
                            Map<String, Object> map = new HashMap<>();
                            map.put("count", row[0]);
                            map.put("year", row[1]);
                            return map;
                        })
                        .collect(Collectors.toList()));

                return new ResponseEntity<>(jsonResult, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Blog count data is empty", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> rankTopBlog(Integer limit, BlogStatus status) {
        try {
            limit = limit==null?10:limit;
            String statusString = (status == null) ? null : status.toString();

            List<Object[]> result = blogRepository.rankTopBlog(limit, statusString);

            // Transform the list of objects into a list of maps
            List<Map<String, Object>> transformedResult = new ArrayList<>();
            for (Object[] row : result) {
                Map<String, Object> item = new LinkedHashMap<>();
                item.put("id", row[0]);
                item.put("username", row[1]);
                item.put("name", row[2]);
                item.put("count", row[3]);
                transformedResult.add(item);
            }

            return new ResponseEntity<>(transformedResult, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> minMaxYear() {
        List<Object[]> result = blogRepository.getMinMaxYear();

        if (result != null && !result.isEmpty()) {
            Object[] minMax = result.get(0);
            BigInteger minYear = (BigInteger) minMax[0];
            BigInteger maxYear = (BigInteger) minMax[1];

            Map<String, Integer> response = new HashMap<>();
            response.put("minYear", minYear.intValue());
            response.put("maxYear", maxYear.intValue());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

}