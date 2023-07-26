package com.b109.rhythm4cuts.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileImgDto {
    Integer profileImageSeq;
    String imageName;
    String fileName;
    String description;
}