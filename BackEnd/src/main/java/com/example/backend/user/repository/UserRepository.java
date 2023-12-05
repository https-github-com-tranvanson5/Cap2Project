package com.example.backend.user.repository;

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
public interface UserRepository extends JpaRepository<User,String> {
    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

    @Query(value = "SELECT * FROM user WHERE " +
            "(:search IS NULL or(user.id like CONCAT(:search,'%') " +
            "or user.name like CONCAT('%',:search,'%') " +
            "or user.gender like CONCAT(:search) " +
            "or user.email like CONCAT(:search,'%') " +
            "or user.username like CONCAT(:search,'%') " +
            "or user.phone like CONCAT(:search,'%') " +
            "or user.id_card like CONCAT(:search,'%') " +
            "or user.phone like CONCAT(:search,'%') " +
            "or user.address like CONCAT('%',:search,'%') ) )",
            countQuery = "SELECT count(*) FROM ( " +
                    "SELECT * FROM user WHERE " +
                    "(:search IS NULL or (user.id like CONCAT(:search,'%') " +
                    "or user.name like CONCAT('%',:search,'%') " +
                    "or user.gender like CONCAT(:search) " +
                    "or user.email like CONCAT(:search,'%') " +
                    "or user.username like CONCAT(:search,'%') " +
                    "or user.phone like CONCAT(:search,'%') " +
                    "or user.id_card like CONCAT(:search,'%') " +
                    "or user.phone like CONCAT(:search,'%') " +
                    "or user.address like CONCAT('%',:search,'%') " +
                    ") ) ) AS user_table",
            nativeQuery = true)
    Page<User> getDataUser(String search, Pageable pageable);

    @Query(value = "SELECT MONTH(u.create_at) as month, COUNT(u.id) as userCount FROM User u WHERE YEAR(u.create_at) = :year AND (:status IS NULL OR u.status=:status) GROUP BY MONTH(u.create_at)", nativeQuery = true)
    List<Object[]> countUsersMonth(@Param("year") int year, @Param("status") String status);

    @Query(value = "select user.status, count(id) from user where user.status= :userStatus", nativeQuery = true)
    List<Object[]> countUserByStatus(@Param("userStatus") String userStatus);
    @Query(value = "SELECT YEAR (u.createAt) as month, COUNT(u.id) as userCount FROM User u GROUP BY YEAR (u.createAt) ")
    List<Object[]> countUsersYear();

    User getByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT MIN(EXTRACT(YEAR FROM u.create_at)) AS min_year, MAX(EXTRACT(YEAR FROM u.create_at)) AS max_year FROM User u", nativeQuery = true)
    List<Object[]> getMinMaxYear();
}
