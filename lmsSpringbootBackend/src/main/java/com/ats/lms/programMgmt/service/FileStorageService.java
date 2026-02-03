package com.ats.lms.programMgmt.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public List<String> saveProgramImages(List<MultipartFile> files, Long programId) throws IOException {
        List<String> paths = new ArrayList<>();

        Path programFolder = Paths.get(uploadDir, "programs", programId.toString());
        Path mainFolder = programFolder.resolve("main");
        Path othersFolder = programFolder.resolve("others");

        Files.createDirectories(mainFolder);
        Files.createDirectories(othersFolder);

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            String ext = getExtension(file.getOriginalFilename());
            String filename = UUID.randomUUID() + ext;

            Path targetPath;
            String publicPath;

            if (i == 0) {
                targetPath = mainFolder.resolve(filename);
                publicPath = "programs/" + programId + "/main/" + filename;
            } else {
                targetPath = othersFolder.resolve(filename);
                publicPath = "programs/" + programId + "/others/" + filename;
            }

            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            paths.add(publicPath);  // relative path stored in DB
        }

        return paths;
    }

    public boolean deleteFile(String relativePath) {
        Path path = Paths.get(uploadDir).resolve(relativePath);
        return path.toFile().delete();
    }

    private String getExtension(String filename) {
        int index = filename.lastIndexOf('.');
        return (index == -1) ? "" : filename.substring(index);
    }
}
