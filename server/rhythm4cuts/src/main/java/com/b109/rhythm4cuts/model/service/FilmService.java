package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Transactional
@Service
public interface FilmService {

    public List<FilmDto> getPhotoList(int year, int month, int day);
    public List<BackgroundDto> getBackgroundList();
    public void saveFilm(FilmDto filmInfo) throws IOException;
    public Resource downFilm(String filmName) throws Exception;
    public List<Resource> downDailyFilm(int year, int month, int day);
}
