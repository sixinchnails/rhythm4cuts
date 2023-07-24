package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "USER_GAMEINFO")
public class UserGameInfo {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_gameinfo_seq")
    private Integer userGameInfoSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_seq")
    private GameInfo gameInfo;

    @Column(name = "game_rank")
    private Integer gameRank;

    @Column(name = "game_order")
    private Integer gameOrder;

    @Column(name = "is_host")
    private Boolean isHost;

    @Column(name = "has_image")
    private Boolean hasImage;

    @Column(name = "game_score")
    private Integer gameScore;

    public UserGameInfo () {
        this.isHost = false;
        this.hasImage = false;
        this.gameScore = 0;
    }
}
