package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.model.dto.LobbyDto;
import com.b109.rhythm4cuts.model.service.WaitRoomService;
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

    // API 2. 대기방 친구 초대

    // API 3. 대기방 준비 완료

    // API 4. 대기방 (방장 권한) 게임 시작

    // API 5. 대기방 (방장 권한) 강제 퇴장

    // API 6. 대기방 나가기
}
