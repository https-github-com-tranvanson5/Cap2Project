package com.example.backend.cv.reponsitory;

import com.example.backend.cv.model.Active;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveRepositorty extends JpaRepository<Active,Long> {
}
