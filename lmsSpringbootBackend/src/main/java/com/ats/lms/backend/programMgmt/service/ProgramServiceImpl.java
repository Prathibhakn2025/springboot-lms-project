package com.ats.lms.backend.programMgmt.service;

import com.ats.lms.backend.programMgmt.dto.ProgramRequestDTO;
import com.ats.lms.backend.programMgmt.dto.ProgramResponseDTO;
import com.ats.lms.backend.programMgmt.entity.Program;
import com.ats.lms.backend.programMgmt.entity.ProgramImage;
import com.ats.lms.backend.programMgmt.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProgramServiceImpl implements ProgramService {

    private static final String BASE_UPLOAD_DIR = "uploads/programs/";

    @Autowired
    private ProgramRepository programRepository;

    @Override
    public ProgramResponseDTO createProgram(ProgramRequestDTO request, List<MultipartFile> images) {
        Program program = new Program();
        program.setProgramCode(request.getProgramCode());
        program.setProgramName(request.getProgramName());
        program.setDescription(request.getDescription());
        program.setLevel(request.getLevel());
        program.setMode(request.getMode());
        program.setDurationInWeeks(request.getDurationInWeeks());
        program.setMaxStudents(request.getMaxStudents());
        program.setStartDate(request.getStartDate());
        program.setEndDate(request.getEndDate());
        program.setActive(request.isActive());
        program.setCreatedBy(request.getCreatedBy());
        program.setCreatedAt(LocalDateTime.now());
        program.setUpdatedAt(LocalDateTime.now());

        Program savedProgram = programRepository.save(program);

        if (images != null && !images.isEmpty()) {
            saveImages(savedProgram, images);
        }

        return mapToResponse(programRepository.save(savedProgram));
    }

    @Override
    public ProgramResponseDTO updateProgram(Long id, ProgramRequestDTO request, List<MultipartFile> images, List<String> removeImages) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found"));

        program.setProgramCode(request.getProgramCode());
        program.setProgramName(request.getProgramName());
        program.setDescription(request.getDescription());
        program.setLevel(request.getLevel());
        program.setMode(request.getMode());
        program.setDurationInWeeks(request.getDurationInWeeks());
        program.setMaxStudents(request.getMaxStudents());
        program.setStartDate(request.getStartDate());
        program.setEndDate(request.getEndDate());
        program.setActive(request.isActive());
        program.setUpdatedAt(LocalDateTime.now());

        // Remove images
        if (removeImages != null) {
            List<ProgramImage> toRemove = program.getImages().stream()
                    .filter(img -> removeImages.contains(img.getImageUrl()))
                    .toList();

            for (ProgramImage img : toRemove) {
                try { Files.deleteIfExists(Paths.get(BASE_UPLOAD_DIR + img.getImageUrl())); } 
                catch (IOException e) { e.printStackTrace(); }
                program.getImages().remove(img);
            }
        }

        // Save new images
        if (images != null && !images.isEmpty()) saveImages(program, images);

        return mapToResponse(programRepository.save(program));
    }

    private void saveImages(Program program, List<MultipartFile> images) {
        Long programId = program.getId();
        String mainDir = BASE_UPLOAD_DIR + programId + "/main/";
        String otherDir = BASE_UPLOAD_DIR + programId + "/others/";

        new File(mainDir).mkdirs();
        new File(otherDir).mkdirs();

        for (int i = 0; i < images.size(); i++) {
            MultipartFile file = images.get(i);
            try {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get((i == 0 ? mainDir : otherDir) + fileName);
                Files.write(filePath, file.getBytes());

                ProgramImage img = new ProgramImage();
                img.setProgram(program);
                img.setImageUrl(programId + (i == 0 ? "/main/" : "/others/") + fileName);
                program.getImages().add(img);

            } catch (IOException e) {
                throw new RuntimeException("Image upload failed", e);
            }
        }
    }

    @Override
    public List<ProgramResponseDTO> getAllPrograms() {
        return programRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public ProgramResponseDTO getProgramById(Long id) {
        Program program = programRepository.findById(id).orElseThrow(() -> new RuntimeException("Program not found"));
        return mapToResponse(program);
    }

    @Override
    public void deleteProgram(Long id) { programRepository.deleteById(id); }

    private ProgramResponseDTO mapToResponse(Program program) {
        ProgramResponseDTO dto = new ProgramResponseDTO();
        dto.setId(program.getId());
        dto.setProgramCode(program.getProgramCode());
        dto.setProgramName(program.getProgramName());
        dto.setDescription(program.getDescription());
        dto.setLevel(program.getLevel());
        dto.setMode(program.getMode());
        dto.setDurationInWeeks(program.getDurationInWeeks());
        dto.setMaxStudents(program.getMaxStudents());
        dto.setStartDate(program.getStartDate());
        dto.setEndDate(program.getEndDate());
        dto.setActive(program.isActive());
        dto.setCreatedBy(program.getCreatedBy());
        dto.setCreatedAt(program.getCreatedAt());
        dto.setUpdatedAt(program.getUpdatedAt());
        dto.setImageUrls(program.getImages().stream().map(ProgramImage::getImageUrl).toList());
        return dto;
    }
}
