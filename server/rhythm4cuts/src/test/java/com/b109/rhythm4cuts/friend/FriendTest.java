package com.b109.rhythm4cuts.friend;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.dto.FriendDto;
import com.b109.rhythm4cuts.model.dto.UserDto;
import com.b109.rhythm4cuts.model.repository.FriendRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.List;

@SpringBootTest
public class FriendTest {

    @Autowired
    FriendRepository friendRepository;

    @PersistenceContext
    EntityManager em;

    @Transactional
    @Rollback(false)
    @Test
    void addFriendTest() {
        User user1 = new User();
        user1.setName("1");
        User user2 = new User();

        em.persist(user1);
        em.persist(user2);
        FriendDto friendDto = new FriendDto();
        friendDto.setFromUser(user1.getUserSeq());
        friendDto.setToUser(user2.getUserSeq());
        try {
            friendRepository.insertFriend(user1.getUserSeq(), user2.getUserSeq());
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
