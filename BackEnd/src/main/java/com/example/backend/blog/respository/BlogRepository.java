package com.example.backend.blog.respository;

import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.model.Blog;
import com.example.backend.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.ObjectInputFilter;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog,String> {
    Optional<Blog> findByIdAndUser(String id, User user);
    Optional<Blog> findByIdAndUserAndStatus(String id, User user, BlogStatus status);
    @Query(
            value = "SELECT * FROM blog b" +
                    " JOIN user u ON b.user_id = u.id" +
                    " WHERE (:search IS NULL OR b.id LIKE CONCAT('%', :search, '%'))" +
                    " OR (:search IS NULL OR b.title LIKE CONCAT('%', :search, '%'))" +
                    " OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%'))" +
                    " OR (:search IS NULL OR u.name LIKE CONCAT('%', :search, '%'))" +
                    " OR (:search IS NULL OR u.username LIKE CONCAT('%', :search, '%'))" +
                    " AND (:status IS NULL OR b.status IN (:status, NULL))" +
                    " AND (b.status <> 'DELETE')" +
                    " AND (:userId IS NULL OR b.user_id = :userId)" +
                    " ORDER BY b.created_at DESC",
            countQuery = "SELECT COUNT(*) FROM blog b" +
                    " JOIN user u ON b.user_id = u.id" +
                    " WHERE (:search IS NULL OR b.id LIKE CONCAT('%', :search, '%'))" +
                    " OR (:search IS NULL OR b.title LIKE CONCAT('%', :search, '%'))" +
                    " OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%'))" +
                    " OR (:search IS NULL OR u.name LIKE CONCAT('%', :search, '%'))" +
                    " OR (:search IS NULL OR u.username LIKE CONCAT('%', :search, '%'))" +
                    " AND (:status IS NULL OR b.status IN (:status, NULL))" +
                    " AND (b.status <> 'DELETE')" +
                    " AND (:userId IS NULL OR b.user_id = :userId)",
            nativeQuery = true
    )
    Page<Blog> getAllBlog(
            @Param("search") String search,
            @Param("status") String status,
            @Param("userId") String userId,
            Pageable pageable
    );

    Optional<Blog> findByIdAndStatus(String id, BlogStatus status);
}
