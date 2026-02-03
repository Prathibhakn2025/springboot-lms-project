package com.ats.lms.backend.trainerEnrollMgmt.controller;

import com.ats.lms.backend.trainerEnrollMgmt.dto.*;
import com.ats.lms.backend.trainerEnrollMgmt.entity.*;
import com.ats.lms.backend.trainerEnrollMgmt.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trainers/enrollment")
@RequiredArgsConstructor
public class TrainerEnrollmentController {

	private final TrainerEnrollmentService service;

	// Constructor injection
    public TrainerEnrollmentController(TrainerEnrollmentService service) {
        this.service = service;
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TrainerEnrollment enrollTrainer(
            @Valid @RequestBody TrainerEnrollmentRequest request) {
        TrainerEnrollment enrollment = service.enrollTrainer(request);
        System.out.println("[INFO] Enrollment successful: " + enrollment);
        return enrollment;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEnrollment(@PathVariable Long id) {
        try {
            TrainerEnrollment enrollment = service.getEnrollment(id);
            System.out.println("[INFO] Enrollment fetched successfully: " + enrollment);
            return ResponseEntity.ok(enrollment);
        } catch (RuntimeException e) {
            System.out.println("[ERROR] Failed to fetch enrollment for id " + id + ": " + e.getMessage());
            // Return meaningful message
            Map<String, String> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Enrollment with ID " + id + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }
    
    
    @GetMapping
    public ResponseEntity<?> getAllEnrollments() {
        try {
            return ResponseEntity.ok(service.getAllEnrollments());
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", "Failed to fetch enrollments");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEnrollment(
            @PathVariable Long id,
            @Valid @RequestBody TrainerEnrollmentRequest request) {
        try {
            TrainerEnrollment updated = service.updateEnrollment(id, request);
            System.out.println("[INFO] Enrollment updated successfully: " + updated);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            System.out.println("[ERROR] Failed to update enrollment for id " + id + ": " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEnrollment(@PathVariable Long id) {
        try {
            service.deleteEnrollment(id);
            System.out.println("[INFO] Enrollment deleted successfully for id " + id);
            Map<String, String> response = new HashMap<>();
            response.put("status", "SUCCESS");
            response.put("message", "Enrollment deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("[ERROR] Failed to delete enrollment for id " + id + ": " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("status", "ERROR");
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

}

