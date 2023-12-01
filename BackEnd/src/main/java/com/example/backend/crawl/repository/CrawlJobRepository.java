package com.example.backend.crawl.repository;

import com.example.backend.crawl.model.CrawlJob;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CrawlJobRepository extends JpaRepository<CrawlJob, String> {
    Boolean existsByWebUrl(String url);
    @Query(value = "SELECT * FROM crawl_job " +
            "WHERE (:id IS NULL OR id = :id) " +
            "OR (:title IS NULL OR title LIKE %:title%) " +
            "OR (:career IS NULL OR career LIKE %:career%) " +
            "OR (:address IS NULL OR address LIKE %:address%) " +
            "OR (:company IS NULL OR company LIKE %:company%)",
            countQuery = "SELECT count(*) FROM crawl_job " +
                    "WHERE (:id IS NULL OR id = :id) " +
                    "OR (:title IS NULL OR title LIKE %:title%) " +
                    "OR (:career IS NULL OR career LIKE %:career%) " +
                    "OR (:address IS NULL OR address LIKE %:address%) " +
                    "OR (:company IS NULL OR company LIKE %:company%)",
            nativeQuery = true)
    Page<CrawlJob> customCrawlSearch(
            @Param("id") String id,
            @Param("title") String title,
            @Param("career") String career,
            @Param("address") String address,
            @Param("company") String company,
            Pageable pageable
    );
}
