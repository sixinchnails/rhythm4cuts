package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Entity
@Table(name = "SONG")
public class Song {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "song_seq")
    private Integer songSeq;

    //제목
    private String title;

    //금영 TJ에서 노래 아이디
    @Column(name = "song_no")
    private Integer songNo;

    //가수
    private String singer;

    //크롤링해서 가져올 음원 랭킹 순위
    private Integer rank;

    //노래 플레이 횟수
    @Column(name = "play_count")
    private Integer playCount;

    //유튜브 영상 url
    private String url;

    //노래의 주파수 정보
    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL)
    private List<Pitch> Pitches = new ArrayList<>();

    //노래 가사 정보
    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL)
    private List<Lyrics> lyrics = new ArrayList<>();

    public Song() {
        this.playCount = 0;
    }
}
