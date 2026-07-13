package com.visualizer.SearchSpace.service;

import com.visualizer.SearchSpace.dto.AlgorithmResponse;
import com.visualizer.SearchSpace.dto.AlgorithmStep;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlgorithmService {

    public AlgorithmResponse binarySearch(List<Integer> input, int target) {
        List<Integer> array = new ArrayList<>(input);
        Collections.sort(array); // Binary search requires a sorted array
        List<AlgorithmStep> steps = new ArrayList<>();
        int stepIndex = 1;
        int comps = 0;
        int writes = 0;

        int left = 0;
        int right = array.size() - 1;
        boolean found = false;
        
        steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(left, right), 2, 
            "Initialize left and right pointers", comps, writes));

        while (left <= right) {
            comps++; // while condition
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(left, right), 4, 
                "while left <= right", comps, writes));
                
            int mid = left + (right - left) / 2;
            
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(left, mid, right), 5,
                "Checking mid index " + mid + " with value " + array.get(mid), comps, writes));

            comps++; // array[mid] == target
            if (array.get(mid) == target) {
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(mid), 6,
                    "Found target " + target + " at index " + mid, comps, writes));
                found = true;
                break;
            } else {
                comps++; // array[mid] < target
                if (array.get(mid) < target) {
                    steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(mid), 8,
                        target + " > " + array.get(mid) + ", moving left pointer", comps, writes));
                    left = mid + 1;
                } else {
                    steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(mid), 10,
                        target + " < " + array.get(mid) + ", moving right pointer", comps, writes));
                    right = mid - 1;
                }
            }
        }

        if (!found) {
             steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), Collections.emptyList(), 12,
                    "Target " + target + " not found in array.", comps, writes));
        }

        Map<String, Integer> metrics = new HashMap<>();
        metrics.put("totalComparisons", comps);
        metrics.put("totalWrites", writes);

        return new AlgorithmResponse("binary-search", new ArrayList<>(array), metrics, steps, true);
    }

    public AlgorithmResponse cycleSort(List<Integer> input) {
        List<Integer> array = new ArrayList<>(input);
        List<AlgorithmStep> steps = new ArrayList<>();
        int stepIndex = 1;
        int n = array.size();
        int comps = 0;
        int writes = 0;

        for (int i = 0; i < n - 1; i++) {
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i), 2,
                    "Evaluating index " + i + " to find the correct cycle.", comps, writes));

            int item = array.get(i);
            int pos = i;
            for (int j = i + 1; j < n; j++) {
                comps++;
                if (array.get(j) < item) pos++;
            }
            if (pos == i) {
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i), 7,
                    "Element already in correct position.", comps, writes));
                continue;
            }

            comps++;
            while (item == array.get(pos)) {
                pos++;
                comps++;
            }
            
            if (pos != i) {
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i, pos), 9,
                        "Element " + item + " belongs at index " + pos + ". Swapping.", comps, writes));
                int temp = item;
                item = array.get(pos);
                array.set(pos, temp);
                writes++;
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(pos), 9,
                        "Placed at correct index.", comps, writes));
            }

            while (pos != i) {
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i, pos), 10,
                    "Continuing cycle for index " + i, comps, writes));
                pos = i;
                for (int j = i + 1; j < n; j++) {
                    comps++;
                    if (array.get(j) < item) pos++;
                }
                
                comps++;
                while (item == array.get(pos)) {
                    pos++;
                    comps++;
                }
                
                if (item != array.get(pos)) {
                     steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i, pos), 15,
                        "Continuing cycle. Element " + item + " belongs at index " + pos + ". Swapping.", comps, writes));
                    int temp = item;
                    item = array.get(pos);
                    array.set(pos, temp);
                    writes++;
                    steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(pos), 15,
                        "Placed at correct index.", comps, writes));
                }
            }
        }
        
        steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), Collections.emptyList(), null, "Array is fully sorted using Cycle Sort.", comps, writes));
        
        Map<String, Integer> metrics = new HashMap<>();
        metrics.put("totalComparisons", comps);
        metrics.put("totalWrites", writes);

        return new AlgorithmResponse("cycle-sort", input, metrics, steps, true);
    }

    public AlgorithmResponse bitManipulation(List<Integer> input) {
        List<Integer> array = new ArrayList<>(input);
        List<AlgorithmStep> steps = new ArrayList<>();
        int stepIndex = 1;
        int comps = 0;
        int writes = 0;
        
        int unique = 0;
        for (int i = 0; i < array.size(); i++) {
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i), 3,
                    "Current accumulated XOR value: " + unique + ". XORing with " + array.get(i), comps, writes));
            unique ^= array.get(i);
            writes++;
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i), 4,
                    "New XOR value is " + unique, comps, writes));
        }

        steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), Collections.emptyList(), 6,
                    "The unique number is " + unique, comps, writes));
        
        Map<String, Integer> metrics = new HashMap<>();
        metrics.put("totalComparisons", comps);
        metrics.put("totalWrites", writes);

        return new AlgorithmResponse("bit-manipulation", input, metrics, steps, false);
    }

    public AlgorithmResponse arrayManipulation(List<Integer> input) {
        List<Integer> array = new ArrayList<>(input);
        List<AlgorithmStep> steps = new ArrayList<>();
        int stepIndex = 1;
        int comps = 0;
        int writes = 0;
        
        int left = 0;
        int right = array.size() - 1;

        while (left < right) {
            comps++;
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(left, right), 4,
                    "Swapping elements at indices " + left + " and " + right, comps, writes));
            int temp = array.get(left);
            array.set(left, array.get(right));
            array.set(right, temp);
            writes += 2;
            
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(left, right), 5,
                    "Swapped.", comps, writes));
            left++;
            right--;
        }

        steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), Collections.emptyList(), 9,
                    "Array fully reversed.", comps, writes));
        
        Map<String, Integer> metrics = new HashMap<>();
        metrics.put("totalComparisons", comps);
        metrics.put("totalWrites", writes);

        return new AlgorithmResponse("array-manipulation", input, metrics, steps, false);
    }
}
