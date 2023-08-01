package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.dto.BackgroundDto;
import com.b109.rhythm4cuts.model.dto.FilmDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository
@RequiredArgsConstructor
public class FilmCustomRepositoryImpl implements FilmCustomRepository {

    @Override
    public List<BackgroundDto> selectBackgroundList() {
        return null;
    }

    @Override
    public void insertPhoto() {

    }
}
