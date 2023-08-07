package com.b109.rhythm4cuts.model.service;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.sql.SQLException;

@Service
@Transactional
public interface MelonService {

    void clearMelonChart() throws SQLException;
    void scrapeAndSaveMelonChart() throws SQLException, IOException;
}
