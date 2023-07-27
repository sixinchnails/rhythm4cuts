package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.SongDto;
import com.b109.rhythm4cuts.model.dto.UserDto;

import java.util.List;

public interface RankingService {
    List<SongDto> getSongRank();
    List<UserDto> getUserRank();
}
