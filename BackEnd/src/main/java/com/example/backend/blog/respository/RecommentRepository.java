package com.example.backend.blog.respository;

import com.example.backend.blog.model.Recomment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommentRepository extends JpaRepository<Recomment,String> {
}
