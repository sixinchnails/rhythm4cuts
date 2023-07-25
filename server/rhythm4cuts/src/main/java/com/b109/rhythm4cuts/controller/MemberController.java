package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.config.jwt.TokenProvider;
import com.b109.rhythm4cuts.model.domain.User;
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
    public CreateAccessTokenResponse login(@RequestBody Map<String, String> user) {
        User member = userService.findByEmail(user.get("email"))
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        //password 넘어오는 형식에 맞춰 수정 필요
        if (!member.getPassword().equals(user.get("password"))) {
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        //토큰 유효 기간 2주
        String newAccessToken = tokenProvider.generateToken(member, Duration.ofDays(14));

        return new CreateAccessTokenResponse().builder()
                .nickname(member.getNickname())
                .points(member.getPoint())
                .profile_img_seq(member.getProfileImage().getProfileImageSeq())
                .accessToken(newAccessToken)
                .build();
    }

    @PostMapping("/register")
    public Long join(@RequestBody Map<String, String> user) {
        //쉐도우복싱 수정
        String nickname = user.get("nickname");

        try {
            User member = userService.findByNickname(nickname);
            
            //해당 닉네임을 가진 유저가 없다면 서비스가 익셉션을 던져 아래서 catch
        } catch(IllegalArgumentException e) {
            return new ResponseEntity.status(HttpStatus.)
        }
    }
}