package com.example.backend.crawlData.service.careerlink;

import com.example.backend.crawlData.model.CareerLink;
import com.example.backend.crawlData.model.TimViec365;
import com.example.backend.crawlData.repository.CareerLinkRepository;
import com.example.backend.crawlData.repository.TimViec365Repository;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import java.time.ZoneId;
import java.time.Instant;

@Service
public class CareerLinkServiceImp implements CareerLinkService{
    @Autowired
    private CareerLinkRepository careerLinkRepository;

    @Override
    public ResponseEntity<?> crawlData() {
        List<CareerLink> jobList = new ArrayList<>();
        for (int page = 1; ; page++) {
            try {
                // Fetch HTML content from the URL with the incremented page number
                Document document = Jsoup.connect("https://www.careerlink.vn/vieclam/list?page=" + page).get();
                // Select the desired elements
                Elements imageElements = document.select("div.media div.rounded-lg img.rounded-lg");
                Elements titleElements = document.select("div.media a.job-link h5.job-name");
                Elements urlElements = document.select("div.media a.job-link");
                Elements nameComElements = document.select("div.media a.job-company");
                Elements jobLocalElements = document.select("div.media div.justify-content-between div.job-location a.text-reset");
                Elements jobTimeElements = document.select(".cl-datetime");
                Elements jobMoneyElements = document.select(".job-item .job-salary");
                Elements jobPostitionElements = document.select(".job-position");
                if (imageElements.isEmpty() && titleElements.isEmpty()){
                    break;
                }
                // Iterate through the elements and populate JobListing objects
                for (int i = 0; i < imageElements.size(); i++) {
                    CareerLink jobListing = new CareerLink();
                    jobListing.setImage(imageElements.get(i).attr("src"));
                    jobListing.setTitle(titleElements.get(i).text());
                    jobListing.setUrl("https://www.careerlink.vn/"+urlElements.get(i).attr("href"));
                    jobListing.setNameCom(nameComElements.get(i).text());
                    jobListing.setJobLocal(jobLocalElements.get(i).text());
                    jobListing.setJobMoney(jobMoneyElements.get(i).text());

                    String timestampString = jobTimeElements.get(i).attr("data-datetime");

                    long unixTimestamp = Long.parseLong(timestampString);
                    long timestampMillis = unixTimestamp * 1000;
                    LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(timestampMillis), ZoneId.systemDefault());
                    jobListing.setJobTime(localDateTime.toString());
                    jobListing.setJobPostition(jobPostitionElements.get(i).text());
                    jobList.add(jobListing);
                }
            } catch (IOException e) {
                e.printStackTrace();
                return new ResponseEntity<>("Error while fetching data.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        // Remove duplicates from jobList
        List<CareerLink> careerLinkRepositoryAll = careerLinkRepository.findAll();
        jobList.removeIf(job1 -> careerLinkRepositoryAll.stream()
                .anyMatch(job2 -> job1.getTitle().equals(job2.getTitle()) &&
                        job1.getNameCom().equals(job2.getNameCom()) &&
                        job1.getJobLocal().equals(job2.getJobLocal()) &&
                        job1.getJobTime().equals(job2.getJobTime()) &&
                        job1.getJobMoney().equals(job2.getJobMoney()) &&
                        job1.getUrl().equals(job2.getUrl()) &&
                        job1.getImage().equals(job2.getImage())));
        if (jobList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        careerLinkRepository.saveAll(jobList);
        return new ResponseEntity<>(jobList,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getDataCareerlink() {
        List<CareerLink> careerLinks = careerLinkRepository.findAll();
        if(careerLinks.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(careerLinks,HttpStatus.OK);
    }

}
