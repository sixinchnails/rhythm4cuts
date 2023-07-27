package com.b109.rhythm4cuts.rank;

import com.b109.rhythm4cuts.model.domain.Song;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.repository.RankingRepository;
import com.b109.rhythm4cuts.model.repository.UserTestRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@SpringBootTest
@Transactional
public class RankTest {
    @Autowired
    RankingRepository rankingRepository;

    @PersistenceContext
    EntityManager em;

    @Test
    @Rollback(true)
    public void testUser(){
        User user1 = new User();
        user1.setName("user1");
        User user2 = new User();
        user2.setName("user2");
        user2.setScoreSum(100);

        Song song1 = new Song();
        Song song2 =new Song();
        song1.setSongRank(3);
        song1.setTitle("1");
        song2.setSongRank(1);
        song2.setTitle("2");

        em.persist(user1);
        em.persist(user2);
        em.persist(song1);
        em.persist(song2);

        List<Song> songs = rankingRepository.selectSongOrderBYRank();
        List<User> users = rankingRepository.selectUsersOrderByScoreSum();
        songs.forEach(song -> {
            System.out.println(song.getTitle());
        });
        users.forEach(user -> {
            System.out.println(user.getName());
        });
    }
}
