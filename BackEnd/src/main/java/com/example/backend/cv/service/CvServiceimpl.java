package com.example.backend.cv.service;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.cv.model.*;
import com.example.backend.cv.payload.request.CurriculumVitaeCreateForm;
import com.example.backend.cv.reponsitory.*;
import com.example.backend.messageResponse.MessageResponse;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import com.mysql.cj.x.protobuf.Mysqlx;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.example.backend.cv.contains.CvStatus.ACTIVE;
import static com.example.backend.cv.contains.CvStatus.DELETED;

@Service
public class CvServiceimpl implements CvService{
    @Autowired
    private CvRepository cvRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SkillRepositpry skillRepositpry;
    @Autowired
    private CertificationRepository certificationRepository;
    @Autowired
    private WorkExperiencesRepository workExperiencesRepository;
    @Autowired
    private EducationRepository educationRepository;
    @Autowired
    private ActiveRepositorty activeRepositorty;
    @Autowired
    private ReferenceRepository referenceRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Override
    public ResponseEntity<?> getCV() {
        List<CurriculumVitae> curriculumVitaes = cvRepository.findAll();
        return new ResponseEntity<>(curriculumVitaes, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> createCvByUser(CurriculumVitaeCreateForm curriculumVitaeCreateForm) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userRepository.getUserById(id);

        CurriculumVitae curriculumVitae= new CurriculumVitae();
        curriculumVitae.setName(curriculumVitaeCreateForm.getName());
        curriculumVitae.setDob(curriculumVitaeCreateForm.getDob());
        curriculumVitae.setPhone(curriculumVitaeCreateForm.getPhone());
        curriculumVitae.setEmail(curriculumVitaeCreateForm.getEmail());
        curriculumVitae.setLinkWebsite(curriculumVitaeCreateForm.getLinkWebsite());
        curriculumVitae.setAddress(curriculumVitaeCreateForm.getAddress());
        curriculumVitae.setImage(curriculumVitaeCreateForm.getImage());
        curriculumVitae.setObjective(curriculumVitaeCreateForm.getObjective());
        curriculumVitae.setPosition(curriculumVitaeCreateForm.getPosition());
        //         Kĩ năng
        if (curriculumVitaeCreateForm.getSkills()!=null){
            List<Skill> skills= skillRepositpry.saveAll(curriculumVitaeCreateForm.getSkills());
            curriculumVitae.setSkills(skills);
        }
        //         Chứng chỉ
        if(curriculumVitaeCreateForm.getCertifications()!=null){
            List<Certification> certifications = certificationRepository.saveAll(curriculumVitaeCreateForm.getCertifications()) ;
            curriculumVitae.setCertifications(certifications);
        }
        //         Kinh nghiệm
        if(curriculumVitaeCreateForm.getWorkExperiences()!=null){
            List<WorkExperience> workExperiences= workExperiencesRepository.saveAll(curriculumVitaeCreateForm.getWorkExperiences());
            curriculumVitae.setWorkExperiences(workExperiences);
        }
      //        học vấn

        if(curriculumVitaeCreateForm.getEducatuions()!=null){
            List<Education> educations = educationRepository.saveAll(curriculumVitaeCreateForm.getEducatuions());
            curriculumVitae.setEducations(educations);
        }
        //        hoạt động
        if(curriculumVitaeCreateForm.getActives()!=null){
            List<Active> actives =activeRepositorty.saveAll(curriculumVitaeCreateForm.getActives());
            curriculumVitae.setActives(actives);
        }
        //        người đối chiếu
        if(curriculumVitaeCreateForm.getReferences()!=null){
            List<Reference> references= referenceRepository.saveAll(curriculumVitaeCreateForm.getReferences());
            curriculumVitae.setReferences(references);
        }
        //         dự án
        if(curriculumVitaeCreateForm.getProjects()!=null){
            List<Project> projects= projectRepository.saveAll(curriculumVitaeCreateForm.getProjects());
            curriculumVitae.setProjects(projects);
        }
        curriculumVitae.setCreateAt(LocalDateTime.now());
        curriculumVitae.setStatus(ACTIVE);


        curriculumVitae.setUser(user);
        cvRepository.save(curriculumVitae);
        MessageResponse messageResponse= new MessageResponse();
        messageResponse.setCode(200);
        messageResponse.setTitle("Thành công");
        messageResponse.setMessage("Đã tạo CV thành công");
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateCvByUser(CurriculumVitaeCreateForm curriculumVitaeCreateForm, Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userRepository.getUserById(idUser);
        Long idCv= id;
        CurriculumVitae curriculumVitae = cvRepository.findByIdAndUser(idCv,user);
        if(curriculumVitae==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        curriculumVitae.setName(curriculumVitaeCreateForm.getName());
        curriculumVitae.setDob(curriculumVitaeCreateForm.getDob());
        curriculumVitae.setPhone(curriculumVitaeCreateForm.getPhone());
        curriculumVitae.setEmail(curriculumVitaeCreateForm.getEmail());
        curriculumVitae.setLinkWebsite(curriculumVitaeCreateForm.getLinkWebsite());
        curriculumVitae.setAddress(curriculumVitaeCreateForm.getAddress());
        curriculumVitae.setImage(curriculumVitaeCreateForm.getImage());
        curriculumVitae.setObjective(curriculumVitaeCreateForm.getObjective());
        curriculumVitae.setPosition(curriculumVitaeCreateForm.getPosition());
        //         Kĩ năng
        curriculumVitae.getSkills().clear();
        if (curriculumVitaeCreateForm.getSkills()!=null){
            List<Skill> skills= skillRepositpry.saveAll(curriculumVitaeCreateForm.getSkills());
            curriculumVitae.setSkills(skills);
        }
        //         Chứng chỉ
        curriculumVitae.getCertifications().clear();
        if(curriculumVitaeCreateForm.getCertifications()!=null){
            List<Certification> certifications = certificationRepository.saveAll(curriculumVitaeCreateForm.getCertifications()) ;
            curriculumVitae.setCertifications(certifications);
        }
        curriculumVitae.getWorkExperiences().clear();
        //         Kinh nghiệm
        if(curriculumVitaeCreateForm.getWorkExperiences()!=null){
            List<WorkExperience> workExperiences= workExperiencesRepository.saveAll(curriculumVitaeCreateForm.getWorkExperiences());
            curriculumVitae.setWorkExperiences(workExperiences);
        }
        //        học vấn
        curriculumVitae.getEducations().clear();
        if(curriculumVitaeCreateForm.getEducatuions()!=null){
            List<Education> educations = educationRepository.saveAll(curriculumVitaeCreateForm.getEducatuions());
            curriculumVitae.setEducations(educations);
        }
        //        hoạt động
        curriculumVitae.getActives().clear();
        if(curriculumVitaeCreateForm.getActives()!=null){
            List<Active> actives =activeRepositorty.saveAll(curriculumVitaeCreateForm.getActives());
            curriculumVitae.setActives(actives);
        }
        //        người đối chiếu
        curriculumVitae.getReferences().clear();
        if(curriculumVitaeCreateForm.getReferences()!=null){
            List<Reference> references= referenceRepository.saveAll(curriculumVitaeCreateForm.getReferences());
            curriculumVitae.setReferences(references);
        }
        //         dự án
        curriculumVitae.getProjects().clear();
        if(curriculumVitaeCreateForm.getProjects()!=null){
            List<Project> projects= projectRepository.saveAll(curriculumVitaeCreateForm.getProjects());
            curriculumVitae.setProjects(projects);
        }
        cvRepository.save(curriculumVitae);
        MessageResponse messageResponse= new MessageResponse();
        messageResponse.setCode(200);
        messageResponse.setTitle("Thành công");
        messageResponse.setMessage("Đã update thành công");
        return new ResponseEntity<>(messageResponse, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getAllCvByUser() {
        List<CurriculumVitae> curriculumVitaes= cvRepository.findAll();
        if (curriculumVitaes==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(curriculumVitaes,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getCvbyIdbyUser(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userRepository.getUserById(idUser);
        Long idCv= id;
        CurriculumVitae curriculumVitae = cvRepository.findByIdAndUser(idCv,user);
        if (curriculumVitae==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(curriculumVitae,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> deleteCvbyIdbyUser(Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String idUser = ((UserPrinciple) authentication.getPrincipal()).getId();
        User user= userRepository.getUserById(idUser);
        Long idCv= id;
        CurriculumVitae curriculumVitae = cvRepository.findByIdAndUser(idCv,user);
        if(curriculumVitae==null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        curriculumVitae.setStatus(DELETED);
        cvRepository.save(curriculumVitae);
        MessageResponse messageResponse= new MessageResponse();
        messageResponse.setCode(200);
        messageResponse.setTitle("Thành công");
        messageResponse.setMessage("Đã xoá thành công");
        return new ResponseEntity<>(messageResponse,HttpStatus.OK);
    }

}
