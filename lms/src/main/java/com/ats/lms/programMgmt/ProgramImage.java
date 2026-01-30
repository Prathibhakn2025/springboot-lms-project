package com.ats.lms.programMgmt;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "program_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgramImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000, nullable = false)
    private String imageUrl; // store image path or URL

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id")
    private Program program;
}
