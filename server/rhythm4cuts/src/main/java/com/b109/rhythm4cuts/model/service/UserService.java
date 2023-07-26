package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.AddUserRequest;
import com.b109.rhythm4cuts.model.dto.UserDto;

public interface UserService {
    // Find a user by their ID
    UserDto findById(Long userId);

    // Find a user by their nickname
    UserDto findByNickname(String nickname);

    boolean duplicateNickname(String nickname);

    // Find a user DTO (Data Transfer Object) by their email
    UserDto findByEmail(String email);

    // Save a new user with the provided information
    String save(AddUserRequest dto);
}
