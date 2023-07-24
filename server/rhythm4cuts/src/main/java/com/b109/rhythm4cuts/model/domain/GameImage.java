package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@Entity
@Table(name = "GAME_IMAGE")
public class GameImage {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "image_seq")
    private String imageSeq;

    //게임 정보 일련번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_seq")
    GameInfo gameInfo;

    //유저 정보 일련번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    User user;

    //등수(순서) 사진을 하나의 화면에 모을 때 순서(등수에 따라 순서 정해진다)
    private Integer rank;

    //서버에 저장될 사진의 파일명(년월일시분초_난수 8자리)
    @Column(name = "file_name")
    private String fileName;

    //배경 정보 일련번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "background_seq")
    BackGround backGround;

    //사진 생성 일시
    @CreationTimestamp
    @Column(name = "create_date")
    private LocalDateTime createDate;

    //전체 사진의 파일명(total_연월일시분초_난수8자리)
    @Column(name = "total_file_name")
    private String totalFileName;

    //다운로드 가능 여부
    @Column(name = "download_status")
    private Boolean downloadState;

    //사진을 구매한 일시
    @Column(name = "download_date")
    private LocalDateTime downloadDate;

    public GameImage() {
        this.downloadState = false;
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
