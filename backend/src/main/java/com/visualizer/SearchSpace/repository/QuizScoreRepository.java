package com.visualizer.SearchSpace.repository;

import com.visualizer.SearchSpace.model.QuizScore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizScoreRepository extends JpaRepository<QuizScore, Long> {
    List<QuizScore> findByUserId(Long userId);
}
