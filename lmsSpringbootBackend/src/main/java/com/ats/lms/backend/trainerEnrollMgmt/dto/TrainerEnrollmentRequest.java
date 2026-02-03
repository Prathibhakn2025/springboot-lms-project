package com.ats.lms.backend.trainerEnrollMgmt.dto;

import com.ats.lms.backend.trainerEnrollMgmt.entity.TrainerEnrollment.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record TrainerEnrollmentRequest(
        @NotNull Long trainerId,
        @NotNull Long programId,
        @NotNull
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate startDate,
        @NotNull
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate endDate,
        
        @NotNull Status status
) {}
