package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.FriendList;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.FriendDto;
import com.b109.rhythm4cuts.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FriendRepositoryImpl implements FriendRepository{

    private final EntityManager em;
    @Override
    public List<UserDto> selectFriendList(int userSeq) throws SQLException {
        //select u from friendList as f join user as u on f.to_user = u.user_seq where f.from_user = userSeq
        String jpql = "SELECT u FROM FriendList f JOIN f.toUser u WHERE f.fromUser.userSeq = :userSeq";
        List<User> users = em.createQuery(jpql, User.class)
                .setParameter("userSeq", userSeq)
                .getResultList();
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
    public List<UserDto> selectSearchFriend(String searchStr) throws SQLException {
        //select u from user as u where u.nickname like 'searchStr%'
        String jpql = "SELECT u FROM User u WHERE u.nickname LIKE :searchStr";
        List<User> users = em.createQuery(jpql, User.class)
                .setParameter("searchStr", searchStr)
                .getResultList();
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
    public void insertFriend(FriendDto friend) throws SQLException {
        User fromUser = em.find(User.class, friend.getFromUser());
        User toUser = em.find(User.class, friend.getToUser());

        FriendList friendList = new FriendList();

        friendList.setFromUser(fromUser);
        friendList.setToUser(toUser);
        em.persist(friendList);
    }

    @Override
    public void deleteFriend(FriendDto friend) throws SQLException {

    }
}
