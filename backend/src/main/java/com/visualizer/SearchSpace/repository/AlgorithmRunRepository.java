package com.visualizer.SearchSpace.repository;

import com.visualizer.SearchSpace.model.AlgorithmRun;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlgorithmRunRepository extends JpaRepository<AlgorithmRun, Long> {
    List<AlgorithmRun> findByUserId(Long userId);
}
