package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.GameInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class WaitRoomRepositoryImpl implements WaitRoomRepository {

    private final EntityManager em;

    @Override
    public GameInfo selectWaitRoom(int gameSeq) {
        // SELECT g FROM GameInfo AS g WHERE g.gameSeq = gameSeq
        String jpql = "SELECT g FROM GameInfo g WHERE g.gameSeq = :gameSeq";

        return em.createQuery(jpql, GameInfo.class)
                .setParameter("gameSeq", gameSeq)
                .getSingleResult();
    }
}
