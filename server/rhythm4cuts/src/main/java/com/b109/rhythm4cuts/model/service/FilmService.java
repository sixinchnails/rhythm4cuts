package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Transactional
@Service
public interface FilmService {

    Page<FilmDto> getPhotoList(LocalDateTime createDate);
    List<BackgroundDto> getBackgroundList();
    void addPhoto(FilmDto filmDto);
}
