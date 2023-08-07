package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
@Table(name="SONG_RANK")
public class SongRank {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "song_rank_seq")
    private int songRankSeq;

    // 노래 제목
    private String title;

    // 노래 가수
    private String singer;

    // 음원 랭킹 순위
    private int rank;
}
