package com.visualizer.SearchSpace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import com.visualizer.SearchSpace.dto.AlgorithmStep;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlgorithmResponse {
    private String algorithm;
    private List<Integer> initialState;
    private List<AlgorithmStep> steps;
    private boolean isSorted;
}
