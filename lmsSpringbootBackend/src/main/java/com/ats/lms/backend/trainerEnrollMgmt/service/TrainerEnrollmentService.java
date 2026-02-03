package com.ats.lms.backend.trainerEnrollMgmt.service;

import com.ats.lms.backend.trainerEnrollMgmt.dto.*;
import com.ats.lms.backend.trainerEnrollMgmt.entity.*;
import com.ats.lms.backend.trainerEnrollMgmt.repository.*;
import java.util.List;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrainerEnrollmentService {

	 private final TrainerEnrollmentRepository repository;
	 
		 public TrainerEnrollmentService(TrainerEnrollmentRepository repository) {
		  this.repository = repository; }
		

	    public TrainerEnrollment enrollTrainer(TrainerEnrollmentRequest request) {

	        // Prevent duplicate enrollment
	        repository.findByTrainerIdAndProgramId(request.trainerId(), request.programId())
	                .ifPresent(e -> {
	                    throw new RuntimeException("Trainer already enrolled in this program");
	                });

	        // Build new enrollment
	        TrainerEnrollment enrollment = TrainerEnrollment.builder()
	                .trainerId(request.trainerId())
	                .programId(request.programId())
	                .startDate(request.startDate())
	                .endDate(request.endDate())
	                .status(TrainerEnrollment.Status.ACTIVE)
	                .build();

	        // Save to DB
	        return repository.save(enrollment);
	    }

	    public TrainerEnrollment getEnrollment(Long id) {
	        return repository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
	    }
	    
	    public List<TrainerEnrollment> getAllEnrollments() {
	        return repository.findAll();
	    }

	 // UPDATE
	    @Transactional
	    public TrainerEnrollment updateEnrollment(Long id, TrainerEnrollmentRequest request) {

	        int updated = repository.updateEnrollment(
	                id,
	                request.trainerId(),
	                request.programId(),
	                request.startDate(),
	                request.endDate(),
	                request.status()
	                
	        );

	        if (updated == 0) {
	            throw new RuntimeException("Enrollment not found");
	        }

	        return repository.findById(id).get();
	    }

	    // DELETE
	    @Transactional
	    public void deleteEnrollment(Long id) {
	        int deleted = repository.deleteEnrollmentById(id);
	        if (deleted == 0) {
	            throw new RuntimeException("Enrollment not found");
	        }
	    }
}
