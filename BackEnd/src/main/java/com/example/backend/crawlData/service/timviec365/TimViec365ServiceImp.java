package com.example.backend.crawlData.service.timviec365;

import com.example.backend.crawlData.model.TimViec365;
import com.example.backend.crawlData.repository.TimViec365Repository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class TimViec365ServiceImp implements  TimViec365Service{
    @Autowired
    private TimViec365Repository timViec365Repository;
    @Override
    public ResponseEntity<?> crawlData() {
        try {
            // Fetch HTML content from the URL
            Document document = Jsoup.connect("https://timviec365.vn").get();

            // Create a list to store JobListing objects
            List<TimViec365> jobList = new ArrayList<>();

            // Select the desired elements
            Elements imageElements = document.select("div.in_vl div.img_item_vl a.logo_user_th img.tia_set");
            Elements titleElements = document.select("div.in_vl div.right_item_vl a.tit_vip");
            Elements urlElements = document.select("div.in_vl div.right_item_vl a.tit_vip");
            Elements nameComElements = document.select("div.in_vl div.right_item_vl a.name_com");
            Elements jobLocalElements = document.select("div.in_vl div.right_item_vl p.job_local");
            Elements jobTimeElements = document.select("div.in_vl div.right_item_vl p.job_time");
            Elements jobMoneyElements = document.select("div.in_vl div.right_item_vl p.job_money");

            // Iterate through the elements and populate JobListing objects
            for (int i = 0; i < imageElements.size(); i++) {
                TimViec365 jobListing = new TimViec365();
                jobListing.setImage("https://timviec365.vn/" + imageElements.get(i).attr("data-src"));
                jobListing.setTitle(titleElements.get(i).attr("title"));
                jobListing.setUrl("https://timviec365.vn/" + urlElements.get(i).attr("href"));
                jobListing.setNameCom(nameComElements.get(i).attr("title"));
                jobListing.setJobLocal(jobLocalElements.get(i).text());
                jobListing.setJobTime(jobTimeElements.get(i).text());
                jobListing.setJobMoney(jobMoneyElements.get(i).text());
                jobList.add(jobListing);
            }
            List<TimViec365> getTimViec365List= timViec365Repository.findAll();

            List<TimViec365> nonDuplicateJobs = new ArrayList<>(jobList);

            for (TimViec365 job1 : getTimViec365List) {
                nonDuplicateJobs.removeIf(job2 ->
                        job1.getTitle().equals(job2.getTitle()) &&
                                job1.getNameCom().equals(job2.getNameCom()) &&
                                job1.getJobLocal().equals(job2.getJobLocal()) &&
                                job1.getJobTime().equals(job2.getJobTime()) &&
                                job1.getJobMoney().equals(job2.getJobMoney()) &&
                                job1.getUrl().equals(job2.getUrl()) &&
                                job1.getImage().equals(job2.getImage())
                );
            }
            jobList = nonDuplicateJobs;
            if(jobList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            timViec365Repository.saveAll(jobList);
            return new ResponseEntity<>(jobList, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error while fetching data.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> getDataTimviec365() {
        List<TimViec365> timViec365List = timViec365Repository.findAll();
        if(timViec365List.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(timViec365List,HttpStatus.OK);
    }

}
