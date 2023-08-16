package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.LyricsDto;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public interface LyricsService {

    LyricsDto selectLyricTime(int songSeq);
}
