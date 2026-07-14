import React, { useRef, useEffect, useState, useCallback } from 'react';

// Easing function for smooth interpolation
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const ANIMATION_DURATION = 400; // ms for bar transitions

const Visualizer = ({ currentStep, isFinished, isQuizMode, onPredictionClick, nextStepIndices }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    
    // Animation state refs (not React state, to avoid re-render storms)
    const barPositionsRef = useRef([]); // { x, y, targetX, targetY, width, height, targetHeight, value, colorState }
    const animStartTimeRef = useRef(null);
    const rafIdRef = useRef(null);
    const prevStepRef = useRef(null);

    // Observe container resizing
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

    // Compute bar layout from array state
    const computeBarLayout = useCallback((arrayState, width, height) => {
        if (!arrayState || arrayState.length === 0) return [];
        const maxVal = Math.max(...arrayState, 1);
        const padding = 24;
        const usableWidth = width - (padding * 2);
        const usableHeight = height - (padding * 2) - 20; // extra room for labels
        const gap = Math.max(2, usableWidth / arrayState.length * 0.1);
        const barWidth = (usableWidth / arrayState.length) - gap;

        return arrayState.map((val, idx) => {
            const heightPercentage = val / maxVal;
            const barHeight = usableHeight * heightPercentage;
            const x = padding + (idx * (barWidth + gap));
            const y = height - padding - barHeight;
            return { x, y, width: barWidth, height: barHeight, value: val };
        });
    }, []);

    // When step changes, set new target positions for bars
    useEffect(() => {
        if (!currentStep || dimensions.width === 0) return;

        const { arrayState, highlightIndices } = currentStep;
        const newLayout = computeBarLayout(arrayState, dimensions.width, dimensions.height);

        // Determine color state for each bar
        const colorStates = arrayState.map((_, idx) => {
            if (isFinished) return 'sorted';
            if (highlightIndices && highlightIndices.includes(idx)) {
                // Check if description mentions "swap" for red glow
                const desc = (currentStep.description || '').toLowerCase();
                if (desc.includes('swap') || desc.includes('placed')) return 'swapping';
                return 'comparing';
            }
            return 'default';
        });

        const currentBars = barPositionsRef.current;

        if (currentBars.length === 0 || currentBars.length !== newLayout.length) {
            // First render or array size changed -- snap immediately
            barPositionsRef.current = newLayout.map((bar, i) => ({
                x: bar.x, y: bar.y, targetX: bar.x, targetY: bar.y,
                startX: bar.x, startY: bar.y,
                width: bar.width, height: bar.height, targetHeight: bar.height, startHeight: bar.height,
                value: bar.value, colorState: colorStates[i]
            }));
            animStartTimeRef.current = null;
            drawFrame(); // immediate draw
        } else {
            // Set new targets and begin interpolation
            barPositionsRef.current = newLayout.map((bar, i) => ({
                ...currentBars[i],
                startX: currentBars[i].x, startY: currentBars[i].y, startHeight: currentBars[i].height,
                targetX: bar.x, targetY: bar.y, targetHeight: bar.height,
                width: bar.width,
                value: bar.value, colorState: colorStates[i]
            }));
            animStartTimeRef.current = performance.now();
            startAnimation();
        }

        prevStepRef.current = currentStep;
    }, [currentStep, isFinished, dimensions, computeBarLayout]);

    // The rAF animation loop
    const startAnimation = useCallback(() => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

        const animate = (now) => {
            const elapsed = now - (animStartTimeRef.current || now);
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
            const easedProgress = easeOutCubic(progress);

            // Interpolate positions
            const bars = barPositionsRef.current;
            for (let i = 0; i < bars.length; i++) {
                const b = bars[i];
                b.x = b.startX + (b.targetX - b.startX) * easedProgress;
                b.y = b.startY + (b.targetY - b.startY) * easedProgress;
                b.height = b.startHeight + (b.targetHeight - b.startHeight) * easedProgress;
            }

            drawFrame();

            if (progress < 1) {
                rafIdRef.current = requestAnimationFrame(animate);
            }
        };

        rafIdRef.current = requestAnimationFrame(animate);
    }, []);

    // Cleanup rAF on unmount
    useEffect(() => {
        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, []);

    // Draw a single frame to canvas
    const drawFrame = useCallback(() => {
        if (!canvasRef.current || dimensions.width === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height } = dimensions;

        // HiDPI support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, width, height);

        const bars = barPositionsRef.current;

        if (!bars || bars.length === 0) {
            ctx.fillStyle = '#64748b';
            ctx.font = '500 15px Inter, system-ui, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Select an algorithm and run it to see the visualization.', width / 2, height / 2);
            return;
        }

        // Draw each bar
        bars.forEach((bar) => {
            const { x, y, width: bw, height: bh, value, colorState } = bar;

            // Gradient
            const gradient = ctx.createLinearGradient(x, y, x, y + bh);

            // Colors and glow based on state
            let glowColor, glowBlur;
            switch (colorState) {
                case 'sorted':
                    gradient.addColorStop(0, '#34d399');
                    gradient.addColorStop(1, '#064e3b');
                    glowColor = '#34d399';
                    glowBlur = 20;
                    break;
                case 'swapping':
                    gradient.addColorStop(0, '#f87171');
                    gradient.addColorStop(1, '#7f1d1d');
                    glowColor = '#ef4444';
                    glowBlur = 25;
                    break;
                case 'comparing':
                    gradient.addColorStop(0, '#fbbf24');
                    gradient.addColorStop(1, '#78350f');
                    glowColor = '#fbbf24';
                    glowBlur = 22;
                    break;
                default:
                    gradient.addColorStop(0, '#6366f1');
                    gradient.addColorStop(1, '#1e1b4b');
                    glowColor = '#6366f1';
                    glowBlur = 8;
                    break;
            }

            // Apply neon glow
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = glowBlur;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Draw rounded bar
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(x, y, bw, bh, [6, 6, 0, 0]);
            ctx.fill();

            // Reset shadow for text
            ctx.shadowBlur = 0;
            ctx.shadowColor = 'transparent';

            // Draw value label below the bar
            if (bw > 18) {
                ctx.fillStyle = '#e2e8f0';
                ctx.font = '600 11px Inter, system-ui, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(value.toString(), x + bw / 2, dimensions.height - 6);
            }
        });
    }, [dimensions]);

    // Click handler for quiz mode
    const handleCanvasClick = (e) => {
        if (!isQuizMode || !currentStep || !onPredictionClick) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        const bars = barPositionsRef.current;
        for (let i = 0; i < bars.length; i++) {
            const b = bars[i];
            if (clickX >= b.targetX && clickX <= b.targetX + b.width) {
                onPredictionClick(i);
                return;
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center gap-4 p-6 backdrop-blur-xl bg-white/[0.03] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/[0.06]" ref={containerRef}>
            <div className="text-base font-medium text-emerald-300/90 min-h-7 text-center transition-all duration-500 tracking-wide">
                {currentStep ? currentStep.description : ''}
            </div>
            
            <div className="w-full h-80 relative cursor-crosshair">
                <canvas 
                    ref={canvasRef}
                    style={{ width: dimensions.width, height: dimensions.height }}
                    className="absolute top-0 left-0 w-full h-full"
                    onClick={handleCanvasClick}
                />
            </div>
            
            {isQuizMode && (
                <div className="text-xs font-semibold text-purple-300 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 tracking-wide">
                    Quiz Mode Active -- Click the bar you predict will be highlighted next
                </div>
            )}
        </div>
    );
};

export default Visualizer;
