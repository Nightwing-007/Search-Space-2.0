package com.visualizer.SearchSpace.dto;

import lombok.Data;

@Data
public class QuizScoreRequest {
    private Long userId; // Optional for now
    private String algorithmType;
    private int correctPredictions;
    private int totalPredictions;

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getAlgorithmType() { return algorithmType; }
    public void setAlgorithmType(String algorithmType) { this.algorithmType = algorithmType; }

    public int getCorrectPredictions() { return correctPredictions; }
    public void setCorrectPredictions(int correctPredictions) { this.correctPredictions = correctPredictions; }

    public int getTotalPredictions() { return totalPredictions; }
    public void setTotalPredictions(int totalPredictions) { this.totalPredictions = totalPredictions; }
}
