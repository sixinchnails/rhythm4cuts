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
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final TokenProvider tokenProvider;
    private final UserService userService;

    //API 1. POST 로그인
    @PostMapping("/login")
    public ResponseEntity<CreateAccessTokenResponse> login(@RequestBody Map<String, String> params) {
        //로그인을 시도한 이메일로 사용자 조회
        UserDto userDto = userService.findByEmail(params.get("email"));

        //클라이언트에서 password 넘어오는 형식에 맞춰 수정 필요
        if (!userDto.getPassword().equals(params.get("password"))) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        //토큰 유효 기간 2주
        String newAccessToken = tokenProvider.generateToken(userDto, Duration.ofDays(14));

        return ResponseEntity.ok()
                .body(new CreateAccessTokenResponse().builder()
                        .nickname(userDto.getNickname())
                        .points(userDto.getPoint())
//                        .profile_img_seq(member.getProfileImage().getProfileImageSeq())
                        .accessToken(newAccessToken)
                        .build());
    }
    
    //API 2. POST 회원가입
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody AddUserRequest request) {
        //중복 여부 확인 필요
        //이미 가입된 회원 확인 필요
        //리포지터리에서 처리 되나?
        userService.save(request);

        return ResponseEntity.status(HttpStatus.OK).build();
        //return new ResponseEntity<>("ok", HttpStatus.OK);
    }

    //테스트용
    @PostMapping("/test")
    public ResponseEntity test(@RequestBody Map<String, String> params) {
        return ResponseEntity.ok().build();
    }

    //GET 닉네임 중복
    @GetMapping("/nickname")
    public ResponseEntity nickname(@RequestParam String nickname) {
        return ResponseEntity.status(409).body(Map.of("duplicate", userService.duplicateNickname(nickname)));
    }

    //나의 사진 조회
    @GetMapping("/profile")
    public ResponseEntity getProfile(@RequestParam String email) {
        Map<String, Object> res = new HashMap<>();
        res.put("file_name", userService.getProfileImg(email));

        return ResponseEntity.status(200).body(res);
    }

    //포인트 로그 조회
    @GetMapping("/point")
    public ResponseEntity getPoint(@RequestParam String email) {
        Map<String, Object> res = new HashMap<>();
        res.put("point", userService.getPoint(email));

        return ResponseEntity.status(200).body(res);
    }

    //프로필 이미지 변경
    @PatchMapping("/profile")
    public ResponseEntity patchProfile(@RequestBody UpdateProfileImgDto dto) {
        return ResponseEntity.status(200).body(userService.patchProfileImg(dto));
    }
}