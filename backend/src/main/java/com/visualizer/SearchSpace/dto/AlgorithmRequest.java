package com.visualizer.SearchSpace.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class AlgorithmRequest {
    private List<Integer> array;
    private Integer target; // Only used for algorithms like binary search
}
