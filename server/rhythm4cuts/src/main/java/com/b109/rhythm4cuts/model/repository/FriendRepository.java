package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.dto.FriendDto;
import com.b109.rhythm4cuts.model.dto.UserDto;

import java.sql.SQLException;
import java.util.List;

public interface FriendRepository {
    List<UserDto> selectFriendList(int userSeq) throws SQLException;
    List<UserDto> selectSearchFriend(String searchStr) throws SQLException;
    void insertFriend(FriendDto friend) throws SQLException;
    void deleteFriend(FriendDto friend) throws SQLException;
}
