package com.example.backend.cv.reponsitory;

import com.example.backend.cv.model.Reference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReferenceRepository extends JpaRepository<Reference,Reference> {
}