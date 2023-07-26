package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public interface FilmService {

    public List<FilmDto> getPhotoList(String date);
    public List<BackgroundDto> getBackgroundList();
    public void addPhoto(FilmDto filmDto);
}
