package com.b109.rhythm4cuts.model.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name="FRIEND_LIST")
public class FriendList {
    @Id @GeneratedValue
    private Integer pk;
}
