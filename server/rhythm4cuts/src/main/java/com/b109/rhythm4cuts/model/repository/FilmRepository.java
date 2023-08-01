package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.GameImage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FilmRepository extends JpaRepository<GameImage, Long> {

    Page<GameImage> findByGame(String createDate, Pageable pageable);
}
