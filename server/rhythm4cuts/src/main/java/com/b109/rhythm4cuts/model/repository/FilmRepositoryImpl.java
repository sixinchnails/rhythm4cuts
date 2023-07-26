package com.b109.rhythm4cuts.model.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
@RequiredArgsConstructor
public class FilmRepositoryImpl implements FilmRepository {

}
