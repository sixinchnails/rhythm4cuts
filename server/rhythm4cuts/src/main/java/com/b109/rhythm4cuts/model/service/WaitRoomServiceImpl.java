package com.b109.rhythm4cuts.model.service;

import com.b109.rhythm4cuts.model.domain.GameInfo;
import com.b109.rhythm4cuts.model.domain.User;
import com.b109.rhythm4cuts.model.domain.UserGameInfo;
import com.b109.rhythm4cuts.model.dto.LobbyDto;
import com.b109.rhythm4cuts.model.dto.WaitGameRequestDto;
import com.b109.rhythm4cuts.model.dto.WaitGameResponseDto;
import com.b109.rhythm4cuts.model.repository.GameRepository;
import com.b109.rhythm4cuts.model.repository.UserRepository;
import com.b109.rhythm4cuts.model.repository.WaitRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class WaitRoomServiceImpl implements WaitRoomService {

    private final WaitRoomRepository waitRoomRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;

    @Override
    public LobbyDto getWaitRoomInfo(int gameSeq) {
        GameInfo gameInfo = waitRoomRepository.selectWaitRoom(gameSeq);
        return gameInfo.getLobbyDto();
    }

    @Override
    public List<WaitGameResponseDto> getWaitRoomOrder(int gameSeq) {
        List<WaitGameResponseDto> waitGameResponseDtoList = new ArrayList<>();

        List<UserGameInfo> userGameInfoList = waitRoomRepository.selectAll(gameSeq);

        for(int i = 0; i < userGameInfoList.size(); i++) {
            UserGameInfo userGameInfo = userGameInfoList.get(i);

            WaitGameResponseDto waitGameResponseDto = new WaitGameResponseDto();

            waitGameResponseDto.setUserSeq(userGameInfo.getUser().getUserSeq());
            waitGameResponseDto.setOrder(userGameInfo.getGameOrder());

            waitGameResponseDtoList.add(waitGameResponseDto);
        }

        return waitGameResponseDtoList;
    }

    @Override
    public int insertUserGameInfo(Map<String, Object> param) {

        int userSeq = Integer.parseInt((String) param.get("userSeq"));
        int gameSeq = Integer.parseInt((String) param.get("gameSeq"));

        UserGameInfo userGameInfo = new UserGameInfo();

        userGameInfo.setUser(userRepository.findByUserSeq(userSeq));
        userGameInfo.setGameInfo(gameRepository.findByGameSeq(gameSeq));

        if (waitRoomRepository.selectOne(userGameInfo) != null) {
            System.out.println("error 발생! 이미 데이터가 들어가있음!");
            return -1;
        }

        // 순서 알고리즘
        int[] orders = { 1, 2, 3, 4 };
        int order = -1;

        List<UserGameInfo> userGameInfos = waitRoomRepository.selectAll(gameSeq);
        for (int i = 0; i < userGameInfos.size(); i++) {
            if (userGameInfos.get(i).getGameOrder() != orders[i]) {
                order = orders[i];
                break;
            }
        }

        // 중간에 빈 상태가 아닌 경우
        if (order == -1) {
            order = userGameInfos.size() + 1;
        }
        userGameInfo.setGameOrder(order);
        waitRoomRepository.insertUserGameInfo(userGameInfo);

        return order;
    }

}