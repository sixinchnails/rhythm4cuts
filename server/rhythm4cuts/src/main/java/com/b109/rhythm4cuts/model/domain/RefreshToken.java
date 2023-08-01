//package com.b109.rhythm4cuts.model.domain;
//
//import lombok.AccessLevel;
//import lombok.Generated;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.springframework.data.redis.core.RedisHash;
//import org.springframework.stereotype.Indexed;
//
//import javax.persistence.*;
//
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@Getter
//@Entity
////레디스에서 14일 유지
//@RedisHash(value = "jwtToken", timeToLive = 60 * 60 * 24 * 14)
//public class RefreshToken {
//    //email? seq?
//    @Id
//    private String id;
//    private String refreshToken;
//    private String accessToken;
//
//    public RefreshToken(String id, String accessToken, String refreshToken) {
//        this.id = id;
//        this.accessToken = accessToken;
//        this.refreshToken = refreshToken;
//    }
//
//    public RefreshToken update(String newRefreshToken) {
//        this.refreshToken = newRefreshToken;
//        return this;
//    }
//}
