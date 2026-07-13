package com.visualizer.SearchSpace.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class AlgorithmRequest {
    private List<Integer> array;
    private Integer target;

    public List<Integer> getArray() { return array; }
    public void setArray(List<Integer> array) { this.array = array; }

    public Integer getTarget() { return target; }
    public void setTarget(Integer target) { this.target = target; }
}
