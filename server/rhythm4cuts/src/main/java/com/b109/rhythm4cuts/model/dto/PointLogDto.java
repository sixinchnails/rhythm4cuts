package com.b109.rhythm4cuts.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter @Getter
public class PointLogDto {
    private Long logSeq;
    private int cagegorySeq;
    private String description;

    private int userSeq;
    private int pointHistory;
    private int remainPoint;
    private LocalDateTime createDate;

}
