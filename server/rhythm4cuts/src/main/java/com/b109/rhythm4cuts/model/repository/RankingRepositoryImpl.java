package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.Song;
import com.b109.rhythm4cuts.model.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class RankingRepositoryImpl implements RankingRepository{

    @PersistenceContext
    EntityManager em;

    @Override
    public List<Song> selectSongOrderBYRank() {
        String jpql = "SELECT s FROM Song s ORDER BY s.songRank ASC ";
        List<Song> songs = em.createQuery(jpql, Song.class)
                .getResultList();

        return songs;
    }

    @Override
    public List<User> selectUsersOrderByScoreSum() {
        String jpql = "SELECT u FROM User u ORDER BY u.scoreSum DESC";
        List<User> users = em.createQuery(jpql, User.class)
                .getResultList();

        return users;
    }
}
