package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.config.jwt.TokenProvider;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.AddUserRequest;
import com.b109.rhythm4cuts.model.dto.CreateAccessTokenRequest;
import com.b109.rhythm4cuts.model.dto.CreateAccessTokenResponse;
import com.b109.rhythm4cuts.repository.UserRepository;
import com.b109.rhythm4cuts.service.TokenService;
import com.b109.rhythm4cuts.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private final TokenService tokenService;
    @Autowired
    TokenProvider tokenProvider;
    @Autowired
    UserService userService;

    //API 1. 로그인
    @PostMapping("/login")
    public ResponseEntity<CreateAccessTokenResponse> login(@RequestBody Map<String, String> user) {
        //로그인을 시도한 이메일로 사용자 조회
        User member = userService.findByEmail(user.get("email"));

        //클라이언트에서 password 넘어오는 형식에 맞춰 수정 필요
        if (!member.getPassword().equals(user.get("password"))) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        //토큰 유효 기간 2주
        String newAccessToken = tokenProvider.generateToken(member, Duration.ofDays(14));

        return ResponseEntity.ok()
                .body(new CreateAccessTokenResponse().builder()
                        .nickname(member.getNickname())
                        .points(member.getPoint())
                        .profile_img_seq(member.getProfileImage().getProfileImageSeq())
                        .accessToken(newAccessToken)
                        .build());
    }

    @PostMapping("/register")
    public ResponseEntity join(AddUserRequest request) {
        //중복 여부 확인 필요
        //이미 가입된 회원 확인 필요
        //리포지터리에서 처리 되나?
        userService.save(request);

        return ResponseEntity.status(HttpStatus.OK).build();
        //return new ResponseEntity<>("ok", HttpStatus.OK);
    }
}