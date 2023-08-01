package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import com.b109.rhythm4cuts.model.repository.FilmCustomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FilmServiceImpl implements FilmService {

    private final FilmCustomRepository filmCustomRepository;

    @Override
    public Page<FilmDto> getPhotoList(String createDate) {
        Page<FilmDto> film = filmCustomRepository.selectPhotoList(createDate);

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
