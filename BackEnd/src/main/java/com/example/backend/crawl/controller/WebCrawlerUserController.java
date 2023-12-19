package com.example.backend.crawl.controller;

import com.example.backend.crawl.service.admin.WebCrawlerService;
import com.example.backend.cv.payload.request.CreateCvForm;
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
    public ResponseEntity<?> getData(@RequestParam(required = false) String search,@PageableDefault Pageable pageable){
        return webCrawlerService.getData(search,pageable);
    }
    @GetMapping("/getDataDetail")
    public ResponseEntity<?> getDataDetail(@RequestParam String id){
        return webCrawlerService.getDataDetail(id);
    }
}
