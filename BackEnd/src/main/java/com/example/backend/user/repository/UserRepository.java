package com.example.backend.user.repository;

import com.example.backend.user.constain.UserStatus;
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
public interface UserRepository extends JpaRepository<User, String> {
        Optional<User> findByUsername(String username);

        boolean existsByEmail(String email);

        boolean existsByUsername(String username);

        @Query(value = "SELECT DISTINCT u.* FROM user u " +
                "LEFT JOIN user_role ur ON u.id = ur.user_id " +
                "LEFT JOIN role r ON ur.role_id = r.id " +
                "WHERE " +
                "(:roleString IS NULL OR r.name = :roleString) AND " +
                "(:search IS NULL OR " +
                "u.id LIKE CONCAT(:search, '%') OR " +
                "u.name LIKE CONCAT('%', :search, '%') OR " +
                "u.gender LIKE CONCAT(:search, '%') OR " +
                "u.email LIKE CONCAT(:search, '%') OR " +
                "u.username LIKE CONCAT(:search, '%') OR " +
                "u.phone LIKE CONCAT(:search, '%') OR " +
                "u.id_card LIKE CONCAT(:search, '%') OR " +
                "u.address LIKE CONCAT('%', :search, '%')) AND " +
                "(:statusString IS NULL OR u.status = :statusString) ",
                countQuery = "SELECT count(DISTINCT u.id) FROM user u " +
                        "LEFT JOIN user_role ur ON u.id = ur.user_id " +
                        "LEFT JOIN role r ON ur.role_id = r.id " +
                        "WHERE " +
                        "(:roleString IS NULL OR r.name = :roleString) AND " +
                        "(:search IS NULL OR " +
                        "u.id LIKE CONCAT(:search, '%') OR " +
                        "u.name LIKE CONCAT('%', :search, '%') OR " +
                        "u.gender LIKE CONCAT(:search, '%') OR " +
                        "u.email LIKE CONCAT(:search, '%') OR " +
                        "u.username LIKE CONCAT(:search, '%') OR " +
                        "u.phone LIKE CONCAT(:search, '%') OR " +
                        "u.id_card LIKE CONCAT(:search, '%') OR " +
                        "u.address LIKE CONCAT('%', :search, '%')) AND " +
                        "(:statusString IS NULL OR u.status = :statusString)",
                nativeQuery = true)
        Page<User> getDataUser(@Param("search") String search, @Param("statusString") String statusString,
                               @Param("roleString") String roleString, Pageable pageable);

        @Query(value = "SELECT MONTH(u.create_at) as month, COUNT(u.id) as userCount FROM User u WHERE YEAR(u.create_at) = :year AND (:status IS NULL OR u.status=:status) GROUP BY MONTH(u.create_at)", nativeQuery = true)
        List<Object[]> countUsersMonth(@Param("year") int year, @Param("status") String status);
        @Query(value = "select user.status, count(id) from user where user.status= :userStatus", nativeQuery = true)
        List<Object[]> countUserByStatus(@Param("userStatus") String userStatus);

        @Query(value = "SELECT YEAR(u.create_at) as year, CAST(COUNT(u.id) AS UNSIGNED) as userCount FROM User u WHERE (:statusString IS NULL OR u.status = :statusString) GROUP BY YEAR(u.create_at)", nativeQuery = true)
        List<Object[]> countUsersYear(@Param("statusString") String statusString);

        User getByEmail(String email);

        Optional<User> findByEmail(String email);

        @Query(value = "SELECT MIN(EXTRACT(YEAR FROM u.create_at)) AS min_year, MAX(EXTRACT(YEAR FROM u.create_at)) AS max_year FROM User u", nativeQuery = true)
        List<Object[]> getMinMaxYear();

        long countByStatus(UserStatus status);

        @Query(value = "SELECT r.name AS role, COUNT(u.id) AS user_count " +
                "FROM User u " +
                "JOIN user_role ur ON u.id = ur.user_id " +
                "JOIN role r ON ur.role_id = r.id " +
                "WHERE (:year IS NULL OR year(u.create_at) = :year) " +
                "AND (:status IS NULL OR u.status = :status) " + // Use u.status.name()
                "GROUP BY r.name", nativeQuery = true)
        List<Object[]> countUserRole(@Param("year") Integer year, @Param("status") String status);

}