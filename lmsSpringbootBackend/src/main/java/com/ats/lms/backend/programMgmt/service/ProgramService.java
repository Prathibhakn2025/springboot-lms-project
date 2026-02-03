package com.ats.lms.backend.programMgmt.service;

import com.ats.lms.backend.programMgmt.dto.ProgramRequestDTO;
import com.ats.lms.backend.programMgmt.dto.ProgramResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProgramService {
    ProgramResponseDTO createProgram(ProgramRequestDTO request, List<MultipartFile> images);
    List<ProgramResponseDTO> getAllPrograms();
    ProgramResponseDTO getProgramById(Long id);
    void deleteProgram(Long id);
    ProgramResponseDTO updateProgram(Long id, ProgramRequestDTO request, List<MultipartFile> images, List<String> removeImages);
}
