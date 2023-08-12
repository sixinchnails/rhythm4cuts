package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.GameImage;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import com.b109.rhythm4cuts.model.repository.FilmRepository;
import com.b109.rhythm4cuts.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class FilmServiceImpl implements FilmService {

    private final FilmRepository filmRepository;
    private final UserRepository userRepository;

    @Value("${photo.storage.path}")
    private String imageStoragePath;

    @Override
    public List<FilmDto> getPhotoList(int year, int month, int day, int page) {
        List<FilmDto> res = new ArrayList<>();
        Pageable pageable = PageRequest.of(page - 1, 10);
        Page<GameImage> gameImages = filmRepository.findByDate(year, month, day, pageable);

        gameImages.forEach(gameImage -> {
            res.add(gameImage.getFilmDto());
        });

        return res;
    }

    @Override
    public List<String> getUserPhotoList(int userSeq) {
        List<String> filmUrls = filmRepository.findByUserSeq(userSeq);

        return filmUrls;
    }

    @Override
    public List<BackgroundDto> getBackgroundList() {
        return null;
    }

    @Override
    public void saveFilm(FilmDto filmInfo) throws IOException {
        GameImage gameImage = new GameImage();
        //User user =  userRepository.findByUserSeq(filmInfo.getUserSeq());
        //GameInfo gameInfo = gameRepository.findByGameSeq(filmDto.getGameSeq());
        //BackGround backGround = backGroundRepository.findByBackGroundSeq(filmDto.getBackGroundSeq());

//        gameImage.setUser(user);
        //gameImage.setGameInfo(gameInfo);
        //gameImage.setBackGround(backGround);
        gameImage.setGameRank(filmInfo.getPlayerRank());
        gameImage.setFileName(generateFileName(filmInfo.getPrivateFilm().getOriginalFilename()));
        gameImage.setTotalFileName("total_" + generateFileName(filmInfo.getCommonFilm().getOriginalFilename()));

        filmRepository.save(gameImage);
        byte[] privateFileData = filmInfo.getPrivateFilm().getBytes();
        byte[] commonFileDate = filmInfo.getCommonFilm().getBytes();


        File folder = new File(imageStoragePath);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        Path privateFilePath = Paths.get(imageStoragePath, gameImage.getFileName());
        Files.write(privateFilePath, privateFileData);

        Path commonFilePath = Paths.get(imageStoragePath, gameImage.getTotalFileName());
        Files.write(commonFilePath, commonFileDate);
    }

    @Override
    public Resource downFilm(String filmName) throws Exception {
        String file = imageStoragePath + "/" + filmName;
        Path filePath = Paths.get(file);
        Resource resource = new InputStreamResource(Files.newInputStream(filePath));

        return resource;
    }

    @Override
    public List<Resource> downDailyFilm(int year, int month, int day, int page) {
        Pageable pageable = PageRequest.of(page - 1, 10);
        Page<GameImage> gameImages = filmRepository.findByDate(year, month, day, pageable);
        List<Resource> resources = new ArrayList<>();

        gameImages.forEach(gameImage -> {
            try {
                Resource resource = downFilm(gameImage.getTotalFileName());
                resources.add(resource);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });

        return resources;
    }


    private String generateFileName(String originalFilename) {
        // 현재 시간 정보
        LocalDateTime now = LocalDateTime.now();

        // 년월일시분초
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String dateTimeStr = now.format(formatter);

        // 8자리 난수 생성
        String randomStr = generateRandomString(8);

        // 확장자 추출 (옵션)
        String fileExtension = "";
        int lastIndex = originalFilename.lastIndexOf('.');
        if (lastIndex >= 0 && lastIndex < originalFilename.length() - 1) {
            fileExtension = originalFilename.substring(lastIndex);
        }

        // 최종 파일 이름: 년월일시분초 + 8자리 난수 + 확장자
        return dateTimeStr + randomStr + fileExtension;
    }

    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomString = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            randomString.append(characters.charAt(random.nextInt(characters.length())));
        }
        return randomString.toString();
    }
}
