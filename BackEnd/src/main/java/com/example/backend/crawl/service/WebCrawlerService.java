package com.example.backend.crawl.service;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface WebCrawlerService {
    ResponseEntity<?> getData(Pageable pageable);

    ResponseEntity<?> getDataById(String id);
}
