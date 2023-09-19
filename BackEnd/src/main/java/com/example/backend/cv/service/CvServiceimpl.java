package com.example.backend.cv.service;

import com.example.backend.authen.service.userdetail.UserPrinciple;
import com.example.backend.cv.contains.CvStatus;
import com.example.backend.cv.model.*;
import com.example.backend.cv.payload.request.CurriculumVitaeCreateForm;
import com.example.backend.cv.reponsitory.*;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.example.backend.cv.contains.CvStatus.ACTIVE;

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
        if(curriculumVitae.getWorkExperiences()!=null){
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
        return new ResponseEntity<>(cvRepository.save(curriculumVitae),HttpStatus.OK);
    }
}
