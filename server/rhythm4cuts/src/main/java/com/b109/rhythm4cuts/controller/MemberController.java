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

    @GetMapping("login")
    public ResponseEntity<CreateAccessTokenResponse> createNewAccessToken(@RequestBody CreateAccessTokenRequest request) {
        //String newAccessToken = tokenService.createNewAccessToken(request.getRefreshToken());
        //User user = userService.findByNickname(request.getNickname());

        User user = new User();
        Duration expiration = Duration.ofDays(14);
        String newAccessToken = tokenProvider.generateToken(user,expiration);

        if (!tokenProvider.validToken(newAccessToken)) {
            return null;
        }

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