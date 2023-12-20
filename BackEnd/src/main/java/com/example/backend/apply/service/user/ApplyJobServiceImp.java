package com.example.backend.apply.service.user;

import com.example.backend.apply.constain.ApplyStatus;
import com.example.backend.apply.model.ApplyJob;
import com.example.backend.apply.payload.request.ApplyJobForm;
import com.example.backend.apply.repository.ApplyJobRepository;
import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.cv.model.Cv;
import com.example.backend.cv.repository.CvRepository;
import com.example.backend.job.constain.JobStatus;
import com.example.backend.job.model.Job;
import com.example.backend.job.repository.JobRepository;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplyJobServiceImp implements ApplyJobService {
    @Autowired
    private ApplyJobRepository applyJobRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public ResponseEntity<?> applyJob(ApplyJobForm applyJobForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();

        ApplyJob apply = new ApplyJob();
        String jobId = applyJobForm.getJobId();
        Optional<Job> jobOptional = jobRepository.findById(jobId);
        List<ApplyJob> existingApplications = applyJobRepository.findByUserIdApplyAndJobId(idUser, applyJobForm.getJobId());
        apply.setTitle(applyJobForm.getTitle());
        apply.setName(applyJobForm.getName());
        apply.setPhone(applyJobForm.getPhone());
        apply.setEmail(applyJobForm.getEmail());
        for (ApplyJob existingApplication : existingApplications) {
            if (existingApplication.getStatus() == ApplyStatus.PENDING) {
                return new ResponseEntity<>("Bạn đã có đơn đăng ký job này đang chờ xử lý", HttpStatus.NOT_ACCEPTABLE);
            };
        };
        if (jobOptional.isEmpty()){
            return new ResponseEntity<>("Lỗi job không tồn tại",HttpStatus.BAD_REQUEST);
        }
        Job job = jobOptional.get();
        if (job.getJobStatus() == JobStatus.BLOCK || job.getJobStatus() == JobStatus.DELETE) {
            return new ResponseEntity<>("Lỗi job không tồn tại",HttpStatus.NOT_ACCEPTABLE);
        }

        if (idUser.isEmpty()) {
            return new ResponseEntity<>("Lỗi user không tồn tại",HttpStatus.BAD_REQUEST);
        }
        apply.setJob(job);

        apply.setUrlCv(applyJobForm.getUrlCv());
        if (applyJobForm.getCvId() != null && !applyJobForm.getCvId().isEmpty()) {
            Optional<Cv> optionalCv = cvRepository.findById(applyJobForm.getCvId());
            if (optionalCv.isEmpty()) {
                return new ResponseEntity<>("Lỗi cv không tồn tại", HttpStatus.BAD_REQUEST);
            }
            apply.setCvId(optionalCv.get().getId());
        }
        apply.setCreateAt(LocalDateTime.now());
        apply.setStatus(ApplyStatus.PENDING);
        apply.setUserIdApply(idUser);

        applyJobRepository.save(apply);
        return ResponseEntity.ok("apply thành công");
    }

    @Override
    public ResponseEntity<?> getDataJobApplyJob(String search, ApplyStatus status, Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
        String statusString = (status != null ? status.toString() : null);
        Page<ApplyJob> applyJobPageable= applyJobRepository.findByUserIdAndSearch(idUser,search,statusString,pageable);
        return new ResponseEntity<>(applyJobPageable,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> cancleApply(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
        Optional<User> optionalUser = userRepository.findById(idUser);
        if (!optionalUser.isPresent()) {
            return new ResponseEntity<>("Người dùng không tồn tại", HttpStatus.BAD_REQUEST);
        }
        Optional<ApplyJob> optionalApplyJob = applyJobRepository.findByIdAndUserIdApply(id,optionalUser.get().getId());
        ApplyJob applyJob= optionalApplyJob.get();
        if (applyJob.getStatus()==ApplyStatus.CANCEL || applyJob.getStatus()==ApplyStatus.SUCCESS){
            return new ResponseEntity<>("Không thể thay đổi trạng thái", HttpStatus.BAD_REQUEST);
        }
        applyJob.setStatus(ApplyStatus.CANCEL);
        applyJobRepository.save(applyJob);
        return new ResponseEntity<>("Đã huỷ bỏ thành công", HttpStatus.OK);
    }



}

