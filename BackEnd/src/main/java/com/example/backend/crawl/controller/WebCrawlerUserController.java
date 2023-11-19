package com.example.backend.crawl.controller;

import com.example.backend.crawl.service.WebCrawlerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/job/WebCrawler")
@CrossOrigin(origins = "*")
public class WebCrawlerUserController {
    @Autowired
    private WebCrawlerService webCrawlerService;
    @GetMapping("/getData")
    public ResponseEntity<?> getData(@PageableDefault Pageable pageable){
        return webCrawlerService.getData(pageable);
    }
    @GetMapping("/getDataById")
    public ResponseEntity<?> getDataById(@RequestParam String id){
        return webCrawlerService.getDataById(id);
    }
}
