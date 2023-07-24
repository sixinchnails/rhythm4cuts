package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@Entity
@Table(name = "GAME_IMAGE")
public class GameImage {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_seq")
    private String imageSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_seq")
    GameInfo gameInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    User user;

    private Integer rank;

    @Column(name = "file_name")
    private String fileName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "background_seq")
    BackGround backGround;

    @Column(name = "total_file_name")
    private String totalFileName;

    @Enumerated(EnumType.STRING)
    @Column(name = "download_status")
    private DownloadStatus downloadStatus;

    @Column(name = "download_date")
    private LocalDateTime downloadDate;

    @Column(name = "create_date")
    private LocalDateTime requestDate;

    public GameImage() {
        this.downloadStatus = DownloadStatus.FALSE;
    }

    @PrePersist // 데이터 생성이 이루어질때 사전 작업
    public void prePersist() {
        this.requestDate = LocalDateTime.now();
    }

    public void setGameInfos(GameInfo gameInfo) {
        this.gameInfo = gameInfo;
        gameInfo.getGameImages().add(this);
    }

    public void setUserInfos(User user) {
        this.user = user;
        user.getGameImages().add(this);
    }
}
