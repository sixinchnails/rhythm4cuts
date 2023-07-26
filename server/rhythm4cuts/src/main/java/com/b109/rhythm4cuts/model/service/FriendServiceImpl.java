package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.FriendDto;
import com.b109.rhythm4cuts.model.dto.UserDto;
import com.b109.rhythm4cuts.model.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService{

    FriendRepository friendRepository;
    @Override
    public List<UserDto> getFriendList(int userSeq) throws Exception {
        List<User> users = friendRepository.selectFriendList(userSeq);

        List<UserDto> res = new ArrayList<>();
        users.forEach(user->{
            UserDto userDto = new UserDto();
            userDto.setName(user.getName());
            userDto.setNickname(user.getNickname());
            userDto.setUserSeq(user.getUserSeq());
            res.add(userDto);
        });

        return res;
    }

    @Override
    public List<UserDto> userSearch(String searchStr) throws Exception {
        List<User> users = friendRepository.selectSearchFriend(searchStr);
        List<UserDto> res = new ArrayList<>();
        users.forEach(user->{
            UserDto userDto = new UserDto();
            userDto.setName(user.getName());
            userDto.setNickname(user.getNickname());
            userDto.setUserSeq(user.getUserSeq());
            res.add(userDto);
        });

        return res;
    }

    @Override
    public List<UserDto> getRequestFriendList(int userSeq) throws Exception {
        List<User> users = friendRepository.selectRequestFriendList(userSeq);
        List<UserDto> res = new ArrayList<>();
        users.forEach(user->{
            UserDto userDto = new UserDto();
            userDto.setName(user.getName());
            userDto.setNickname(user.getNickname());
            userDto.setUserSeq(user.getUserSeq());
            res.add(userDto);
        });

        return res;
    }

    @Override
    public void addFriend(FriendDto friend) throws Exception {
        friendRepository.updateRequestFriendToConfirm(friend.getFromUser(), friend.getToUser());
        friendRepository.insertFriend(friend.getFromUser(), friend.getToUser());
        friendRepository.insertFriend(friend.getToUser(), friend.getFromUser());
    }

    @Override
    public void requestFriend(FriendDto friendDto) throws Exception {
        friendRepository.insertRequestFriend(friendDto.getFromUser(), friendDto.getToUser());
    }

    @Override
    public void rejectFriend(FriendDto friendDto) throws Exception {
        friendRepository.updateRequestFriendToReject(friendDto.getFromUser(), friendDto.getToUser());
    }

    @Override
    public void deleteFriend(int userSeq1, int userSeq2) throws Exception {
        friendRepository.deleteFriend(userSeq1, userSeq2);
        friendRepository.deleteFriend(userSeq2, userSeq1);
    }
}
