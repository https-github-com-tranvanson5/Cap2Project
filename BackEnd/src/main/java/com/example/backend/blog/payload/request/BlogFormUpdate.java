package com.example.backend.blog.payload.request;

import lombok.Data;

@Data
public class BlogFormUpdate {
    private String id;
    private String title;
    private String content;
    private String author;
    private String imageUrl;
}
