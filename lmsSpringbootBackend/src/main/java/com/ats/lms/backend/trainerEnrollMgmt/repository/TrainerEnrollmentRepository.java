package com.ats.lms.backend.trainerEnrollMgmt.repository;


import com.ats.lms.backend.trainerEnrollMgmt.entity.*;
import com.ats.lms.backend.trainerEnrollMgmt.entity.TrainerEnrollment.Status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface TrainerEnrollmentRepository
        extends JpaRepository<TrainerEnrollment, Long> {

    Optional<TrainerEnrollment> findByTrainerIdAndProgramId(
            Long trainerId, Long programId);
    
    
    
 // ✅ UPDATE
    @Modifying
    @Query("""
        UPDATE TrainerEnrollment e
        SET e.trainerId = :trainerId,
            e.programId = :programId,
            e.startDate = :startDate,
            e.endDate = :endDate,
            e.status = :status
        WHERE e.id = :id
    """)
    int updateEnrollment(
            Long id,
            Long trainerId,
            Long programId,
            LocalDate startDate,
            LocalDate endDate,
            Status status
    );

    // ✅ DELETE
    @Modifying
    @Query("DELETE FROM TrainerEnrollment e WHERE e.id = :id")
    int deleteEnrollmentById(Long id);
}

