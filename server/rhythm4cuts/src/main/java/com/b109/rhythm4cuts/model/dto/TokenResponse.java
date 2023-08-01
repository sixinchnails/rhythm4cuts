package com.b109.rhythm4cuts.model.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenResponse {
    private String accessToken;
    private String refreshToken;
    private String nickname;
    private int points;
    private int profile_img_seq;
    private int user_seq;
}