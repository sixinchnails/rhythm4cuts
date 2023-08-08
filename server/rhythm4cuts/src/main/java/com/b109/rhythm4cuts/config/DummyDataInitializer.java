package com.b109.rhythm4cuts.config;

import com.b109.rhythm4cuts.model.domain.ProfileImage;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.repository.ProfileImageRepository;
import com.b109.rhythm4cuts.model.repository.UserRepository;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import com.b109.rhythm4cuts.config.WebSecurityConfig.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;
import java.time.LocalDate;

@Component
public class DummyDataInitializer {

    private final UserRepository userRepository;
    private final ProfileImageRepository profileImageRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public DummyDataInitializer(UserRepository userRepository, ProfileImageRepository profileImageRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.profileImageRepository = profileImageRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostConstruct
    public void init() {
        ProfileImage profileImage1 = new ProfileImage();
        profileImage1.setImageName("first profile image");
        profileImage1.setDescription("first image");
        profileImage1.setFileName("first file name");
        profileImageRepository.save(profileImage1);

        ProfileImage profileImage2 = new ProfileImage();
        profileImage2.setImageName("2 profile image");
        profileImage2.setDescription("2 images");
        profileImage2.setFileName("2 file name");
        profileImageRepository.save(profileImage2);

        ProfileImage profileImage3 = new ProfileImage();
        profileImage3.setImageName("3 profile image");
        profileImage3.setDescription("3 image");
        profileImage3.setFileName("3 file name");
        profileImageRepository.save(profileImage3);

        ProfileImage profileImage4 = new ProfileImage();
        profileImage4.setImageName("4 profile image");
        profileImage4.setDescription("4 image");
        profileImage4.setFileName("4 file name");
        profileImageRepository.save(profileImage4);

        ProfileImage profileImage5 = new ProfileImage();
        profileImage5.setImageName("5 profile image");
        profileImage5.setDescription("5 image");
        profileImage5.setFileName("5 file name");
        profileImageRepository.save(profileImage5);

        LocalDate targetDate = LocalDate.of(2019,11,12);
        // 더미 데이터 추가
        User user = new User();
        user.setName("Han");
        user.setNickname("ssafy");
        user.setEmail("ssafy@naver.com");
        user.setProfileImage(profileImage1);
//        user.setBirthDate(targetDate);
        user.setGender("M");
        user.setPassword(bCryptPasswordEncoder.encode("1234"));

        userRepository.save(user);

        User user2 = new User();
        user2.setName("hyun");
        user2.setNickname("hyun");
        user2.setEmail("abc@gmail.com");
        user2.setProfileImage(profileImage1);
//        user2.setBirthDate(targetDate);
        user2.setGender("F");
        user2.setPassword(bCryptPasswordEncoder.encode("1234"));

        userRepository.save(user2);

        User user3 = new User();
        user3.setName("민국");
        user3.setNickname("민국");
        user3.setEmail("acd4548@naver.com");
        user3.setProfileImage(profileImage1);
//        user3.setBirthDate(targetDate);
        user3.setGender("M");
        user3.setPassword(bCryptPasswordEncoder.encode("1234"));
        userRepository.save(user3);

    }
}
