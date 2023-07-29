package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.ProfileImage;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.*;
import com.b109.rhythm4cuts.model.repository.ProfileImageRepository;
import com.b109.rhythm4cuts.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ProfileImageRepository profileImageRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenService tokenService;
    private final JavaMailSender javaMailSender;

    public String getRandomPassword(int size) {
        char[] charSet = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        int len = charSet.length;

        for (int i = 0; i < size; i++) {
            idx = sr.nextInt(len);

            sb.append(charSet[idx]);
        }

        return sb.toString();
    }

    //id로 사용자 객체를 찾는 메서드
    public UserDto findById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("id: " + userId + " 사용자를 찾을 수 없습니다."));

        UserDto userDto = Utils.dtoSetter(user);

        return userDto;
    }

    public boolean duplicateNickname(String nickname) {
        return (userRepository.findByNickname(nickname).isPresent())? true:false;
    }

    public UserDto findByNickname(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임을 가진 사용자가 존재하지 않습니다."));

        UserDto userDto = Utils.dtoSetter(user);

        return userDto;
    }

    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 사용자가 존재하지 않습니다."));

        UserDto userDto = Utils.dtoSetter(user);

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
        System.out.println("이메일:" + email);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        return user.getEmail();
    }

    //프로필 사진 변경
    public void patchProfileImg(UpdateProfileImgDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException());

        ProfileImage profileImage = user.getProfileImage();

        profileImage.setImageName(dto.getImageName());
        profileImage.setProfileImageSeq(dto.getProfileImageSeq());
        profileImage.setDescription(dto.getDescription());
        profileImage.setFileName(dto.getFileName());

        userRepository.save(user);
        profileImageRepository.save(profileImage);
    }

    //닉네임 변경
    public void updateNickname(UpdateUserNicknameDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow();

        user.setNickname(dto.getNickname());

        userRepository.save(user);
    }

    public void updatePassword(String accessToken, UpdateUserPasswordDto dto) {
        if (!tokenService.validToken(accessToken)) throw new IllegalArgumentException();

        String email = tokenService.getUserId(accessToken);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException());

        //새로 바꾸고 싶은 비밀번호(raw)
        String newPassword = dto.getNewPassword();
        //사용자가 입력한 이전 비밀번호(raw)
        String oldPassword = dto.getOldPassword();
        //데이터베이스에 저장된 비밀번호(encoded)
        String currentPassword = user.getPassword();

        //사용자가 입력한 이전 비밀번호가 현재 비밀번호와 일치하지 않는 경우
        if (!bCryptPasswordEncoder.matches(oldPassword, currentPassword)) throw new IllegalArgumentException();
        
        //비밀번호 조건 충족 여부 추가할 위치
        //ex) if (newPassword.length() == 0) throw new WrongPasswordFormatException();
        
        user.setPassword(bCryptPasswordEncoder.encode(newPassword));

        userRepository.save(user);
    }

    public UserDto login(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException());

        if (!bCryptPasswordEncoder.matches(loginDto.getPassword(), user.getPassword())) throw new IllegalArgumentException();

        UserDto userDto = Utils.dtoSetter(user);

        return userDto;
    }

    //상태 변환
    public void logout() {}

    public long payPoints(PayDto payDto) {
        User user = userRepository.findByEmail(payDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException());

        int userPoint = user.getPoint(), payPoints = payDto.getPayPoints();

        //가진 포인트보다 많이 결제하려면 예외 발생
        if (userPoint < payPoints) throw new IllegalArgumentException();

        user.setPoint(user.getPoint() - payDto.getPayPoints());

        //update
        userRepository.save(user);

        return user.getPoint();
    }

    public void findPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException());

        //15 자리 임시 비밀번호 생성
        String tempPassword = getRandomPassword(15);

        user.setPassword(tempPassword);

        userRepository.save(user);
    }

    public MailDto createMailAndChangePassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException());

        String tempPassword = getRandomPassword(15);

        MailDto mailDto = new MailDto();
        mailDto.setAddress(new String[] {email});
        mailDto.setTitle("Rhythm4Cuts 임시 비밀번호 발급 안내 메일입니다.");
        mailDto.setContent("안녕하세요. Rhythm4Cuts 로그인을 위한 임시 비밀번호 발급드립니다. 회원님의 임시 비밀번호는 " + tempPassword + "입니다.");

        user.setPassword(tempPassword);
        userRepository.save(user);

        return mailDto;
    }

    public void sendEmail(MailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getContent());
        message.setFrom("dropice@naver.com");
        message.setReplyTo("dropice@naver.com");

        System.out.println("이메일");
                
        System.out.println(mailDto);
        System.out.println(message);

        javaMailSender.send(message);
    }
}