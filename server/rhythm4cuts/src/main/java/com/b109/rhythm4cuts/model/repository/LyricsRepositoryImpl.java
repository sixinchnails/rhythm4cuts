package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.Lyrics;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class LyricsRepositoryImpl implements LyricsRepository {

    private final EntityManager em;

    @Override
    public Lyrics selectLyricBySongSeq(int songSeq) {
        // SELECT l FROM Lyrics As l WHERE l.song.songSeq = :songSeq
        String jpql = "SELECT l FROM Lyrics l WHERE l.song.songSeq = :songSeq";

        return em.createQuery(jpql, Lyrics.class)
                .setParameter("songSeq", songSeq)
                .getSingleResult();
    }
}
