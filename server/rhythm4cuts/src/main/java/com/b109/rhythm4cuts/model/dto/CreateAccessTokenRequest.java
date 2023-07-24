package com.b109.rhythm4cuts.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccessTokenRequest {
    //토큰을 만드려는 사용자 닉네임
    private String nickname;
    private String refreshToken;
}
