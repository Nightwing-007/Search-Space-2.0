import React, { useRef, useEffect, useState } from 'react';

const Visualizer = ({ currentStep, isFinished, isQuizMode, onPredictionClick, nextStepIndices }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height });
            }
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0) return;
        const ctx = canvasRef.current.getContext('2d');
        const { width, height } = dimensions;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        if (!currentStep) {
            ctx.fillStyle = '#94a3b8'; // slate-400
            ctx.font = '16px Outfit, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Select an algorithm and run it to see the visualization.', width / 2, height / 2);
            return;
        }

        const { arrayState, highlightIndices } = currentStep;
        const maxVal = Math.max(...arrayState, 1);
        const padding = 20;
        const usableWidth = width - (padding * 2);
        const usableHeight = height - (padding * 2);
        
        const gap = Math.max(2, usableWidth / arrayState.length * 0.1);
        const barWidth = (usableWidth / arrayState.length) - gap;

        arrayState.forEach((val, idx) => {
            const isHighlighted = highlightIndices && highlightIndices.includes(idx);
            const isNextHighlight = isQuizMode && nextStepIndices && nextStepIndices.includes(idx);
            
            const heightPercentage = val / maxVal;
            const barHeight = usableHeight * heightPercentage;
            
            const x = padding + (idx * (barWidth + gap));
            const y = height - padding - barHeight;

            // Gradients
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            
            if (isFinished) {
                gradient.addColorStop(0, '#34d399'); // emerald-400
                gradient.addColorStop(1, '#064e3b'); // emerald-900
            } else if (isHighlighted) {
                gradient.addColorStop(0, '#fbbf24'); // amber-400
                gradient.addColorStop(1, '#78350f'); // amber-900
            } else {
                gradient.addColorStop(0, '#3b82f6'); // blue-500
                gradient.addColorStop(1, '#1e3a8a'); // blue-900
            }

            // Draw Bar
            ctx.fillStyle = gradient;
            
            // Add shadow
            ctx.shadowColor = isHighlighted ? 'rgba(251, 191, 36, 0.5)' : (isFinished ? 'rgba(52, 211, 153, 0.5)' : 'rgba(59, 130, 246, 0.5)');
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Border radius equivalent via rounded rect
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
            ctx.fill();

            // Reset shadow for text
            ctx.shadowBlur = 0;

            // Draw Text
            if (barWidth > 20) {
                ctx.fillStyle = '#cbd5e1'; // slate-300
                ctx.font = 'bold 12px Outfit, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(val.toString(), x + barWidth / 2, height - 5);
            }
        });

    }, [currentStep, isFinished, dimensions, isQuizMode, nextStepIndices]);

    const handleCanvasClick = (e) => {
        if (!isQuizMode || !currentStep || !onPredictionClick) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        const padding = 20;
        const usableWidth = dimensions.width - (padding * 2);
        const { arrayState } = currentStep;
        
        const gap = Math.max(2, usableWidth / arrayState.length * 0.1);
        const totalBarSpace = (usableWidth / arrayState.length);

        // Figure out which bar was clicked
        if (x < padding || x > dimensions.width - padding) return;
        
        const relativeX = x - padding;
        const clickedIndex = Math.floor(relativeX / totalBarSpace);
        
        if (clickedIndex >= 0 && clickedIndex < arrayState.length) {
            onPredictionClick(clickedIndex);
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-6 p-6 backdrop-blur-xl bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10" ref={containerRef}>
            <div className="text-xl font-medium text-emerald-300 min-h-8 text-center transition-all duration-300 drop-shadow-md">
                {currentStep ? currentStep.description : ''}
            </div>
            
            <div className="w-full h-80 relative cursor-crosshair">
                <canvas 
                    ref={canvasRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    className="absolute top-0 left-0 w-full h-full"
                    onClick={handleCanvasClick}
                />
            </div>
            
            {isQuizMode && (
                <div className="text-sm font-bold text-purple-400 bg-purple-900/30 px-4 py-2 rounded-full border border-purple-500/50 animate-pulse">
                    Quiz Mode Active: Click the bar you predict will be highlighted next!
                </div>
            )}
        </div>
    );
};

export default Visualizer;
