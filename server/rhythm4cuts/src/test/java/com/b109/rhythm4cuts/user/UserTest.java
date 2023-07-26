package com.b109.rhythm4cuts.user;

import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.repository.UserTestRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@SpringBootTest
@Transactional
public class UserTest {
    @Autowired
    UserTestRepository userRepository;

    @Test
    @Rollback(false)
    public void testUser(){
        User user = new User();
        user.setName("user1");

        userRepository.save(user);
    }
}
