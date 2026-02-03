package com.ats.lms.backend.programMgmt.controller;

import com.ats.lms.backend.programMgmt.dto.ProgramRequestDTO;
import com.ats.lms.backend.programMgmt.dto.ProgramResponseDTO;
import com.ats.lms.backend.programMgmt.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProgramResponseDTO> createProgram(
            @RequestPart("program") ProgramRequestDTO request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        return ResponseEntity.ok(programService.createProgram(request, images));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProgramResponseDTO> updateProgram(
            @PathVariable Long id,
            @RequestPart("program") ProgramRequestDTO request,
            @RequestPart(value = "images", required = false) List<MultipartFile> images,
            @RequestParam(value = "remove_images", required = false) List<String> removeImages
    ) {
        return ResponseEntity.ok(programService.updateProgram(id, request, images, removeImages));
    }

    @GetMapping
    public ResponseEntity<List<ProgramResponseDTO>> getAllPrograms() {
        return ResponseEntity.ok(programService.getAllPrograms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramResponseDTO> getProgramById(@PathVariable Long id) {
        return ResponseEntity.ok(programService.getProgramById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
        return ResponseEntity.noContent().build();
    }
}
