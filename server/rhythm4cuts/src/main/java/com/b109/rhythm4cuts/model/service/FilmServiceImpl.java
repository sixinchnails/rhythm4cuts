package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import com.b109.rhythm4cuts.model.repository.FilmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FilmServiceImpl implements FilmService {

    private final FilmRepository filmRepository;

    public List<FilmDto> getPhotoList(String createDate) {
        List<FilmDto> film = filmRepository.selectPhotoList(createDate);

        List<FilmDto> res = new ArrayList<>();

        return res;
    }
    public List<BackgroundDto> getBackgroundList() {
        List<BackgroundDto> background = filmRepository.selectBackgroundList();

        List<BackgroundDto> res = new ArrayList<>();

        return res;
    }
    public void addPhoto(FilmDto filmDto) {
        filmRepository.insertPhoto();
    }
}
