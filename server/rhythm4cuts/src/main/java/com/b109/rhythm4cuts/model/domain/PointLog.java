package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name="POINT_LOG")
public class PointLog {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="log_seq")
    private Long logSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "code")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_seq")
    private GameInfo gameInfo;

    @Column(name="point_history")
    private Integer pointHistory;

    @Column(name="remain_point")
    private Integer remainPoint;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @PrePersist // 데이터 생성이 이루어질때 사전 작업
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }

    public void setUser(User user) {
        this.user = user;
        user.getPointLogs().add(this);
    }

    public void setGameInfo(GameInfo gameInfo) {
        this.gameInfo = gameInfo;
        gameInfo.getPointLogs().add(this);
    }
}
