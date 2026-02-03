package com.ats.lms.backend.trainerEnrollMgmt.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "trainer_enrollment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainerEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long trainerId;
    private Long programId;

    private LocalDate startDate;
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        ACTIVE,
        INACTIVE
    }
    

    // ----------- Constructors -----------
    public TrainerEnrollment() {} // default

    public TrainerEnrollment(Long id, Long trainerId, Long programId,
                             LocalDate startDate, LocalDate endDate, Status status) {
        this.id = id;
        this.trainerId = trainerId;
        this.programId = programId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }

    // ----------- Getters & Setters -----------
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTrainerId() { return trainerId; }
    public void setTrainerId(Long trainerId) { this.trainerId = trainerId; }

    public Long getProgramId() { return programId; }
    public void setProgramId(Long programId) { this.programId = programId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    // ----------- Manual Builder -----------
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private Long trainerId;
        private Long programId;
        private LocalDate startDate;
        private LocalDate endDate;
        private Status status;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder trainerId(Long trainerId) { this.trainerId = trainerId; return this; }
        public Builder programId(Long programId) { this.programId = programId; return this; }
        public Builder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public Builder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public Builder status(Status status) { this.status = status; return this; }

        public TrainerEnrollment build() {
            return new TrainerEnrollment(id, trainerId, programId, startDate, endDate, status);
        }
    }

	
	
}
