package com.ats.lms.backend.programMgmt.repository;

import com.ats.lms.backend.programMgmt.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Long> {
    boolean existsByProgramCode(String programCode);
}
