package com.b109.rhythm4cuts.model.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "USER")
public class User {

    public User() {
        this.point = 0;
        this.playCount = 0;
        this.scoreSum = 0;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_seq")
    private Integer userSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_image_seq")
    private ProfileImage profileImage;

    @OneToMany(mappedBy = "fromUser", cascade = CascadeType.ALL)
    private List<RequestFriend> requestFromFriends = new ArrayList<>();

    @OneToMany(mappedBy = "toUser", cascade = CascadeType.ALL)
    private List<RequestFriend> requestToFriends = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PointLog> pointLogs = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<GameImage> gameImages = new ArrayList<>();

    private String email;

    //유저 비밀번호 SHA 512
    private String password;

    private String name;

    private String nickname;

    //유저 생년월일
    @Column(name = "birth_date")
    private LocalDate birthDate;

    // 게임을 하면서 유저가 모은 포인트이다.  찍은 사진을 다운로드할 때 사용한다. 게임 점수나 돈으로도 추가할 수 있다.
    private Integer point;

    //유저가 플레이한 게임 수
    @Column(name="play_count")
    private Integer playCount;

    //모든 게임에 대하 누적 점수
    @Column(name="score_sum")
    private Integer scoreSum;

    //유저가 생성된 시간
    @Column(name = "create_date")
    private LocalDateTime createDate;

    //유저가 탈퇴한 시간 null이면 탈퇴하지 않고 null이 아니면 탈퇴한 상태이다
    @Column(name = "resign_date")
    private LocalDateTime resignDate;

    @PrePersist // 데이터 생성이 이루어질때 사전 작업
    public void prePersist() {
        this.createDate = LocalDateTime.now();
    }

    public void setProfileImage(ProfileImage profileImage) {
        this.profileImage = profileImage;
        profileImage.getUsers().add(this);
    }
}
