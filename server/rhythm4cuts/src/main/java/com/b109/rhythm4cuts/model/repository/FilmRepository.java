package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.GameImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;


public interface FilmRepository extends JpaRepository<GameImage, Long> {

    Page<GameImage> findByCreateDateBetween(LocalDateTime fromDate, LocalDateTime toDate, Pageable pageable);
}
