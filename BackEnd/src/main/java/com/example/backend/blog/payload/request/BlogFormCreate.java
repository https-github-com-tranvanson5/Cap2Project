package com.example.backend.blog.payload.request;

import lombok.Data;

import javax.persistence.Column;

@Data
public class BlogFormCreate {
    private String title;
    private String content;
    private String author;
    private String imageUrl;
}
