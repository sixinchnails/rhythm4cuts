package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name="CATEGORY")
public class Category {
    @Id
    private Integer code;

    private String description;

}
