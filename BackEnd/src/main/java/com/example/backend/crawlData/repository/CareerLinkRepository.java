package com.example.backend.crawlData.repository;

import com.example.backend.crawlData.model.CareerLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CareerLinkRepository extends JpaRepository<CareerLink, Long> {
}
