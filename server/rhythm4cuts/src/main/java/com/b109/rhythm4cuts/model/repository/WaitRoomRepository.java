package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.GameInfo;
import org.springframework.stereotype.Repository;

@Repository
public interface WaitRoomRepository {

    GameInfo selectWaitRoom(int gameSeq);
}
