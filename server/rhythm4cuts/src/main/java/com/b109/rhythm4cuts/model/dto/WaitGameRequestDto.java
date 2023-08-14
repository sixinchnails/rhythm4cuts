package com.b109.rhythm4cuts.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WaitGameRequestDto {
    private String gameSeq;
    private List<String> playerSeq;
}