package com.visualizer.SearchSpace.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import com.visualizer.SearchSpace.dto.AlgorithmStep;

public class AlgorithmResponse {
    private String algorithm;
    private List<Integer> initialState;
    private Map<String, Integer> metrics;
    private List<AlgorithmStep> steps;
    private boolean isSorted;

    public AlgorithmResponse() {}

    public AlgorithmResponse(String algorithm, List<Integer> initialState, Map<String, Integer> metrics, List<AlgorithmStep> steps, boolean isSorted) {
        this.algorithm = algorithm;
        this.initialState = initialState;
        this.metrics = metrics;
        this.steps = steps;
        this.isSorted = isSorted;
    }

    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }

    public List<Integer> getInitialState() { return initialState; }
    public void setInitialState(List<Integer> initialState) { this.initialState = initialState; }

    public Map<String, Integer> getMetrics() { return metrics; }
    public void setMetrics(Map<String, Integer> metrics) { this.metrics = metrics; }

    public List<AlgorithmStep> getSteps() { return steps; }
    public void setSteps(List<AlgorithmStep> steps) { this.steps = steps; }

    public boolean isSorted() { return isSorted; }
    public void setSorted(boolean sorted) { isSorted = sorted; }
}
