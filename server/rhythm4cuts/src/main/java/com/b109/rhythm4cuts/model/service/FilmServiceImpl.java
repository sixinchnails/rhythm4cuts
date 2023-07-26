package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FilmServiceImpl implements FilmService {

    public List<FilmDto> getPhotoList(String date) {

        List<FilmDto> res = new ArrayList<>();

        return res;
    }
    public List<BackgroundDto> getBackgroundList() {

        List<BackgroundDto> res = new ArrayList<>();

        return res;
    }
    public void addPhoto(FilmDto filmDto) {

    }
}
