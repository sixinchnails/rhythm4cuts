package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.model.dto.SongDto;
import com.b109.rhythm4cuts.model.service.MusicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/music")
@RequiredArgsConstructor
public class MusicController {

    private final MusicService musicService;

    @PostMapping("/add")
    public ResponseEntity<?> addYoutubeMusic(@RequestBody SongDto songDto) {
        try {
            musicService.saveMusic(songDto.getUrl());
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
