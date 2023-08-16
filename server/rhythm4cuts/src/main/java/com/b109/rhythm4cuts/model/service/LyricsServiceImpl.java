package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.Lyrics;
import com.b109.rhythm4cuts.model.dto.LyricsDto;
import com.b109.rhythm4cuts.model.repository.LyricsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LyricsServiceImpl implements LyricsService {

    private final LyricsRepository lyricsRepository;

    @Override
    public LyricsDto selectLyricTime(int songSeq) {

        Lyrics lyrics = lyricsRepository.selectLyricBySongSeq(songSeq);
        LyricsDto lyricsDto = lyrics.getLyricsDto();

        return lyricsDto;
    }
}
