package com.b109.rhythm4cuts.config.jwt;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.LoginDto;
import com.b109.rhythm4cuts.model.dto.TokenResponse;
import com.b109.rhythm4cuts.model.dto.UserDto;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class TokenProvider {
    private final JwtProperties jwtProperties;

    public TokenResponse generateToken(UserDto userDto, Duration accessExpiredAt, Duration refreshExpiredAt) {
        Date now = new Date();

        return makeToken(new Date(now.getTime() + accessExpiredAt.toMillis()), new Date(now.getTime() + refreshExpiredAt.toMillis()), userDto);
    }

    //메서드 1. JWT 토큰 생성 메서드
    private TokenResponse makeToken(Date accessExpiry, Date refreshExpiry, UserDto userDto) {
        Date now = new Date();
        
        String accessToken = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(now)
                .setExpiration(accessExpiry)
                .setSubject(userDto.getEmail())
                //여기부터 공개 클레임
                .claim("id", userDto.getEmail())
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
                .compact();

        String refreshToken = Jwts.builder()
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(now)
                .setExpiration(refreshExpiry)
                .setSubject(userDto.getEmail())
                .claim("id", userDto.getEmail())
                .signWith(SignatureAlgorithm.HS256, jwtProperties.getSecretKey())
                .compact();

        return TokenResponse
                .builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .points(userDto.getPoint())
                .nickname(userDto.getNickname())
                .profile_img_seq(userDto.getProfileImageSeq())
                .user_seq(userDto.getUserSeq())
                .build();
    }

    //메서드 2. JWT 토큰(액세스/리프레쉬 둘 다) 유효성 검증 메서드
    public boolean validToken(String token) {
        try{
            Jwts.parser()
                    .setSigningKey(jwtProperties.getSecretKey())
                    .parseClaimsJws(token);

            return true;
        } catch (ExpiredJwtException e) {
            return false;
        } catch(Exception e) {
            return false;
        }
    }

    //메서드 3. 토큰 기반으로 인증 정보를 가져오는 메서드
    public Authentication getAuthentication(String token) {
        Claims claims = getClaims(token);
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));

        return new UsernamePasswordAuthenticationToken(new org.springframework.security.core.userdetails.User(claims.getSubject(), "", authorities), token, authorities);
    }

    //메서드 4. 토큰 기반으로 유저 ID(이메일)를 가져오는 메서드
    public String getUserId(String token) {
        Claims claims = getClaims(token);
        return claims.get("id", String.class);
    }

    //메서드 5. 클레임 조회 메서드
    private Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecretKey())
                .parseClaimsJws(token)
                .getBody();
    }
}