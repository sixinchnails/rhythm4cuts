package com.b109.rhythm4cuts.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDto {
    private int userSeq;
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String birthDate;
    private int point;
    private int playCount;
    private int scoreSum;
}
