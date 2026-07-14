import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const ALGORITHM_COMPLEXITY = {
    'binary-search': { time: 'O(log n)', space: 'O(1)' },
    'cycle-sort': { time: 'O(n²)', space: 'O(1)' },
    'bit-manipulation': { time: 'O(n)', space: 'O(1)' },
    'array-manipulation': { time: 'O(n)', space: 'O(1)' }
};

// Component that rolls up/down smoothly to the target value
const AnimatedNumber = ({ value }) => {
    const springValue = useSpring(value, { stiffness: 100, damping: 20 });
    const [display, setDisplay] = useState(value);
    
    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    useEffect(() => {
        return springValue.on("change", (v) => {
            setDisplay(Math.round(v));
        });
    }, [springValue]);

    return <>{display}</>;
};

const AnalyticsPanel = ({ algorithm, comparisons, writes, isQuizMode, quizScore }) => {
    const complexity = ALGORITHM_COMPLEXITY[algorithm] || { time: '-', space: '-' };

    return (
        <div className="w-full backdrop-blur-xl bg-white/[0.03] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/[0.06] p-6 flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-emerald-400/90 uppercase tracking-widest">Live Analytics</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 rounded-xl p-4 border border-white/[0.04] flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-2">Comparisons</span>
                    <span className="text-3xl font-mono font-bold text-blue-400/90">
                        <AnimatedNumber value={comparisons || 0} />
                    </span>
                </div>
                <div className="bg-slate-900/40 rounded-xl p-4 border border-white/[0.04] flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-2">Writes / Swaps</span>
                    <span className="text-3xl font-mono font-bold text-amber-400/90">
                        <AnimatedNumber value={writes || 0} />
                    </span>
                </div>
            </div>

            <div className="flex justify-between items-center bg-slate-900/40 rounded-xl p-4 border border-white/[0.04]">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Time Complexity</span>
                    <span className="text-base font-mono font-medium text-emerald-400/80">{complexity.time}</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Space Complexity</span>
                    <span className="text-base font-mono font-medium text-emerald-400/80">{complexity.space}</span>
                </div>
            </div>

            <AnimatePresence>
                {isQuizMode && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-xl p-4 border border-purple-500/20 flex flex-col items-center justify-center overflow-hidden relative"
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.02, 1] }} 
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full"
                        />
                        <span className="text-xs text-purple-300 uppercase tracking-widest font-semibold z-10">Quiz Score</span>
                        <div className="text-3xl font-mono font-extrabold text-white mt-2 z-10">
                            <AnimatedNumber value={quizScore.correct} /> <span className="text-purple-400/70 text-xl">/ {quizScore.total}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnalyticsPanel;
