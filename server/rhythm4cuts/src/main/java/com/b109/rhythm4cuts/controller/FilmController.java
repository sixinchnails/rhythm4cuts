//package com.b109.rhythm4cuts.controller;
//
//import com.b109.rhythm4cuts.model.dto.FilmDto;
//import com.b109.rhythm4cuts.model.service.FilmService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.web.PageableDefault;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/film")
//@RequiredArgsConstructor
//public class FilmController {
//
//    private final FilmService filmService;
//
//    // API 1. 데일리 방명록 사진 리스트
//    // createDate: 방명록 조회 날짜 (ex. 2023-07-24)
//    @GetMapping("/photo/{createDate}")
//    public ResponseEntity<FilmDto> dailyPhotoList(@PageableDefault(size = 10) Pageable pageable, @PathVariable("createDate") String createDate) {
//
//        // DB에서 'WHERE create_date LIKE 'date%''와 같은 형태로 검색할 예정
//        filmService.getPhotoList(createDate);
//
//        return ResponseEntity.ok().body();
//    }
//
//    // API 2. 인생네컷 테두리 전체 조회
//    @GetMapping("/border")
//    public void borderList() {
//
//        // DB의 배경 테이블에 존재하는 모든 이미지 파일들을 불러올 예정
//        filmService.getBackgroundList();
//    }
//
//    // API 3. 인생네컷 사진 촬영
//    @PostMapping("/photo")
//    public void photoShoot(@RequestBody FilmDto filmDto) {
//
//        // 넘어온 사진 정보를 DB에 저장할 예정
//        filmService.addPhoto(filmDto);
//    }
//}
