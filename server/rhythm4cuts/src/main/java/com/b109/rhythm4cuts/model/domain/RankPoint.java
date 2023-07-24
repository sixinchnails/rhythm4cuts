package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
@Table(name = "RANK_POINT")
public class RankPoint {
    @Id
    private Integer rank;

    @Column(name = "rank_point")
    private Integer rankPoint;

}
