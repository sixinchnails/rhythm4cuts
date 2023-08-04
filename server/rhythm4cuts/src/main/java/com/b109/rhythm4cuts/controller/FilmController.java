package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.model.dto.FilmDto;
import com.b109.rhythm4cuts.model.service.FilmService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/film")
@RequiredArgsConstructor
@CrossOrigin("*")
public class FilmController {
    //application properties 수정
    //websecurityconfig 수정
    private final FilmService filmService;

    // API 1. 데일리 방명록 사진 리스트
    // date: 방명록 조회 날짜 (ex. 2023-07-24)
    @GetMapping("/daily/info/{year}/{month}/{day}/{page}")
    public ResponseEntity<?> dailyPhotoList(@PathVariable int year, @PathVariable int month, @PathVariable int day, @PathVariable int page) {
        List<FilmDto> filmInfos = filmService.getPhotoList(year, month, day, page);

        return new ResponseEntity<>(filmInfos, HttpStatus.OK);
    }

    // API 2. 인생네컷 테두리 전체 조회
    @GetMapping("/border/list")
    public void borderList() {

        // DB의 배경 테이블에 존재하는 모든 이미지 파일들을 불러올 예정
        filmService.getBackgroundList();
    }

    // API 3. 인생네컷 사진 촬영
    @PostMapping("/photo")
    public ResponseEntity<String> photoShoot(@ModelAttribute FilmDto filmInfo) throws IOException {

        // 넘어온 사진 정보를 DB에 저장할 예정
        filmService.saveFilm(filmInfo);
        return ResponseEntity.ok("File uploaded success");
    }
}
