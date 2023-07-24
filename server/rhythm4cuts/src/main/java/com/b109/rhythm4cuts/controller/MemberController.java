package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.config.jwt.TokenProvider;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.CreateAccessTokenRequest;
import com.b109.rhythm4cuts.model.dto.CreateAccessTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Date;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    @Autowired
    TokenProvider tokenProvider;

    //API 1. 로그인 시 JWT 액세스 토큰 발급
    @GetMapping("/login")
    public ResponseEntity<CreateAccessTokenResponse> createNewAccessToken(@RequestBody CreateAccessTokenRequest request) {
        //프론트에서 들어올 매개변수가 미정이므로 우선은 닉네임과 refreshToken이 들어오는 것으로 가정
        //첫 로그인 시에는 refreshToken이 없으므로 이에 대한 기능 추가 구현 예정
        
        //String newAccessToken = tokenService.createNewAccessToken(request.getRefreshToken());
        //User user = userService.findByNickname(request.getNickname());

        User user = new User();
        //액세스 토큰 유효 기간
        Duration expiration = Duration.ofDays(14);
        //새로 생성된 액세스 토큰
        String newAccessToken = tokenProvider.generateToken(user,expiration);
    
        //토큰 유효성 점검
        if (!tokenProvider.validToken(newAccessToken)) {
            return null;
        }
    
        //닉네임, 포인트, 프로필 이미지 시퀀스, 인코딩된 액세스 토큰을 json 형식으로 반환
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateAccessTokenResponse()
                        .builder()
                        .nickname(user.getNickname())
                        .points(user.getPoint())
                        .profile_img_seq(user.getProfileImage().getProfileImageSeq())
                        //14일 후 토큰 만료하도록
                        .accessToken(newAccessToken)
                        .build()
                );
    }
}