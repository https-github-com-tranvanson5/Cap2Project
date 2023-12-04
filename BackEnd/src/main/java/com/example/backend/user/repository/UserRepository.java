package com.example.backend.user.repository;

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
public interface UserRepository extends JpaRepository<User, String> {
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
                        "or user.address like CONCAT('%',:search,'%') ) )", countQuery = "SELECT count(*) FROM ( " +
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
                                        ") ) ) AS user_table", nativeQuery = true)
        Page<User> getDataUser(String search, Pageable pageable);

        @Query(value = "SELECT MONTH(u.create_at) as month, COUNT(u.id) as userCount FROM User u WHERE YEAR(u.create_at) = :year AND (:statusString is null or u.status=:statusString) GROUP BY MONTH(u.create_at) ", nativeQuery = true)
        List<Object[]> countUsersMonth(@Param("year") int year, @Param("statusString") String statusString);

        @Query(value = "select user.status, count(id) from user where user.status= :userStatus", nativeQuery = true)
        List<Object[]> countUserByStatus(@Param("userStatus") String userStatus);

        @Query(value = "SELECT YEAR(u.create_at) as year, COUNT(u.id) as userCount FROM User u WHERE (:statusString IS NULL OR u.status = :statusString) GROUP BY YEAR(u.create_at)", nativeQuery = true)
        List<Object[]> countUsersYear(@Param("statusString") String statusString);

        User getByEmail(String email);

        Optional<User> findByEmail(String email);

        @Query(value = "SELECT" +
                        "  MIN(YEAR(create_at)) AS min_year," +
                        "  MAX(YEAR(create_at)) AS max_year " + // Added a space here
                        "FROM user", nativeQuery = true)
        Optional<Map<String, Object>> getMinMaxYear();

        @Query(value = "SELECT role_id, COUNT(user_id) " +
                        "FROM user " +
                        "JOIN user_role ON user.id = user_role.user_id " +
                        "WHERE (:roleString IS NULL OR role_id = :roleString) " +
                        "AND (:statusString IS NULL OR status = :statusString) " +
                        "GROUP BY role_id", nativeQuery = true)
        List<Object[]> countRoleByRoleId(@Param("roleString") String roleString,
                        @Param("statusString") String statusString);

}
