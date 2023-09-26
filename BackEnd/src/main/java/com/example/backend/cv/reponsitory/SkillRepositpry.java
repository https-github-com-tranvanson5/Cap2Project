package com.example.backend.cv.reponsitory;

import com.example.backend.cv.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepositpry extends JpaRepository<Skill, Long> {
}
