//package com.b109.rhythm4cuts.config;
//
//import com.b109.rhythm4cuts.model.domain.ProfileImage;
//import com.b109.rhythm4cuts.model.domain.User;
//import com.b109.rhythm4cuts.model.repository.FriendRepository;
//import com.b109.rhythm4cuts.model.repository.ProfileImageRepository;
//import com.b109.rhythm4cuts.model.repository.UserRepository;
//import com.b109.rhythm4cuts.model.service.MelonService;
//import com.b109.rhythm4cuts.model.service.MusicService;
//import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.stereotype.Component;
//import com.b109.rhythm4cuts.config.WebSecurityConfig.*;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//import javax.annotation.PostConstruct;
//import javax.transaction.Transactional;
//import java.sql.SQLException;
//import java.time.LocalDate;
//
//@Component
//public class DummyDataInitializer {
//
//    private final UserRepository userRepository;
//    private final ProfileImageRepository profileImageRepository;
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//    private final FriendRepository friendRepository;
//
//    private final MelonService melonService;
//    private final MusicService musicService;
//
//    public DummyDataInitializer(UserRepository userRepository, ProfileImageRepository profileImageRepository,
//                                BCryptPasswordEncoder bCryptPasswordEncoder
//    , FriendRepository friendRepository, MelonService melonService, MusicService musicService) {
//        this.userRepository = userRepository;
//        this.profileImageRepository = profileImageRepository;
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//        this.friendRepository = friendRepository;
//        this.melonService = melonService;
//        this.musicService = musicService;
//    }
//
//
//
//    @PostConstruct
//    @Transactional
//    public void init() throws SQLException {
//        ProfileImage profileImage1 = new ProfileImage();
//        profileImage1.setImageName("first profile image");
//        profileImage1.setDescription("first image");
//        profileImage1.setFileName("first file name");
//        profileImageRepository.save(profileImage1);
//
//        ProfileImage profileImage2 = new ProfileImage();
//        profileImage2.setImageName("2 profile image");
//        profileImage2.setDescription("2 images");
//        profileImage2.setFileName("2 file name");
//        profileImageRepository.save(profileImage2);
//
//        ProfileImage profileImage3 = new ProfileImage();
//        profileImage3.setImageName("3 profile image");
//        profileImage3.setDescription("3 image");
//        profileImage3.setFileName("3 file name");
//        profileImageRepository.save(profileImage3);
//
//        ProfileImage profileImage4 = new ProfileImage();
//        profileImage4.setImageName("4 profile image");
//        profileImage4.setDescription("4 image");
//        profileImage4.setFileName("4 file name");
//        profileImageRepository.save(profileImage4);
//
//        ProfileImage profileImage5 = new ProfileImage();
//        profileImage5.setImageName("5 profile image");
//        profileImage5.setDescription("5 image");
//        profileImage5.setFileName("5 file name");
//        profileImageRepository.save(profileImage5);
//
//        LocalDate targetDate = LocalDate.of(2019,11,12);
//        // 더미 데이터 추가
//        User user = new User();
//        user.setName("Han");
//        user.setNickname("ssafy");
//        user.setEmail("ssafy@naver.com");
//        user.setProfileImage(profileImage1);
//        user.setGender("M");
//        user.setPassword(bCryptPasswordEncoder.encode("1234"));
//
//        userRepository.save(user);
//
//        User user2 = new User();
//        user2.setName("hyun");
//        user2.setNickname("hyun");
//        user2.setEmail("abc@gmail.com");
//        user2.setProfileImage(profileImage1);
//        user2.setPassword(bCryptPasswordEncoder.encode("1234"));
//        user2.setGender("F");
//
//        userRepository.save(user2);
//
//        User user3 = new User();
//        user3.setName("민국");
//        user3.setNickname("민국");
//        user3.setEmail("acd4548@naver.com");
//        user3.setProfileImage(profileImage1);
////        user3.setBirthDate(targetDate);
//        user3.setGender("M");
//        user3.setPassword(bCryptPasswordEncoder.encode("1234"));
//        userRepository.save(user3);
//
//        User user4 = new User();
//        user4.setName("강현");
//        user4.setNickname("현");
//        user4.setEmail("a@naver.com");
//        user4.setProfileImage(profileImage1);
////        user4.setBirthDate(targetDate);
//        user4.setGender("F");
//        user4.setPoint(1200);
//        user4.setPassword(bCryptPasswordEncoder.encode("1234"));
//        userRepository.save(user4);
//
//        User user5 = new User();
//        user5.setName("홍유빈");
//        user5.setNickname("홍유콩");
//        user5.setEmail("ab@naver.com");
//        user5.setProfileImage(profileImage2);
////        user5.setBirthDate(targetDate);
//        user5.setGender("M");
//        user5.setPoint(1000);
//        user5.setPassword(bCryptPasswordEncoder.encode("1234"));
//        userRepository.save(user5);
//
//        User user6 = new User();
//        user6.setName("최재용");
//        user6.setNickname("최재드래곤");
//        user6.setEmail("b@naver.com");
//        user6.setProfileImage(profileImage3);
////        user6.setBirthDate(targetDate);
//        user6.setGender("M");
//        user6.setPoint(800);
//        user6.setPassword(bCryptPasswordEncoder.encode("1234"));
//        userRepository.save(user6);
//
//        User user7 = new User();
//        user7.setName("최한윤");
//        user7.setNickname("최고다한윤");
//        user7.setEmail("bc@naver.com");
//        user7.setProfileImage(profileImage3);
////        user7.setBirthDate(targetDate);
//        user7.setGender("F");
//        user7.setPoint(600);
//        user7.setPassword(bCryptPasswordEncoder.encode("1234"));
//        userRepository.save(user7);
//
//        User user8 = new User();
//        user8.setName("강현");
//        user8.setNickname("현순");
//        user8.setEmail("z@naver.com");
//        user8.setProfileImage(profileImage1);
////        user8.setBirthDate(targetDate);
//        user8.setGender("F");
//        user8.setPoint(1100);
//        user8.setPassword(bCryptPasswordEncoder.encode("1234"));
//        userRepository.save(user8);
//
//        // Melon Top 100 Dummy Data
//        try {
//            melonService.clearMelonChart();
//            melonService.scrapeAndSaveMelonChart();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        // Youtube Music(Super Shy, Candy, 사건의 지평선, 사랑은 늘 도망가, 잠깐 시간 될까) Dummy Data
//        String[] url = { "https://www.youtube.com/watch?v=8-HPStXQ4tY",
//                "https://www.youtube.com/watch?v=DalyHh0PYoo",
//                "https://www.youtube.com/watch?v=Qj1Gt5z4zxo",
//                "https://www.youtube.com/watch?v=fmiEetlCGtA",
//                "https://www.youtube.com/watch?v=8-9iT2Z8CLY" };
//
//        for (int i = 0; i < url.length; i++) {
//            musicService.saveMusic(url[i]);
//        }
//    }
//
//
//}
