package com.b109.rhythm4cuts.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("https://i9b109.p.ssafy.io"); // 특정 패턴 Origin만 허용
        config.addAllowedOriginPattern("http://localhost:3000");
        config.addAllowedHeader(""); // 특정 Header만 허용
        config.addAllowedMethod(""); // 특정 Method만 허용
        config.addExposedHeader("Authorization");

        source.registerCorsConfiguration("/**", config); // corsConfiguration으로 등록록

        return new CorsFilter(source);
    }
}
