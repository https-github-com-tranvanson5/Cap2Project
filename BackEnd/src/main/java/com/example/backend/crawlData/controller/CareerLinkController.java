package com.example.backend.crawlData.controller;

import com.example.backend.crawlData.service.careerlink.CareerLinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/crawl/careerlink")
@CrossOrigin(origins = "*")
@Component
public class CareerLinkController {
    @Autowired
    private CareerLinkService careerLinkService;
    @GetMapping("/crawl")
    @Scheduled(fixedRate = 10000)
    public ResponseEntity<?> crawl() throws IOException {
        return careerLinkService.crawlData();
    }
    @GetMapping("/getDataCareerlink")
    public ResponseEntity<?> getDataCareerlink(){
        return careerLinkService.getDataCareerlink();
    }
}
