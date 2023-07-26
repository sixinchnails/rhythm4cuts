package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.model.service.FilmService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/film")
@RequiredArgsConstructor
public class FilmController {
    
    // 인생네컷의 테두리 개수 (추후 DB에서 count 함수로 값을 끌어올 예정)
    private static final int PHOTO_SIZE = 4;

    private final FilmService filmService;

    // API 1. 인생네컷 사진 촬영
    @PostMapping("/photo")
    public static void photoShoot(@RequestBody GameImageDto gameImageDto) {

        // 넘어온 사진 정보를 DB에 저장할 예정
        filmService.photoShoot(gameImageDto);
    }

    // API 2. 데일리 방명록 사진 리스트
    // date: 방명록 조회 날짜 (ex. 2023-07-24)
    @GetMapping("/photo/{date}")
    public static void dailyPhotoList(@PathVariable("date") String date) {

        // DB에서 'WHERE create_date LIKE 'date%''와 같은 형태로 검색할 예정
        filmService.dailyPhotoList(date);
    }

    // API 3. 인생네컷 테두리 전체 조회
    @GetMapping("/border")
    public static void borderList() {

        // DB의 배경 테이블에 존재하는 모든 이미지 파일들을 불러올 예정
        filmService.borderList();
    }
}
