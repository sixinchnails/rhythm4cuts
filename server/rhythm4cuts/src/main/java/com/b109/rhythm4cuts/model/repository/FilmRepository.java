package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;

import java.util.List;

public interface FilmRepository {

    public List<FilmDto> selectPhotoList(String createDate);
    public List<BackgroundDto> selectBackgroundList();
    public void insertPhoto();
}
