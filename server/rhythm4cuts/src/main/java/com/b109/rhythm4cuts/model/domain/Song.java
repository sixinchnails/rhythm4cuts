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

    private String title;

    @Column(name = "song_no")
    private Integer songNo;

    private String singer;

    private Integer rank;

    @Column(name = "play_count")
    private Integer playCount;

    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL)
    private List<GameInfo> gameInfos = new ArrayList<>();

    private String url;
}
