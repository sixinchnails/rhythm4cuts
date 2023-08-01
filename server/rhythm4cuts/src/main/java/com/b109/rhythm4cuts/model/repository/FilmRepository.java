package com.b109.rhythm4cuts.model.repository;

import com.b109.rhythm4cuts.model.domain.GameImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmRepository extends JpaRepository<GameImage, Long> {
    @Query("SELECT g FROM GameImage g WHERE YEAR(g.createDate) = :year AND MONTH(g.createDate) = :month AND DAY(g.createDate) = :day")
    List<GameImage> findByDate(int year, int month, int day);
}

