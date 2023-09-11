package com.example.backend.job.service.job;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.job.contains.JobStatus;
import com.example.backend.job.model.Category;
import com.example.backend.job.model.Job;
import com.example.backend.job.payload.request.CreateJobForm;
import com.example.backend.job.repository.CategoryRepository;
import com.example.backend.job.repository.JobRepository;
import com.example.backend.messageResponse.MessageResponse;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JobServiceimp implements JobService {
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public ResponseEntity<?> getAllDataListJob() {
        List<Job> jobs= jobRepository.findAll();
        if(jobs.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(jobs,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> createJob(CreateJobForm createJobForm) {
        MessageResponse response = new MessageResponse();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userRepository.getUserById(id);
        Job job = new Job();
        BeanUtils.copyProperties(createJobForm,job);
        job.setCreatedAt(LocalDateTime.now());
        job.setUser(user);
        if(!categoryRepository.existsById(createJobForm.getCategoryId())){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setTitle(HttpStatus.BAD_REQUEST.name());
            response.setMessage("Vui lòng chọn category");
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        Category category = categoryRepository.getById(createJobForm.getCategoryId());
        job.setCategory(category);
        switch (createJobForm.getStatus()){
            case "pending": job.setStatus(JobStatus.PENDING); break;
            case "allow": job.setStatus(JobStatus.ALLOW); break;
            default:
                job.setStatus(JobStatus.DO_NOT_ALLOW); break;
        }

        jobRepository.save(job);
        response.setCode(HttpStatus.OK.value());
        response.setTitle(HttpStatus.OK.name());
        response.setMessage("Đã tạo thành công");
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateJob(CreateJobForm createJobForm, long id) {
        MessageResponse response = new MessageResponse();
        Job job = jobRepository.getById(id);
        BeanUtils.copyProperties(createJobForm,job);
        if(!categoryRepository.existsById(createJobForm.getCategoryId())){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setTitle(HttpStatus.BAD_REQUEST.name());
            response.setMessage("Vui lòng chọn category");
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        Optional<Category> category = categoryRepository.findById(createJobForm.getCategoryId());
        job.setCategory(category.get());
        switch (createJobForm.getStatus()){
            case "pending": job.setStatus(JobStatus.PENDING); break;
            case "allow": job.setStatus(JobStatus.ALLOW); break;
            default:
                job.setStatus(JobStatus.DO_NOT_ALLOW); break;
        }

        jobRepository.save(job);
        response.setCode(HttpStatus.OK.value());
        response.setTitle(HttpStatus.OK.name());
        response.setMessage("Đã update thành công");
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> changStatusJob(long id, String status) {
        MessageResponse response = new MessageResponse();
        if(!jobRepository.existsById(id)){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setTitle(HttpStatus.BAD_REQUEST.name());
            response.setMessage("Job không tồn tại");
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        Job job= jobRepository.getById(id);
        switch (status){
            case "pending": job.setStatus(JobStatus.PENDING);break;
            case "allow": job.setStatus(JobStatus.ALLOW);break;
            case "do_not_allow": job.setStatus(JobStatus.DO_NOT_ALLOW);break;
            case "delete": job.setStatus(JobStatus.DELETE);break;
            default:
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setTitle(HttpStatus.BAD_REQUEST.name());
                response.setMessage("Lỗi status không hợp lệ");
                return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        jobRepository.save(job);
        response.setCode(HttpStatus.OK.value());
        response.setTitle(HttpStatus.OK.name());
        response.setMessage("Thay đổi status thành công");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getDataJobById(long id) {
        MessageResponse response = new MessageResponse();
        if(!jobRepository.existsById(id)){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setTitle(HttpStatus.BAD_REQUEST.name());
            response.setMessage("Job không tồn tại");
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        Job job= jobRepository.findById(id).get();
        return new ResponseEntity<>(job,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getDataJobByStatus(String status) {
        MessageResponse response = new MessageResponse();
        JobStatus jobStatus;
        switch (status){
            case "pending": jobStatus = JobStatus.PENDING;break;
            case "allow": jobStatus = JobStatus.ALLOW;break;
            case "do_not_allow": jobStatus = JobStatus.DO_NOT_ALLOW;break;
            case "delete": jobStatus = JobStatus.DELETE;break;
            default:
                response.setCode(HttpStatus.BAD_REQUEST.value());
                response.setTitle(HttpStatus.BAD_REQUEST.name());
                response.setMessage("Lỗi status không hợp lệ");
                return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        if(!jobRepository.existsByStatus(jobStatus)){
            response.setCode(HttpStatus.BAD_REQUEST.value());
            response.setTitle(HttpStatus.BAD_REQUEST.name());
            response.setMessage("Job không tồn tại");
            return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
        }
        List<Job> jobs= jobRepository.findByStatus(jobStatus);
        return new ResponseEntity<>(jobs,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getAllJobUser() {
        List<Job> jobs= jobRepository.findByStatus(JobStatus.ALLOW);
        if(jobs.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(jobs,HttpStatus.OK);
    }
}
