package com.visualizer.SearchSpace.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_scores")
@Data
@NoArgsConstructor
public class QuizScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "algorithm_type", nullable = false)
    private String algorithmType;

    @Column(name = "correct_predictions", nullable = false)
    private Integer correctPredictions = 0;

    @Column(name = "total_predictions", nullable = false)
    private Integer totalPredictions = 0;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getAlgorithmType() { return algorithmType; }
    public void setAlgorithmType(String algorithmType) { this.algorithmType = algorithmType; }

    public Integer getCorrectPredictions() { return correctPredictions; }
    public void setCorrectPredictions(Integer correctPredictions) { this.correctPredictions = correctPredictions; }

    public Integer getTotalPredictions() { return totalPredictions; }
    public void setTotalPredictions(Integer totalPredictions) { this.totalPredictions = totalPredictions; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
