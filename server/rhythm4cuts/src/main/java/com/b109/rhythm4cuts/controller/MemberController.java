package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.config.jwt.TokenProvider;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.*;

import com.b109.rhythm4cuts.model.service.UserService;
import com.b109.rhythm4cuts.model.dto.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/member")
public class MemberController {
    private final UserService userService;

    public Map<String, Object> commonEmail(String email) {
        UserDto userDto = userService.findByEmail(email);
        Map<String, Object> res = new HashMap<>();

        res.put("point", userDto.getPoint());
        res.put("nickname", userDto.getNickname());
        res.put("name", userDto.getName());
        res.put("user_seq", userDto.getUserSeq());

        return res;
    }

    public Map<String, Object> commonNickname(String nickname) {
        UserDto userDto = userService.findByNickname(nickname);
        Map<String, Object> res = new HashMap<>();

        res.put("point", userDto.getPoint());
        res.put("nickname", userDto.getNickname());
        res.put("name", userDto.getName());
        res.put("user_seq", userDto.getUserSeq());

        return res;
    }

    //API 1. POST 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginDto loginDto) {
        //로그인을 시도한 이메일로 사용자 조회
        UserDto userDto = userService.login(loginDto);
        //액세스 토큰의 유효 시간 30분으로 설정
        TokenResponse tokenResponse = userService.generateToken(userDto);
        //Map<String, Object> res = commonEmail(loginDto.getEmail());

        return ResponseEntity.ok()
                .body(tokenResponse);
    }

    @GetMapping("/info")
    public Map<String, Object> info(@RequestParam String email) {
        return commonEmail(email);
    }

    //API 2. POST 회원가입
    @PostMapping("/register")
    @Transactional
    public ResponseEntity register(@RequestBody AddUserRequest request) {
        userService.save(request);
        Map<String, Object> res = commonEmail(request.getEmail());

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //이메일 인증 번호 발송 API
    @PostMapping("/mail")
    public ResponseEntity mail(@RequestParam String email) {
        MailDto mailDto = userService.createMailAndCertificate(email);

        userService.sendEmail(mailDto);

        return ResponseEntity.status(200).build();
    }

    //이메일 인증 번호 확인
    @PostMapping("/mailcheck")
    public ResponseEntity mailCheck(@RequestBody CertificateDto certificateDto) {
        boolean checked = userService.checkCertificate(certificateDto);

        return ResponseEntity.status(200).body(
                Map.of("checked", checked)
        );
    }

    //닉네임 중복
    @GetMapping("/nickname")
    public ResponseEntity nickname(@RequestParam String nickname) {
        //409 if duplicate exists
        return ResponseEntity.status(200).body(Map.of("duplicate", userService.duplicateNickname(nickname)));
    }

    //이메일 중복
    @GetMapping("/email")
    public ResponseEntity email(@RequestParam String email) {
        UserDto userDto = userService.findByEmail(email);
        Map<String, Object> res = commonEmail(email);

        return ResponseEntity.status(200).build();
    }

    //나의 사진 조회
    @GetMapping("/profile")
    public ResponseEntity getProfile(@RequestParam String email) {
        UserDto userDto = userService.findByEmail(email);
        Map<String, Object> res = commonEmail(email);

        res.put("file_name", userService.getProfileImg(email));

        return ResponseEntity.status(200).body(res);
    }

    //포인트 로그 조회
    @GetMapping("/point")
    public ResponseEntity getPoint(@RequestParam String email) {
        UserDto userDto = userService.findByEmail(email);
        Map<String, Object> res = commonEmail(email);

        return ResponseEntity.status(200).body(res);
    }

    //프로필 이미지 변경
    @PatchMapping("/profile")
    public ResponseEntity updateProfileImg(@RequestBody UpdateProfileImgDto dto) {
        userService.patchProfileImg(dto);

        return ResponseEntity.status(200).build();
    }

    //닉네임 변경
    @PatchMapping("/nickname")
    public ResponseEntity updateNickname(@RequestBody UpdateUserNicknameDto dto){
        userService.updateNickname(dto);

        return ResponseEntity.status(200).build();
    }

    //비밀번호 변경
    @PatchMapping("/pw")
    public ResponseEntity updatePassword(@RequestBody UpdateUserPasswordDto dto) {
        userService.updatePassword(dto);

        return ResponseEntity.status(200).build();
    }

    //포인트 결제
    @PostMapping("/pay")
    public ResponseEntity payPoints(@RequestBody PayDto payDto) {
        long leftPoints = userService.payPoints(payDto);

        //잔여 포인트 반환
        return ResponseEntity.status(200).body(Map.of("point", leftPoints));
    }

    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity logout(@RequestBody LogoutDto logoutDto) {
        //상태 변경할 예정

        userService.logout(logoutDto);

        return ResponseEntity.status(200).build();
    }

    //비밀번호 찾기
    @Transactional
    @PostMapping("/pw")
    public ResponseEntity findPassword(@RequestParam String email) {
        UserDto userDto = userService.findByEmail(email);

        MailDto mailDto = userService.createMailAndChangePassword(email);
        userService.sendEmail(mailDto);

        return ResponseEntity.status(200).build();
    }

    @PostMapping(value = "/reissue")
    public ResponseEntity<?> reissueAuthenticationToken(@RequestBody TokenRequestDto tokenRequestDto) {
        return userService.reissueAuthenticationToken(tokenRequestDto);
    }
}