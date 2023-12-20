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

        @Query(value = "SELECT COUNT(*) AS blogCount, YEAR(blog.created_at) AS year " +
                "FROM blog " +
                "LEFT JOIN user ON user.id = blog.user_id " +
                "LEFT JOIN user_role ON user_role.user_id = user.id " +
                "LEFT JOIN role ON user_role.role_id = role.id " +
                "WHERE (:year IS NULL OR YEAR(blog.created_at) = :year) " +
                "  AND (:statusString IS NULL OR blog.status = :statusString) " +
                "  AND (:roleString IS NULL OR role.name = :roleString) " +
                "GROUP BY year", nativeQuery = true)
        List<Object[]> countBlogYear(@Param("statusString") String statusString, @Param("year") Integer year, @Param("roleString") String roleString);



        @Query(value = "SELECT b.user_id, u.username, u.name, COUNT(b.id) AS blogCount FROM BLOG b " +
                        "JOIN user u ON u.id = b.user_id " +
                        "WHERE (:statusString IS NULL OR b.status = :statusString) " +
                        "GROUP BY b.user_id ORDER BY blogCount DESC " +
                "LIMIT :limit", nativeQuery = true)
        List<Object[]> rankTopBlog(@Param("limit") Integer limit, @Param("statusString") String statusString);
        @Query(value = "SELECT MIN(EXTRACT(YEAR FROM u.created_at)) AS min_year, MAX(EXTRACT(YEAR FROM u.created_at)) AS max_year FROM blog u", nativeQuery = true)
        List<Object[]> getMinMaxYear();
}
