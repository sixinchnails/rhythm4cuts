package com.b109.rhythm4cuts.service;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.AddUserRequest;
import com.b109.rhythm4cuts.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    //id로 사용자 객체를 찾는 메서드
    public User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("id: " + userId + " 사용자를 찾을 수 없습니다."));
    }

    public User findByNickname(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);

        //중복 처리 API로 변경 필요
        if (user.isPresent()) {
            throw new IllegalArgumentException(nickname + "은 중복된 닉네임입니다.");
        }

        return user.get();
    }

    public User findByEmail(String email) {
        User member = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException());

        return member;
    }

    //회원가입
    public String save(AddUserRequest dto) {
        User member = new User();
        member.setEmail(dto.getEmail());
        member.setPassword(dto.getPassword());

        return userRepository.save(member).getEmail();
    }
}