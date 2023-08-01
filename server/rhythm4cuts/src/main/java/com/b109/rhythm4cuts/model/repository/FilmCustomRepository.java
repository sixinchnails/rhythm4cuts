package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FilmCustomRepository {

    List<BackgroundDto> selectBackgroundList();
    void insertPhoto();
}
