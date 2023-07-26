package com.b109.rhythm4cuts.model.repository;


import com.b109.rhythm4cuts.model.domain.Song;
import com.b109.rhythm4cuts.model.domain.User;

import java.util.List;

public interface RankingRepository {

    List<Song> selectSongOrderBYRank();
    List<User> selectUsersOrderByScoreSum();
}
