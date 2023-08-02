package com.b109.rhythm4cuts.config;

import com.b109.rhythm4cuts.config.jwt.TokenProvider;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Component
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final TokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;
    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";
    private final List<String> excludedUrlPatterns = Arrays.asList(
            "/member/reissue",
            "/member/login",
            "/member/register"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String path = request.getServletPath();
            boolean isExcludedUrl = excludedUrlPatterns.stream().anyMatch(path::startsWith);

            System.out.println("[출력]");

            System.out.println(path);
            System.out.println(isExcludedUrl);

            //가져온 토큰이 유요한지 확인하고, 유효한 때는 인증 정보 설정
            if (!isExcludedUrl) {
                //요청 헤더의 Authorization(Bearer 액세스 토큰의 키 값) 키의 값 조회
                String authorizationHeader = request.getHeader(HEADER_AUTHORIZATION);
                //가져온 값에서 접두사 제거
                String token = getAccessToken(authorizationHeader);

                System.out.println("만료일 : " + tokenProvider.getExpirationDateFromToken(token));
                System.out.println(tokenProvider.isTokenExpired(token));

                if (tokenProvider.isTokenExpired(token)) {
                    throw new JwtException("access token is expired");
                }

                boolean isTokenValid = tokenProvider.validToken(token);

                if (StringUtils.hasText(token) && isTokenValid) {
                    String email = tokenProvider.getUserId(token);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, null);
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    logger.info("authenticated user " + email + ", setting security context");

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }

            filterChain.doFilter(request, response);
        } catch (JwtException e) {//oauth2.jwtexception
            e.printStackTrace();
            System.out.println("만료됐네요");
        }
    }

    //액세스 토큰(Bearer ~~)에서 "Bearer " 부분 제거하고 토큰 값만 남겨주는 메서드
    private String getAccessToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(TOKEN_PREFIX)) {
            return authorizationHeader.substring(TOKEN_PREFIX.length());
        }

        return null;
    }
//
//    private void setAuthentication(String token) {
//        Authentication authentication = tokenProvider.getAuthentication(token);
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//    }
}
