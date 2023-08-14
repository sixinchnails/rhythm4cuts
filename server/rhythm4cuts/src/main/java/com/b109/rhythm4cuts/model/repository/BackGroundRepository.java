package com.b109.rhythm4cuts.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.b109.rhythm4cuts.model.domain.BackGround;
import org.springframework.stereotype.Repository;

@Repository
public interface BackGroundRepository extends JpaRepository<BackGround, Integer> {
}
