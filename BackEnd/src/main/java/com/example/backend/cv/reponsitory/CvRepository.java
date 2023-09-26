package com.example.backend.cv.reponsitory;

import com.example.backend.cv.model.CurriculumVitae;
import com.example.backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CvRepository extends JpaRepository<CurriculumVitae, Long> {
    CurriculumVitae findByIdAndUser(Long idCv, User user);
}
