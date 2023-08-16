package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.repository.UploadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;

@Service
@Transactional
@RequiredArgsConstructor
public class UploadServiceImpl implements UploadService {

    private final S3UploadService s3UploadService;
    private final FilmServiceImpl filmServiceImpl;
    private final UploadRepository uploadRepository;

    @Override
    public void saveUserAudio(MultipartFile multipartFile) throws IOException {

        String fileName = filmServiceImpl.generateFileName(multipartFile.getOriginalFilename());
        String fileUrl = s3UploadService.saveFile(multipartFile, fileName);
    }
}
