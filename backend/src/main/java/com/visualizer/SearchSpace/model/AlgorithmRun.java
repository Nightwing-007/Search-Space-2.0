package com.visualizer.SearchSpace.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import com.visualizer.SearchSpace.model.User;

@Entity
@Table(name = "algorithm_runs")
@Data
@NoArgsConstructor
public class AlgorithmRun {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "algorithm_type", nullable = false)
    private String algorithmType;

    @Column(name = "custom_input", columnDefinition = "json")
    private String customInput;

    @Column(name = "execution_time_ms")
    private Long executionTimeMs;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
