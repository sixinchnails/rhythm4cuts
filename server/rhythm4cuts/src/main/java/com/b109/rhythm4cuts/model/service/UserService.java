package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.*;
import org.hibernate.sql.Update;

public interface UserService {
    // Find a user by their ID
    UserDto findById(Long userId);

    // Find a user by their nickname
    UserDto findByNickname(String nickname);

    boolean duplicateNickname(String nickname);

    // Find a user DTO (Data Transfer Object) by their email
    UserDto findByEmail(String email);

    int getPoint(String email);

    // Save a new user with the provided information
    String save(AddUserRequest dto);

    String getProfileImg(String email);

    void patchProfileImg(UpdateProfileImgDto dto);

    void updateNickname(UpdateUserNicknameDto dto);

    void updatePassword(String accessToken, UpdateUserPasswordDto dto);

    //상태 변환만 할 예정
    void logout();

    UserDto login(LoginDto loginDto);

    long payPoints(PayDto payDto);

    void findPassword(String email);
}
