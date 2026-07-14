import { renderHook, act } from '@testing-library/react';
import { useAlgorithmPlayback } from './useAlgorithmPlayback';

// Mock steps that simulate a simple 3-step algorithm execution
const mockSteps = [
    {
        stepIndex: 1,
        arrayState: [5, 2, 1],
        highlightIndices: [0],
        activeLineNumber: 2,
        description: 'Evaluating index 0',
        comparisonsSoFar: 0,
        writesSoFar: 0,
    },
    {
        stepIndex: 2,
        arrayState: [2, 5, 1],
        highlightIndices: [0, 1],
        activeLineNumber: 5,
        description: 'Swapped indices 0 and 1',
        comparisonsSoFar: 1,
        writesSoFar: 1,
    },
    {
        stepIndex: 3,
        arrayState: [1, 2, 5],
        highlightIndices: [1, 2],
        activeLineNumber: 5,
        description: 'Swapped indices 1 and 2',
        comparisonsSoFar: 2,
        writesSoFar: 2,
    },
];

describe('useAlgorithmPlayback', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should initialize with step index 0 and not playing', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        expect(result.current.currentStepIndex).toBe(0);
        expect(result.current.isPlaying).toBe(false);
        expect(result.current.isFinished).toBe(false);
        expect(result.current.currentStep).toEqual(mockSteps[0]);
    });

    test('stepForward should advance the step index by 1', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.stepForward();
        });

        expect(result.current.currentStepIndex).toBe(1);
        expect(result.current.currentStep).toEqual(mockSteps[1]);
    });

    test('stepForward should not exceed the last step', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        // Advance to the last step
        act(() => {
            result.current.stepForward();
            result.current.stepForward();
        });

        expect(result.current.currentStepIndex).toBe(2);
        expect(result.current.isFinished).toBe(true);

        // Attempt to go beyond
        act(() => {
            result.current.stepForward();
        });

        expect(result.current.currentStepIndex).toBe(2);
    });

    test('stepBackward should decrement the step index by 1', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.stepForward();
            result.current.stepForward();
        });

        expect(result.current.currentStepIndex).toBe(2);

        act(() => {
            result.current.stepBackward();
        });

        expect(result.current.currentStepIndex).toBe(1);
    });

    test('stepBackward should not go below 0', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.stepBackward();
        });

        expect(result.current.currentStepIndex).toBe(0);
    });

    test('togglePlay should set isPlaying to true', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.togglePlay();
        });

        expect(result.current.isPlaying).toBe(true);
    });

    test('togglePlay twice should pause playback', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.togglePlay();
        });
        expect(result.current.isPlaying).toBe(true);

        act(() => {
            result.current.togglePlay();
        });
        expect(result.current.isPlaying).toBe(false);
    });

    test('playing should auto-advance steps on interval ticks', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.togglePlay();
        });

        expect(result.current.isPlaying).toBe(true);
        expect(result.current.currentStepIndex).toBe(0);

        // Advance one interval tick
        act(() => {
            jest.advanceTimersByTime(result.current.speed);
        });

        expect(result.current.currentStepIndex).toBe(1);

        // Advance another interval tick
        act(() => {
            jest.advanceTimersByTime(result.current.speed);
        });

        expect(result.current.currentStepIndex).toBe(2);
        expect(result.current.isFinished).toBe(true);
    });

    test('playing should auto-stop at the last step', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.togglePlay();
        });

        // Advance past all steps
        act(() => {
            jest.advanceTimersByTime(result.current.speed * 5);
        });

        expect(result.current.currentStepIndex).toBe(2);
        expect(result.current.isPlaying).toBe(false);
        expect(result.current.isFinished).toBe(true);
    });

    test('reset should return to step 0 and stop playing', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.stepForward();
            result.current.stepForward();
        });

        expect(result.current.currentStepIndex).toBe(2);

        act(() => {
            result.current.reset();
        });

        expect(result.current.currentStepIndex).toBe(0);
        expect(result.current.isPlaying).toBe(false);
        expect(result.current.isFinished).toBe(false);
    });

    test('toggleQuizMode should enable quiz mode and stop playback', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.togglePlay();
        });
        expect(result.current.isPlaying).toBe(true);

        act(() => {
            result.current.toggleQuizMode();
        });

        expect(result.current.isQuizMode).toBe(true);
        expect(result.current.isPlaying).toBe(false);
    });

    test('togglePlay should be blocked while in quiz mode', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.toggleQuizMode();
        });

        act(() => {
            result.current.togglePlay();
        });

        expect(result.current.isPlaying).toBe(false);
    });

    test('handlePrediction with a correct guess should increment score and advance step', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.toggleQuizMode();
        });

        // The next step (index 1) has highlightIndices [0, 1]
        act(() => {
            result.current.handlePrediction(0);
        });

        expect(result.current.quizScore.correct).toBe(1);
        expect(result.current.quizScore.total).toBe(1);
        expect(result.current.currentStepIndex).toBe(1);
    });

    test('handlePrediction with an incorrect guess should only increment total', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        act(() => {
            result.current.toggleQuizMode();
        });

        // Predict index 2, but next step highlights [0, 1]
        act(() => {
            result.current.handlePrediction(2);
        });

        expect(result.current.quizScore.correct).toBe(0);
        expect(result.current.quizScore.total).toBe(1);
        // Step still advances on any prediction
        expect(result.current.currentStepIndex).toBe(1);
    });

    test('should return correct isFinished state', () => {
        const { result } = renderHook(() => useAlgorithmPlayback(mockSteps));

        expect(result.current.isFinished).toBe(false);

        act(() => {
            result.current.stepForward();
        });
        expect(result.current.isFinished).toBe(false);

        act(() => {
            result.current.stepForward();
        });
        expect(result.current.isFinished).toBe(true);
    });

    test('should handle empty steps array without errors', () => {
        const { result } = renderHook(() => useAlgorithmPlayback([]));

        expect(result.current.currentStepIndex).toBe(0);
        expect(result.current.currentStep).toBeNull();
        expect(result.current.isFinished).toBe(false);
    });
});
