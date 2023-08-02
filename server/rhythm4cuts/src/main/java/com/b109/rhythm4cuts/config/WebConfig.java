package com.b109.rhythm4cuts.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
//                        .allowedOriginPatterns("*") // 해당 주소를 넣어도 가능
                        .allowedHeaders("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH");
//                        .exposedHeaders("Authorization", "RefreshToken");
//                        .allowCredentials(true); // allowedOriginPattern("*") // 해당 코드 작성 시, 에러 발생 (실행 X)
            }
        };
    }
}
