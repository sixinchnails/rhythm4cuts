package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.Lyrics;

public interface LyricsRepository {

    Lyrics selectLyricBySongSeq(int songSeq);
}
