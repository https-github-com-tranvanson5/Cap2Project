package com.example.backend.blog.payload.request;

import com.example.backend.blog.constain.BlogStatus;
import com.example.backend.blog.model.Image;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class BlogCreate {
    private String title;
    private String content;
    private List<Image> images = new ArrayList<>();
}

