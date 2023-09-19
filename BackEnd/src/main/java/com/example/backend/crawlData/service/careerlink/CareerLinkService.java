package com.example.backend.crawlData.service.careerlink;

import org.springframework.http.ResponseEntity;


public interface CareerLinkService {
    ResponseEntity<?> crawlData();

    ResponseEntity<?> getDataCareerlink();
}
