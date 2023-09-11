package com.example.backend.crawlData.controller;

import com.example.backend.crawlData.model.TimViec365;
import com.example.backend.crawlData.service.timviec365.TimViec365Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/crawl/timviec365")
@CrossOrigin(origins = "*")
public class crawlerTimViec365Controller {
    @Autowired
    private TimViec365Service timViec365Service;
    @GetMapping("/crawl/")
    public ResponseEntity<?> crawl() throws IOException {
        return timViec365Service.crawlData();
    }
}
