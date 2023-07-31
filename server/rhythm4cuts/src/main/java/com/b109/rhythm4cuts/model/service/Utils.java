package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.UserDto;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

    public static LocalDate fn_getDateOfBirth(String str1, String str2){
        int divisionCode = Integer.parseInt(str2.substring(0, 1));
        String dateOfBirth = null;
        if(divisionCode == 1 || divisionCode == 2 || divisionCode == 5 || divisionCode == 6){
            // 한국인 1900~, 외국인 1900~
            dateOfBirth = "19"+str1;
        }else if(divisionCode == 3 || divisionCode == 4 || divisionCode == 7 || divisionCode == 8){
            // 한국인 2000~, 외국인 2000~
            dateOfBirth = "20"+str1;
        }else if(divisionCode == 9 || divisionCode == 0){
            // 한국인 1800~
            dateOfBirth = "18"+str1;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate birthDate = LocalDate.parse(dateOfBirth, formatter);

        return birthDate;
    }
}
