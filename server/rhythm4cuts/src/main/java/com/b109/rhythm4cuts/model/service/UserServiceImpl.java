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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import static com.b109.rhythm4cuts.model.service.Utils.fn_getDateOfBirth;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ProfileImageRepository profileImageRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenService tokenService;
    private final JavaMailSender javaMailSender;

    //임시 비밀번호 size 크기로 생성
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

    //중복 닉네임 존재 여부 메서드
    public boolean duplicateNickname(String nickname) {
        return (userRepository.findByNickname(nickname).isPresent())? true:false;
    }

    //닉네임으로 사용자 객체를 찾는 메서드
    public UserDto findByNickname(String nickname) {
        User user = userRepository.findByNickname(nickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임을 가진 사용자가 존재하지 않습니다."));

        UserDto userDto = Utils.dtoSetter(user);

        return userDto;
    }

    //이메일로 사용자 객체를 찾는 메서드
    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 사용자가 존재하지 않습니다."));

        UserDto userDto = Utils.dtoSetter(user);

        return userDto;
    }

    //회원가입 및 회원 객체 DB 저장 메서드
    public String save(AddUserRequest dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        String prefix = dto.getSsn().split("-")[0], postfix = dto.getSsn().split("-")[1];
        user.setBirthDate(fn_getDateOfBirth(prefix, postfix));
        user.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        user.setNickname(dto.getNickname());

        return userRepository.save(user).getEmail();
    }

    //포인트 반환 메서드
    public int getPoint(String email) {
        return userRepository.findByEmail(email).get().getPoint();
    }
    
    //프로필 이미지 반환 메서드
    public String getProfileImg(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow();

        String profileImg = String.valueOf(user.getProfileImage().getProfileImageSeq());

        return (profileImg == null)? "No img" : profileImg;
    }

    //프로필 사진 변경 메서드
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

    //닉네임 변경 메서드
    public void updateNickname(UpdateUserNicknameDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow();

        user.setNickname(dto.getNickname());

        userRepository.save(user);
    }

    //비밀번호 변경 메서드
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

    //로그인 메서드
    public UserDto login(LoginDto loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException());

        System.out.println("비밀번호 체크");
                
        System.out.println(loginDto.getPassword());
        System.out.println(user.getPassword());
        
        if (!bCryptPasswordEncoder.matches(loginDto.getPassword(), user.getPassword())) throw new IllegalArgumentException();

        UserDto userDto = Utils.dtoSetter(user);

        return userDto;
    }

    //로그아웃 메서드(상태 변환)
    public void logout() {}

    //포인트 결제 메서드
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

    //비밀번호 찾기 메서드 (SMTP 사용)
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
        javaMailSender.send(message);
    }
}