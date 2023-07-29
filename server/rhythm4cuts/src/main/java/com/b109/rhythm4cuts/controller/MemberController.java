package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.config.jwt.TokenProvider;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.*;

import com.b109.rhythm4cuts.model.service.TokenService;
import com.b109.rhythm4cuts.model.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final TokenService tokenService;
    private final UserService userService;

    //API 1. POST 로그인
    @PostMapping("/login")
    public ResponseEntity<CreateAccessTokenResponse> login(@RequestBody LoginDto loginDto) {
        //로그인을 시도한 이메일로 사용자 조회
        UserDto userDto = userService.findByEmail(loginDto.getEmail());
        //액세스 토큰의 유효 시간 30분으로 설정
        String newAccessToken = tokenService.generateToken(userDto, Duration.ofMinutes(30));

        return ResponseEntity.ok()
                .body(new CreateAccessTokenResponse().builder()
                        .nickname(userDto.getNickname())
                        .points(userDto.getPoint())
                        .profile_img_seq(userDto.getProfileImageSeq())
                        .accessToken(newAccessToken)
                        .build());
    }
    
    //API 2. POST 회원가입
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody AddUserRequest request) {
        userService.save(request);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //닉네임 중복
    @GetMapping("/nickname")
    public ResponseEntity nickname(@RequestParam String nickname) {
        return ResponseEntity.status(409).body(Map.of("duplicate", userService.duplicateNickname(nickname)));
    }

    //나의 사진 조회
    @GetMapping("/profile")
    public ResponseEntity getProfile(@RequestParam String email) {
        Map<String, Object> res = new HashMap<>();

        System.out.println("컨트 이메일:" + email);

        res.put("file_name", userService.getProfileImg(email));

        return ResponseEntity.status(200).body(res);
    }

    //포인트 로그 조회
    @GetMapping("/point")
    public ResponseEntity getPoint(@RequestParam String email) {
        Map<String, Object> res = new HashMap<>();
        System.out.println("포인트");
                
        res.put("point", userService.getPoint(email));
        
        return ResponseEntity.status(200).body(res);
    }

    //프로필 이미지 변경
    @PatchMapping("/profile")
    public ResponseEntity updateProfileImg(@RequestBody UpdateProfileImgDto dto) {
        userService.patchProfileImg(dto);

        return ResponseEntity.status(200).build();
    }

    //닉네임 변경
    @PatchMapping("/nickname")
    public ResponseEntity updateNickname(@RequestBody UpdateUserNicknameDto dto){
        userService.updateNickname(dto);

        return ResponseEntity.status(200).build();
    }

    //비밀번호 변경
    @PatchMapping("/pw")
    public ResponseEntity updatePassword(@RequestHeader("Authorization") String accessToken, @RequestBody UpdateUserPasswordDto dto) {
        userService.updatePassword(accessToken, dto);

        return ResponseEntity.status(200).build();
    }

    //포인트 결제
    @PostMapping("/pay")
    public ResponseEntity payPoints(@RequestBody PayDto payDto) {
        long leftPoints = userService.payPoints(payDto);

        //잔여 포인트 반환
        return ResponseEntity.status(200).body(Map.of("point", leftPoints));
    }

    //로그아웃
    @PostMapping("logout")
    public ResponseEntity logout() {
        //상태 변경할 예정
        return ResponseEntity.status(200).build();
    }

    //비밀번호 찾기
    @Transactional
    @PostMapping("/pw")
    public ResponseEntity findPassword(@RequestParam String email) {
        UserDto userDto = userService.findByEmail(email);

        MailDto mailDto = userService.createMailAndChangePassword(email);
        userService.sendEmail(mailDto);

        return ResponseEntity.status(200).build();
    }
}