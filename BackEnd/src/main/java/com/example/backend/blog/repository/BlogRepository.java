package com.example.backend.blog.repository;

import com.example.backend.blog.model.Blog;
import com.example.backend.user.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, String> {
    Optional<Blog> findByIdAndUser(String id, User user);

    @Query(value = "SELECT * FROM blog b " +
            "JOIN user u ON u.id = b.user_id " +
            "WHERE (:userId IS NULL OR b.user_id = :userId) " +
            "AND( (:search IS NULL OR b.id LIKE CONCAT(:search, '%')) " +
            "OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%')) " +
            "OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%')) " +
            "OR (:search IS NULL OR u.id LIKE CONCAT(:search, '%')) " +
            "OR (:search IS NULL OR u.name LIKE CONCAT('%', :search, '%')) " +
            "OR (:search IS NULL OR u.username LIKE CONCAT(:search, '%')) " +
            "AND (:status IS NULL OR b.status = :status))" +
            "ORDER BY create_at DESC", countQuery = "SELECT count(*) FROM blog b " +
            "JOIN user u ON u.id = b.user_id " +
            "WHERE (:userId IS NULL OR b.user_id = :userId) " +
            "AND ((:search IS NULL OR b.id LIKE CONCAT(:search, '%')) " +
            "OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%')) " +
            "OR (:search IS NULL OR b.content LIKE CONCAT('%', :search, '%')) " +
            "OR (:search IS NULL OR u.id LIKE CONCAT(:search, '%')) " +
            "OR (:search IS NULL OR u.name LIKE CONCAT('%', :search, '%')) " +
            "OR (:search IS NULL OR u.username LIKE CONCAT(:search, '%')) " +
            "AND (:status IS NULL OR b.status = :status))" +
            "ORDER BY create_at DESC", nativeQuery = true)
    Page<Blog> findAllBlog(@Param("search") String search, @Param("status") String status,
                           @Param("userId") String userId, Pageable pageable);

    @Query(value = "SELECT count(*) FROM blog WHERE (:statusString IS NULL OR blog.status = :statusString)", nativeQuery = true)
    Integer countBlog(@Param("statusString") String statusString);

    @Query(value = "SELECT COUNT(blog.id) AS count, MONTH(blog.created_at) AS month "
            + "FROM blog "
            + "WHERE (:statusString IS NULL OR blog.status = :statusString) AND YEAR(blog.created_at) = :year "
            + "GROUP BY MONTH(blog.created_at)", nativeQuery = true)
    List<Object[]> countBlogMonth(@Param("statusString") String statusString, @Param("year") Integer year);

    @Query(value = "SELECT MIN(YEAR(blog.created_at)) AS minYear, MAX(YEAR(blog.created_at)) AS maxYear "
            + "FROM blog", nativeQuery = true)
    List<Object[]> yearMinMax();

    @Query(value = "SELECT COUNT(*) AS blogCount, YEAR(blog.created_at) AS year FROM blog WHERE (:statusString IS NULL OR blog.status = :statusString) GROUP BY year", nativeQuery = true)
    List<Object[]> countBlogYear(@Param("statusString") String statusString);


}
