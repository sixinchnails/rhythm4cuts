package com.b109.rhythm4cuts.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
public class UploadController {

    private final AmazonS3 amazonS3;

    public UploadController(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    @Value("{cloud.aws.credentials.secret-key}")
    private String bucketName;

    @PostMapping("/user/audio")
    public ResponseEntity<String> saveUserAudio(@RequestParam("audio")MultipartFile audioFile) {
        try {
            // 여기에서 받은 MultipartFile인 audioFile을 이용하여 DB에 저장하는 로직을 구현하세요.
            // 예를 들어, 파일을 서버의 파일 시스템에 저장하거나, AWS S3에 업로드할 수 있습니다.
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(audioFile.getSize());

            String fileName = "audio/" + audioFile.getOriginalFilename();
            amazonS3.putObject(bucketName, fileName, audioFile.getInputStream(), metadata);
            // 저장이 완료되면 성공 응답을 반환합니다.
            return ResponseEntity.ok("Audio saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving audio");
        }
    }
}
