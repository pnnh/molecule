package com.huable.venus.repository;

import com.huable.venus.model.PictureModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PicturesRepository extends JpaRepository<PictureModel, Long> {
}