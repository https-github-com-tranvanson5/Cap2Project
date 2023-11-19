package com.example.backend.cv.repository;

import com.example.backend.cv.constain.CvStatus;
import com.example.backend.cv.model.Cv;
import com.example.backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CvRepository extends JpaRepository<Cv,String> {
    Optional<Cv> findByIdAndUser(String id, User user);
    Optional<Cv> findByUser(User user);
    Optional<Cv> findByUserAndStatus(User user, CvStatus status);
}
