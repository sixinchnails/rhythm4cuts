package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.GameInfo;
import com.b109.rhythm4cuts.model.domain.Song;
import com.b109.rhythm4cuts.model.dto.LobbyDto;

import java.sql.SQLException;
import java.util.List;

public interface LobbyRepository {

    List<GameInfo> selectLobbyList() throws SQLException;
    GameInfo selectSeqLobby(int gameSeq) throws SQLException;
    List<GameInfo> selectTitleLobbyList(String title) throws SQLException;
    void insertGameRoom(LobbyDto lobbyDto) throws SQLException;
    List<Song> selectSongTitleList(String title) throws SQLException;
    GameInfo selectPw(int gameSeq) throws SQLException;
}
