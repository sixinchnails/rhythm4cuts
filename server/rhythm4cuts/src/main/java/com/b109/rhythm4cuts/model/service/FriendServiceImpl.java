package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.dto.FriendDto;
import com.b109.rhythm4cuts.model.dto.UserDto;
import com.b109.rhythm4cuts.model.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService{

    FriendRepository friendRepository;
    @Override
    public List<UserDto> getFriendList(int userSeq) throws Exception {
        return friendRepository.selectFriendList(userSeq);
    }

    @Override
    public List<UserDto> userSearch(String searchStr) throws Exception {
        return friendRepository.selectSearchFriend(searchStr);
    }

    @Override
    public void addFriend(FriendDto friend) throws Exception {
        friendRepository.insertFriend(friend);
    }

    @Override
    public void deleteFriend(FriendDto friend) throws Exception {
        friendRepository.deleteFriend(friend);
    }
}
