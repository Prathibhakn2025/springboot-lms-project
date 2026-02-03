package com.ats.lms.backend.programMgmt.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "program_images")
public class ProgramImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000, nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    private Program program;

    // Constructors, Getters & Setters
    public ProgramImage() {}
    
    public ProgramImage(String imageUrl, Program program) {
        this.imageUrl = imageUrl;
        this.program = program;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Program getProgram() { return program; }
    public void setProgram(Program program) { this.program = program; }
}
