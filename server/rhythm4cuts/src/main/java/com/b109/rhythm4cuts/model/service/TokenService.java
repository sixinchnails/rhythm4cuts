package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.config.jwt.TokenProvider;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.LoginDto;
import com.b109.rhythm4cuts.model.dto.TokenResponse;
import com.b109.rhythm4cuts.model.dto.UserDto;
import com.b109.rhythm4cuts.model.repository.UserRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class TokenService {
    private final TokenProvider tokenProvider;
    //private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepository;

    //토큰 새로 발급 받는 메서드(유효성 지나서)
//    public TokenResponse createNewAccessToken(String refreshToken) {
//        //토큰 유효성 검증에 실패하면 예외 발생
//        if (!tokenProvider.validToken(refreshToken)) {
//            throw new IllegalArgumentException("Unexpected token");
//        }
//
//        Long userId = refreshTokenService.findByRefreshToken(refreshToken).getUserId();
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new IllegalArgumentException());
//        UserDto userDto = Utils.dtoSetter(user);
//
//        return tokenProvider.generateToken(userDto, Duration.ofHours(2), Duration.ofDays(14));
//    }

    public Authentication getAuthentication(String token) {
        return tokenProvider.getAuthentication(token);
    }

    public String getUserId(String token) {
        return tokenProvider.getUserId(token);
    }

    public boolean validToken(String token) {
        return tokenProvider.validToken(token);
    }

    public TokenResponse generateToken(UserDto userDto, Duration accessExpiredAt, Duration refreshExpiredAt) {
        TokenResponse tokenResponse = tokenProvider.generateToken(userDto, accessExpiredAt, refreshExpiredAt);
        User user = userRepository.findByEmail(userDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 사용자가 존재하지 않습니다."));

        user.setRefreshToken(tokenResponse.getRefreshToken());
        userRepository.save(user);

        return tokenResponse;
    }
}