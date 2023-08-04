package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.GameInfo;
import com.b109.rhythm4cuts.model.dto.LobbyDto;
import com.b109.rhythm4cuts.model.repository.WaitRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class WaitRoomServiceImpl implements WaitRoomService {

    private final WaitRoomRepository waitRoomRepository;

    @Override
    public LobbyDto getWaitRoomInfo(int gameSeq) {
        GameInfo gameInfo = waitRoomRepository.selectWaitRoom(gameSeq);
        return gameInfo.getLobbyDto();
    }
}
