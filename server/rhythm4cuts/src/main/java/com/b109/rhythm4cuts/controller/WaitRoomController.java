package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.model.dto.LobbyDto;
import com.b109.rhythm4cuts.model.service.WaitRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wait")
public class WaitRoomController {

    private final WaitRoomService waitRoomService;

    // API 1. 대기방(OpenVidu) 정보 조회
    @GetMapping("/info/{gameSeq}")
    public ResponseEntity<?> getWaitRoomInfo(@PathVariable("gameSeq") int gameSeq) {
        LobbyDto lobbyDto = waitRoomService.getWaitRoomInfo(gameSeq);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Success");
        res.put("statusCode", 200);
        res.put("data", lobbyDto);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // API 2. 대기방 입장
    @PostMapping("/enter")
    public ResponseEntity<?> insertUserGameInfo(@RequestBody Map<String, Object> param) {

        System.out.println("찍혔니? (전)");
        int order = waitRoomService.insertUserGameInfo(param);
        System.out.println("찍혔니? (후..)");

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Success");
        res.put("statusCode", 200);
        res.put("data", order);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    // API 3. 대기방 친구 초대

    // API 4. 대기방 준비 완료

    // API 5. 대기방 (방장 권한) 게임 시작

    // API 6. 대기방 (방장 권한) 강제 퇴장

    // API 7. 대기방 나가기
}
