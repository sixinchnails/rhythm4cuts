package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.config.jwt.TokenProvider;
import com.b109.rhythm4cuts.model.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;

@RequiredArgsConstructor
@Service
public class TokenService {
    @Autowired
    private final TokenProvider tokenProvider;
    @Autowired
    private final RefreshTokenService refreshTokenService;
    @Autowired
    private final UserService userService;

    //토큰 새로 발급 받는 메서드(유효성 지나서)
    public String createNewAccessToken(String refreshToken) {
        //토큰 유효성 검증에 실패하면 예외 발생
        if (!tokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Unexpected token");
        }

        Long userId = refreshTokenService.findByRefreshToken(refreshToken).getUserId();
        User user = userService.findById(userId);

        return tokenProvider.generateToken(user, Duration.ofHours(2));
    }
}
