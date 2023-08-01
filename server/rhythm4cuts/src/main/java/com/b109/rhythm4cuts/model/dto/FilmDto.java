package com.b109.rhythm4cuts.model.dto;

import com.b109.rhythm4cuts.model.domain.GameImage;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class FilmDto {

    private int gameSeq;
    private int userSeq;
    private int playerRank;
    private String fileName;
    private int backgroundSeq;
    private String createDate;
    private String totalFileName;
    private Boolean downloadState;

    private MultipartFile commonFilm;
    private MultipartFile privateFilm;

}
