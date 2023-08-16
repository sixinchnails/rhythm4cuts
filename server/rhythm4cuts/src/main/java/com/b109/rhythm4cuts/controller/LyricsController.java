package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.model.service.LyricsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/lyrics")
@RequiredArgsConstructor
public class LyricsController {

    private final LyricsService lyricsService;

    @GetMapping("/{songSeq}")
    public ResponseEntity<?> selectLyricTime(@PathVariable("songSeq") int songSeq) {

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Success");
        res.put("statusCode", 200);
        res.put("data", res);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
