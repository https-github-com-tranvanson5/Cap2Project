package com.example.backend.crawl.service.admin;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface WebCrawlerService {
    ResponseEntity<?> getData(String search, Pageable pageable);

    ResponseEntity<?> getDataDetail(String id);
}
