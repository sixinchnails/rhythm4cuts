package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@Entity
@Table(name = "VOICE_LOG")
public class VoiceLog {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "voice_log_seq")
    private Integer voiceLogSeq;

    //게임 로그 일련번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_log_seq")
    private GameLog gameLog;

    //가사 일련번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lyrics_seq")
    private Lyrics lyrics;

    //음성 파일 이름
    @Column(name = "voice_file")
    private String voiceFile;

    //해당 부분을 부른 후 얻은 점수
    @Column(name = "game_score")
    private Integer gameScore;

    //로그 생성일시
    @CreationTimestamp
    @Column(name = "create_date")
    private LocalDateTime createDate;

    public void setGameLog(GameLog gameLog) {
        this.gameLog = gameLog;
        gameLog.getVoiceLogs().add(this);
    }
}
