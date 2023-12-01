package com.example.backend.blog.repository;

import com.example.backend.blog.model.Blog;
import com.example.backend.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog,String> {
    Optional<Blog> findByIdAndUser(String id, User user);

    @Query(
            value = "SELECT * FROM blog b " +
                    "JOIN user u ON u.id = b.user_id " +
                    "WHERE (:userId IS NULL OR b.user_id = :userId) " +
                    "AND (:search IS NULL OR b.id LIKE CONCAT(:search, '%')) " +
                    "OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%')) " +
                    "OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%')) " +
                    "OR (:search IS NULL OR u.id LIKE CONCAT(:search, '%')) " +
                    "OR (:search IS NULL OR u.name LIKE CONCAT('%', :search, '%')) " +
                    "OR (:search IS NULL OR u.username LIKE CONCAT(:search, '%')) " +
                    "AND (:status IS NULL OR b.status = :status)" +
                    "ORDER BY create_at DESC",
            countQuery = "SELECT count(*) FROM blog b " +
                    "JOIN user u ON u.id = b.user_id " +
                    "WHERE (:userId IS NULL OR b.user_id = :userId) " +
                    "AND (:search IS NULL OR b.id LIKE CONCAT(:search, '%')) " +
                    "OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%')) " +
                    "OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%')) " +
                    "OR (:search IS NULL OR u.id LIKE CONCAT(:search, '%')) " +
                    "OR (:search IS NULL OR u.name LIKE CONCAT('%', :search, '%')) " +
                    "OR (:search IS NULL OR u.username LIKE CONCAT(:search, '%')) " +
                    "AND (:status IS NULL OR b.status = :status)",
            nativeQuery = true
    )
    Page<Blog> findAllBlog(@Param("search") String search, @Param("status") String status, @Param("userId") String userId, Pageable pageable);

}
