package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.UserDto;

public class Utils {
    public static UserDto dtoSetter(User user) {
        UserDto userDto = new UserDto();

        userDto.setUserSeq(user.getUserSeq());
        userDto.setName(user.getName());
        userDto.setNickname(user.getNickname());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setPoint(user.getPoint());
        userDto.setBirthDate(user.getBirthDate());
        userDto.setPlayCount(user.getPlayCount());
        userDto.setScoreSum(user.getScoreSum());

        return userDto;
    }
}
