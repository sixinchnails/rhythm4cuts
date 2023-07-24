package com.b109.rhythm4cuts.model.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@Table(name = "REQUEST_FRIEND")
public class RequestFriend {


    @Id @GeneratedValue
    @Column(name = "request_seq")
    private Long requestSeq;

    @Enumerated(EnumType.STRING)
    @Column(name = "request_status")
    private RequestStatus requestStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user")
    private User toUser;

    @Column(name = "request_date")
    private LocalDateTime requestDate;

    public RequestFriend(){
        this.requestStatus = RequestStatus.WAIT;
    }

    @PrePersist // 데이터 생성이 이루어질때 사전 작업
    public void prePersist() {
        this.requestDate = LocalDateTime.now();
    }

    public void setToFriend(User toUser) {
        this.toUser = toUser;
        toUser.getRequestToFriends().add(this);
    }

    public void setFromFriend(User FromUser) {
        this.fromUser = fromUser;
        fromUser.getRequestFromFriends().add(this);
    }
}
