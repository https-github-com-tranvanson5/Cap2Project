package com.example.backend.crawlData.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class CareerLink {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String image;
    private String title;
    private String url;
    private String nameCom;
    private String jobLocal;
    private String jobMoney;
    private String jobTime;
    private String jobPostition;

}
