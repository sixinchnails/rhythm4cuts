package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.GameImage;
import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import com.b109.rhythm4cuts.model.repository.FilmCustomRepository;
import com.b109.rhythm4cuts.model.repository.FilmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FilmServiceImpl implements FilmService {

    private final FilmRepository filmRepository;
    private final FilmCustomRepository filmCustomRepository;

    @Override
    public Page<FilmDto> getPhotoList(String createDate, Pageable pageable) {

        // 포맷터 선언
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH-mm-ss");

        // 문자열 -> LocalDateTime
        LocalDateTime fromDate = LocalDateTime.parse(createDate, formatter);
        LocalDateTime toDate = LocalDateTime.parse(createDate, formatter);

        // fromDate, toDate의 시 / 분 / 초 변경
        // 00:00:00
        fromDate = fromDate.withHour(0);
        fromDate = fromDate.withMinute(0);
        fromDate = fromDate.withSecond(0);

        // 23:59:59
        toDate = toDate.withHour(23);
        toDate = toDate.withMinute(59);
        toDate = toDate.withSecond(59);

        Page<GameImage> film = filmRepository.findByCreateDateBetween(fromDate, toDate, pageable);
        Page<FilmDto> res = null;

        return res;
    }

    @Override
    public List<BackgroundDto> getBackgroundList() {
        List<BackgroundDto> background = filmCustomRepository.selectBackgroundList();

        List<BackgroundDto> res = new ArrayList<>();

        return res;
    }

    @Override
    public void addPhoto(FilmDto filmDto) {
        filmCustomRepository.insertPhoto();
    }
}
