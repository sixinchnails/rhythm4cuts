package com.b109.rhythm4cuts.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class FilmDto {

    private int gameSeq;
    private int userSeq;
    private int playerRank;
    private String fileName;
    private int backgroundSeq;
    private LocalDateTime createDate;
    private String totalFileName;
    private int downloadState;
}
