import React from 'react';

const ALGORITHM_COMPLEXITY = {
    'binary-search': { time: 'O(log n)', space: 'O(1)' },
    'cycle-sort': { time: 'O(n^2)', space: 'O(1)' },
    'bit-manipulation': { time: 'O(n)', space: 'O(1)' },
    'array-manipulation': { time: 'O(n)', space: 'O(1)' }
};

const AnalyticsPanel = ({ algorithm, comparisons, writes, isQuizMode, quizScore }) => {
    const complexity = ALGORITHM_COMPLEXITY[algorithm] || { time: '-', space: '-' };

    return (
        <div className="w-full backdrop-blur-xl bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 p-6 flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-emerald-300 uppercase tracking-wider">Live Analytics</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center">
                    <span className="text-sm text-slate-400 uppercase tracking-wide">Comparisons</span>
                    <span className="text-3xl font-bold text-blue-400 mt-2">{comparisons || 0}</span>
                </div>
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center">
                    <span className="text-sm text-slate-400 uppercase tracking-wide">Writes/Swaps</span>
                    <span className="text-3xl font-bold text-amber-400 mt-2">{writes || 0}</span>
                </div>
            </div>

            <div className="flex justify-between items-center bg-black/20 rounded-xl p-4 border border-white/5 mt-2">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Time Complexity</span>
                    <span className="text-lg font-mono text-emerald-400">{complexity.time}</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Space Complexity</span>
                    <span className="text-lg font-mono text-emerald-400">{complexity.space}</span>
                </div>
            </div>

            {isQuizMode && (
                <div className="mt-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-4 border border-purple-500/30 flex flex-col items-center justify-center animate-pulse">
                    <span className="text-sm text-purple-300 uppercase tracking-wide font-bold">Quiz Score</span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                        {quizScore.correct} <span className="text-purple-400 text-xl">/ {quizScore.total}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticsPanel;
