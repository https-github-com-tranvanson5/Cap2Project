package com.example.backend.crawlData.repository;

import com.example.backend.crawlData.model.TimViec365;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimViec365Repository extends JpaRepository<TimViec365, Long> {

}
