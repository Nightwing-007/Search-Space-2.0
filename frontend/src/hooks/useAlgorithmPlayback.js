import { useState, useEffect, useRef, useCallback } from 'react';

export const useAlgorithmPlayback = (steps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(500); // ms per step
    const timerRef = useRef(null);

    const [isQuizMode, setIsQuizMode] = useState(false);
    const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

    const reset = useCallback(() => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
        setQuizScore({ correct: 0, total: 0 });
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    // When steps change, reset playback
    useEffect(() => {
        reset();
    }, [steps, reset]);

    const stepForward = useCallback(() => {
        setCurrentStepIndex((prev) => {
            if (prev < steps.length - 1) return prev + 1;
            setIsPlaying(false);
            return prev;
        });
    }, [steps.length]);

    const stepBackward = useCallback(() => {
        setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }, []);

    useEffect(() => {
        if (isPlaying && !isQuizMode) {
            timerRef.current = setInterval(() => {
                setCurrentStepIndex((prev) => {
                    if (prev < steps.length - 1) {
                        return prev + 1;
                    } else {
                        setIsPlaying(false);
                        clearInterval(timerRef.current);
                        return prev;
                    }
                });
            }, speed);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, speed, steps.length, isQuizMode]);

    const togglePlay = () => {
        if (isQuizMode) return; // Prevent auto-play during quiz mode
        setIsPlaying(!isPlaying);
    };

    const toggleQuizMode = () => {
        setIsQuizMode((prev) => {
            if (!prev) setIsPlaying(false); // Stop playing when entering quiz mode
            return !prev;
        });
    };

    const handlePrediction = (predictedIndex) => {
        if (!isQuizMode || currentStepIndex >= steps.length - 1) return;
        
        const nextStep = steps[currentStepIndex + 1];
        if (!nextStep) return;

        const isCorrect = nextStep.highlightIndices && nextStep.highlightIndices.includes(predictedIndex);
        
        setQuizScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));

        stepForward();
    };

    const currentStep = steps[currentStepIndex] || null;
    const nextStepIndices = currentStepIndex < steps.length - 1 ? steps[currentStepIndex + 1].highlightIndices : null;

    return {
        currentStepIndex,
        currentStep,
        nextStepIndices,
        isPlaying,
        speed,
        setSpeed,
        togglePlay,
        stepForward,
        stepBackward,
        reset,
        isFinished: currentStepIndex === steps.length - 1 && steps.length > 0,
        isQuizMode,
        toggleQuizMode,
        quizScore,
        handlePrediction
    };
};
