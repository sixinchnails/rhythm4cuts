package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.model.service.MelonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/melon")
@RequiredArgsConstructor
public class CrawlingTestController {

    private final MelonService melonService;

    @GetMapping("/rank")
    public void melonRank() {
        try {

            // 1. 기존 DB에 저장된 데이터 초기화
            melonService.clearMelonChart();

            // 2. 현재 멜론 차트 데이터 크롤링 및 DB 저장
            melonService.scrapeAndSaveMelonChart();

            System.out.println("Melon Chart Crawling Success.");
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
