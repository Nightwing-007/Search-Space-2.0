package com.visualizer.SearchSpace.dto;

import java.util.List;

public class AlgorithmStep {
    private int stepIndex;
    private List<Integer> arrayState;
    private List<Integer> highlightIndices;
    private Integer activeLineNumber;
    private String description;
    private int comparisonsSoFar;
    private int writesSoFar;

    public AlgorithmStep() {}

    public AlgorithmStep(int stepIndex, List<Integer> arrayState, List<Integer> highlightIndices, Integer activeLineNumber, String description, int comparisonsSoFar, int writesSoFar) {
        this.stepIndex = stepIndex;
        this.arrayState = arrayState;
        this.highlightIndices = highlightIndices;
        this.activeLineNumber = activeLineNumber;
        this.description = description;
        this.comparisonsSoFar = comparisonsSoFar;
        this.writesSoFar = writesSoFar;
    }

    public int getStepIndex() { return stepIndex; }
    public void setStepIndex(int stepIndex) { this.stepIndex = stepIndex; }

    public List<Integer> getArrayState() { return arrayState; }
    public void setArrayState(List<Integer> arrayState) { this.arrayState = arrayState; }

    public List<Integer> getHighlightIndices() { return highlightIndices; }
    public void setHighlightIndices(List<Integer> highlightIndices) { this.highlightIndices = highlightIndices; }

    public Integer getActiveLineNumber() { return activeLineNumber; }
    public void setActiveLineNumber(Integer activeLineNumber) { this.activeLineNumber = activeLineNumber; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getComparisonsSoFar() { return comparisonsSoFar; }
    public void setComparisonsSoFar(int comparisonsSoFar) { this.comparisonsSoFar = comparisonsSoFar; }

    public int getWritesSoFar() { return writesSoFar; }
    public void setWritesSoFar(int writesSoFar) { this.writesSoFar = writesSoFar; }
}
