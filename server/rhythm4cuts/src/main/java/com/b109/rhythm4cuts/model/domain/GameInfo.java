package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "GAME_INFO")
public class GameInfo {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "game_seq")
    private Integer gameSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_seq")
    private Song song;

    private String title;

    private Integer headCount;

    @Column(name = "is_secret")
    private Integer isSecret;

    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RoomStatus roomStatus;

    private Integer hasImage;

    @Column(name = "create_date")
    private LocalDateTime requestDate;

    @OneToMany(mappedBy = "gameInfo", cascade = CascadeType.ALL)
    private List<GameImage> gameImages = new ArrayList<>();

    @OneToMany(mappedBy = "gameInfo", cascade = CascadeType.ALL)
    private List<PointLog> pointLogs = new ArrayList<>();

    public GameInfo() {
        this.headCount = 1;
        this.hasImage = 0;
        this.roomStatus = RoomStatus.WAIT;
    }

    @PrePersist // 데이터 생성이 이루어질때 사전 작업
    public void prePersist() {
        this.requestDate = LocalDateTime.now();
    }

    public void setSong(Song song) {
        this.song = song;
        song.getGameInfos().add(this);
    }
}
