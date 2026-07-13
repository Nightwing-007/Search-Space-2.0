package com.visualizer.SearchSpace.service;

import com.visualizer.SearchSpace.dto.AlgorithmResponse;
import com.visualizer.SearchSpace.dto.AlgorithmStep;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class AlgorithmService {

    public AlgorithmResponse binarySearch(List<Integer> input, int target) {
        List<Integer> array = new ArrayList<>(input);
        Collections.sort(array); // Binary search requires a sorted array
        List<AlgorithmStep> steps = new ArrayList<>();
        int stepIndex = 1;

        int left = 0;
        int right = array.size() - 1;
        boolean found = false;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(left, mid, right), 
                "Checking mid index " + mid + " with value " + array.get(mid) + ". Left: " + left + ", Right: " + right));

            if (array.get(mid) == target) {
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(mid), 
                    "Found target " + target + " at index " + mid));
                found = true;
                break;
            } else if (array.get(mid) < target) {
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(mid), 
                    target + " is greater than " + array.get(mid) + ", moving left pointer to " + (mid + 1)));
                left = mid + 1;
            } else {
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(mid), 
                    target + " is less than " + array.get(mid) + ", moving right pointer to " + (mid - 1)));
                right = mid - 1;
            }
        }

        if (!found) {
             steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), Collections.emptyList(), 
                    "Target " + target + " not found in array."));
        }

        return new AlgorithmResponse("binary-search", new ArrayList<>(array), steps, true);
    }

    public AlgorithmResponse cycleSort(List<Integer> input) {
        List<Integer> array = new ArrayList<>(input);
        List<AlgorithmStep> steps = new ArrayList<>();
        int stepIndex = 1;
        int n = array.size();

        for (int i = 0; i < n - 1; i++) {
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i), 
                    "Evaluating index " + i + " to find the correct cycle."));

            int item = array.get(i);
            int pos = i;
            for (int j = i + 1; j < n; j++) {
                if (array.get(j) < item) pos++;
            }
            if (pos == i) continue;

            while (item == array.get(pos)) pos++;
            
            if (pos != i) {
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i, pos), 
                        "Element " + item + " belongs at index " + pos + ". Swapping."));
                int temp = item;
                item = array.get(pos);
                array.set(pos, temp);
                steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(pos), 
                        "Placed at correct index."));
            }

            while (pos != i) {
                pos = i;
                for (int j = i + 1; j < n; j++) {
                    if (array.get(j) < item) pos++;
                }
                while (item == array.get(pos)) pos++;
                if (item != array.get(pos)) {
                     steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i, pos), 
                        "Continuing cycle. Element " + item + " belongs at index " + pos + ". Swapping."));
                    int temp = item;
                    item = array.get(pos);
                    array.set(pos, temp);
                    steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(pos), 
                        "Placed at correct index."));
                }
            }
        }
        
        steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), Collections.emptyList(), "Array is fully sorted using Cycle Sort."));
        return new AlgorithmResponse("cycle-sort", input, steps, true);
    }

    public AlgorithmResponse bitManipulation(List<Integer> input) {
        // Example: Finding the unique number in an array where all other elements appear twice.
        List<Integer> array = new ArrayList<>(input);
        List<AlgorithmStep> steps = new ArrayList<>();
        int stepIndex = 1;
        
        int unique = 0;
        for (int i = 0; i < array.size(); i++) {
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i), 
                    "Current accumulated XOR value: " + unique + ". XORing with " + array.get(i)));
            unique ^= array.get(i);
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(i), 
                    "New XOR value is " + unique));
        }

        steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), Collections.emptyList(), 
                    "The unique number is " + unique));
        
        return new AlgorithmResponse("bit-manipulation", input, steps, false);
    }

    public AlgorithmResponse arrayManipulation(List<Integer> input) {
        // Example: Reversing an array
        List<Integer> array = new ArrayList<>(input);
        List<AlgorithmStep> steps = new ArrayList<>();
        int stepIndex = 1;
        
        int left = 0;
        int right = array.size() - 1;

        while (left < right) {
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(left, right), 
                    "Swapping elements at indices " + left + " and " + right));
            int temp = array.get(left);
            array.set(left, array.get(right));
            array.set(right, temp);
            
            steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), List.of(left, right), 
                    "Swapped."));
            left++;
            right--;
        }

        steps.add(new AlgorithmStep(stepIndex++, new ArrayList<>(array), Collections.emptyList(), 
                    "Array fully reversed."));
        
        return new AlgorithmResponse("array-manipulation", input, steps, false);
    }
}
