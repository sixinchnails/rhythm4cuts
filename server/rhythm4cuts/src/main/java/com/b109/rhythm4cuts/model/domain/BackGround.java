package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
@Table(name = "BACKGROUND")
public class BackGround {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "background_seq")
    private Integer backgroundSeq;

    @Column(name = "background_name")
    private String background_name;

    @Column(name = "file_name")
    private String fileName;
}
