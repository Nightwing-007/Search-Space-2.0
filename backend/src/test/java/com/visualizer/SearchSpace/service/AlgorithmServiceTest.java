package com.visualizer.SearchSpace.service;

import com.visualizer.SearchSpace.dto.AlgorithmResponse;
import com.visualizer.SearchSpace.dto.AlgorithmStep;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for {@link AlgorithmService}.
 * Validates the Cycle Sort implementation produces the correct number
 * of steps and accurate theoretical metrics for known inputs.
 */
class AlgorithmServiceTest {

    private AlgorithmService algorithmService;

    @BeforeEach
    void setUp() {
        algorithmService = new AlgorithmService();
    }

    @Test
    @DisplayName("Cycle Sort should produce a sorted array for a basic unsorted input")
    void cycleSort_shouldProduceSortedArray() {
        List<Integer> input = Arrays.asList(5, 2, 1, 4, 3);
        AlgorithmResponse response = algorithmService.cycleSort(input);

        assertNotNull(response);
        assertEquals("cycle-sort", response.getAlgorithm());
        assertTrue(response.isSorted());

        // Verify the final step contains a fully sorted array
        List<AlgorithmStep> steps = response.getSteps();
        assertFalse(steps.isEmpty(), "Steps list should not be empty");

        AlgorithmStep lastStep = steps.get(steps.size() - 1);
        List<Integer> finalState = lastStep.getArrayState();
        assertEquals(Arrays.asList(1, 2, 3, 4, 5), finalState,
                "The final array state should be sorted in ascending order");
    }

    @Test
    @DisplayName("Cycle Sort should track totalComparisons and totalWrites in metrics")
    void cycleSort_shouldTrackMetrics() {
        List<Integer> input = Arrays.asList(5, 2, 1, 4, 3);
        AlgorithmResponse response = algorithmService.cycleSort(input);

        assertNotNull(response.getMetrics());
        assertTrue(response.getMetrics().containsKey("totalComparisons"),
                "Metrics should include totalComparisons");
        assertTrue(response.getMetrics().containsKey("totalWrites"),
                "Metrics should include totalWrites");

        int totalComparisons = response.getMetrics().get("totalComparisons");
        int totalWrites = response.getMetrics().get("totalWrites");

        assertTrue(totalComparisons > 0, "There should be at least one comparison");
        assertTrue(totalWrites > 0, "There should be at least one write");
    }

    @Test
    @DisplayName("Cycle Sort should assign sequential step indices starting at 1")
    void cycleSort_shouldHaveSequentialStepIndices() {
        List<Integer> input = Arrays.asList(3, 1, 2);
        AlgorithmResponse response = algorithmService.cycleSort(input);

        List<AlgorithmStep> steps = response.getSteps();
        assertFalse(steps.isEmpty());

        for (int i = 0; i < steps.size(); i++) {
            assertEquals(i + 1, steps.get(i).getStepIndex(),
                    "Step index should be sequential starting from 1");
        }
    }

    @Test
    @DisplayName("Cycle Sort with an already-sorted array should produce minimal writes")
    void cycleSort_alreadySorted_shouldProduceZeroWrites() {
        List<Integer> input = Arrays.asList(1, 2, 3, 4, 5);
        AlgorithmResponse response = algorithmService.cycleSort(input);

        assertNotNull(response);
        assertEquals(0, response.getMetrics().get("totalWrites"),
                "Already sorted array should require zero writes");
    }

    @Test
    @DisplayName("Cycle Sort with a single element should produce at least one step")
    void cycleSort_singleElement_shouldProduceSteps() {
        List<Integer> input = Arrays.asList(42);
        AlgorithmResponse response = algorithmService.cycleSort(input);

        assertNotNull(response);
        assertFalse(response.getSteps().isEmpty(),
                "Even a single-element array should produce at least a completion step");
    }

    @Test
    @DisplayName("Cycle Sort step descriptions should not be null or blank")
    void cycleSort_stepDescriptions_shouldBePresent() {
        List<Integer> input = Arrays.asList(4, 3, 2, 1);
        AlgorithmResponse response = algorithmService.cycleSort(input);

        for (AlgorithmStep step : response.getSteps()) {
            assertNotNull(step.getDescription(), "Step description should not be null");
            assertFalse(step.getDescription().isBlank(), "Step description should not be blank");
        }
    }

    @Test
    @DisplayName("Cycle Sort comparisonsSoFar should be monotonically non-decreasing across steps")
    void cycleSort_comparisonsSoFar_shouldBeNonDecreasing() {
        List<Integer> input = Arrays.asList(5, 2, 1, 4, 3);
        AlgorithmResponse response = algorithmService.cycleSort(input);

        List<AlgorithmStep> steps = response.getSteps();
        int prev = 0;
        for (AlgorithmStep step : steps) {
            assertTrue(step.getComparisonsSoFar() >= prev,
                    "comparisonsSoFar should be monotonically non-decreasing");
            prev = step.getComparisonsSoFar();
        }
    }

    @Test
    @DisplayName("Binary Search should find a target that exists in the array")
    void binarySearch_shouldFindExistingTarget() {
        List<Integer> input = Arrays.asList(1, 3, 5, 7, 9);
        AlgorithmResponse response = algorithmService.binarySearch(input, 5);

        assertNotNull(response);
        assertEquals("binary-search", response.getAlgorithm());

        // The last step description should mention "Found"
        List<AlgorithmStep> steps = response.getSteps();
        AlgorithmStep lastStep = steps.get(steps.size() - 1);
        assertTrue(lastStep.getDescription().contains("Found"),
                "Last step should indicate the target was found");
    }

    @Test
    @DisplayName("Binary Search should indicate target not found when absent")
    void binarySearch_shouldIndicateNotFound() {
        List<Integer> input = Arrays.asList(1, 3, 5, 7, 9);
        AlgorithmResponse response = algorithmService.binarySearch(input, 4);

        assertNotNull(response);
        List<AlgorithmStep> steps = response.getSteps();
        AlgorithmStep lastStep = steps.get(steps.size() - 1);
        assertTrue(lastStep.getDescription().contains("not found"),
                "Last step should indicate the target was not found");
    }
}
