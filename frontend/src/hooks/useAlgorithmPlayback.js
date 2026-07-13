import { useState, useEffect, useRef, useCallback } from 'react';

export const useAlgorithmPlayback = (steps) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(500); // ms per step
    const timerRef = useRef(null);

    const reset = useCallback(() => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
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
        if (isPlaying) {
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
    }, [isPlaying, speed, steps.length]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const currentStep = steps[currentStepIndex] || null;

    return {
        currentStepIndex,
        currentStep,
        isPlaying,
        speed,
        setSpeed,
        togglePlay,
        stepForward,
        stepBackward,
        reset,
        isFinished: currentStepIndex === steps.length - 1 && steps.length > 0
    };
};
