package com.b109.rhythm4cuts.controller;

import com.b109.rhythm4cuts.model.dto.FriendDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompController {
    private final SimpMessagingTemplate messagingTemplate;
    @MessageMapping(value = "/request")
    public void reqeustFriend(FriendDto friendDto) {
        friendDto.setMessage(friendDto.getToUser() + "님이 " + friendDto.getToUser() + "님에게 요청을 보냈습니다.");
        messagingTemplate.convertAndSend("/subscribe/friend/" + friendDto.getToUser(), friendDto);
    }

    @MessageMapping(value = "/confirm")
    public void confirmFriend(FriendDto friendDto) {
        friendDto.setMessage(friendDto.getToUser() + "님과 " + friendDto.getToUser() + "님이 친구가 되엇습니다.");
        messagingTemplate.convertAndSend("/subscribe/friend/confirm" + friendDto.getToUser(), friendDto);
    }

    @MessageMapping(value = "/invite")
    public void inviteFriend(FriendDto friendDto) {
        friendDto.setMessage(friendDto.getToUser() + "님이 " + friendDto.getToUser() + "님에게 친구 요청을 보냇습니다.");
        messagingTemplate.convertAndSend("/subscribe/friend/invite" + friendDto.getToUser(), friendDto);
    }
}
