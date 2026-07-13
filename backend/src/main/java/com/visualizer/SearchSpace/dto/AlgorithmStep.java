package com.visualizer.SearchSpace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmStep {
    private int stepIndex;
    private List<Integer> arrayState;
    private List<Integer> highlightIndices;
    private String description;
}
