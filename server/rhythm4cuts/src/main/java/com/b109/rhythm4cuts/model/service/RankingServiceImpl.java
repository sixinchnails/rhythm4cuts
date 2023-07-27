package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.Song;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.SongDto;
import com.b109.rhythm4cuts.model.dto.UserDto;
import com.b109.rhythm4cuts.model.repository.RankingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService{
    private final RankingRepository rankingRepository;

    @Override
    public List<SongDto> getSongRank() {
        List<Song> songRanking = rankingRepository.selectSongOrderBYRank();
        List<SongDto> songs = new ArrayList<>();
        songRanking.forEach(song -> {
            songs.add(song.getSongDto());
        });
        return songs;
    }

    @Override
    public List<UserDto> getUserRank() {
        List<User> users = rankingRepository.selectUsersOrderByScoreSum();
        List<UserDto> res = new ArrayList<>();
        users.forEach(user->{
            res.add(user.getUserDto());
        });

        return res;
    }
}
