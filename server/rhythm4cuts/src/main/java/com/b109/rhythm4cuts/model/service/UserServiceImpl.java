package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.AddUserRequest;

import com.b109.rhythm4cuts.model.dto.UpdateProfileImgDto;
import com.b109.rhythm4cuts.model.dto.UserDto;
import com.b109.rhythm4cuts.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //User -> UserDto로 변환시켜주는 메서드
    public UserDto dtoSetter(User user) {
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

    //id로 사용자 객체를 찾는 메서드
    public UserDto findById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("id: " + userId + " 사용자를 찾을 수 없습니다."));

        UserDto userDto = dtoSetter(user);

        return userDto;
    }

    public boolean duplicateNickname(String nickname) {
        return (userRepository.findByNickname(nickname).isPresent())? true:false;
    }

    public UserDto findByNickname(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임을 가진 사용자가 존재하지 않습니다."));

        UserDto userDto = dtoSetter(user);

        return userDto;
    }

    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 사용자가 존재하지 않습니다."));

        UserDto userDto = dtoSetter(user);

        return userDto;
    }

    //회원가입
    public String save(AddUserRequest dto) {
        User member = new User();
        member.setEmail(dto.getEmail());
        member.setPassword(dto.getPassword());

        return userRepository.save(member).getEmail();
    }

    //포인트 반환
    public int getPoint(String email) {
        return userRepository.findByEmail(email).get().getPoint();
    }

    public String getProfileImg(String email) {
        return userRepository.findByEmail(email).get().getProfileImage().getFileName();
    }

    public String patchProfileImg(UpdateProfileImgDto dto) {
        return "";
    }
}