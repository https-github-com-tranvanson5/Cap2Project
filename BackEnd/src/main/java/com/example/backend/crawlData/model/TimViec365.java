package com.example.backend.crawlData.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TimViec365 {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String nameCom;
    private String jobLocal;
    private String jobTime;
    private String jobMoney;
    private String url;
    @Column(columnDefinition = "longtext")
    private String image;
}
