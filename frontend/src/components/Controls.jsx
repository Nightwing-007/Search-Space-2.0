import React from 'react';
import { Play, Pause, StepForward, StepBack, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const Controls = ({ 
    isPlaying, 
    togglePlay, 
    stepForward, 
    stepBackward, 
    reset, 
    speed, 
    setSpeed,
    isFinished,
    hasSteps,
    isQuizMode,
    toggleQuizMode
}) => {
    return (
        <div className="flex flex-col items-center gap-5 p-5 backdrop-blur-xl bg-white/[0.03] border border-white/[0.06] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] w-full max-w-2xl mx-auto mt-6">
            <div className="flex w-full justify-between items-center mb-1 px-8">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Predict the Step (Quiz)</span>
                <button 
                    onClick={toggleQuizMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-950 ${isQuizMode ? 'bg-purple-600' : 'bg-slate-700/50'}`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-slate-100 transition-transform ${isQuizMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>

            <div className="flex items-center gap-5">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={reset}
                    disabled={!hasSteps}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] disabled:opacity-30 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-500/50"
                    title="Reset"
                >
                    <RotateCcw className="w-5 h-5 text-slate-300" />
                </motion.button>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={stepBackward}
                    disabled={isPlaying || !hasSteps || isQuizMode}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] disabled:opacity-30 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-500/50"
                    title="Step Backward (Left Arrow)"
                >
                    <StepBack className="w-5 h-5 text-slate-300" />
                </motion.button>

                <motion.button 
                    whileHover={{ scale: 1.1, boxShadow: isQuizMode ? 'none' : '0 0 20px rgba(52, 211, 153, 0.4)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    disabled={isFinished || !hasSteps || isQuizMode}
                    className={`p-4 rounded-full disabled:opacity-30 text-white shadow-lg flex items-center justify-center w-16 h-16 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${isQuizMode ? 'bg-slate-800 border border-slate-700' : 'bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-emerald-500/20'}`}
                    title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </motion.button>

                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={stepForward}
                    disabled={isPlaying || isFinished || !hasSteps || isQuizMode}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] disabled:opacity-30 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-500/50"
                    title="Step Forward (Right Arrow)"
                >
                    <StepForward className="w-5 h-5 text-slate-300" />
                </motion.button>
            </div>
            
            <div className={`flex items-center gap-6 w-full px-8 transition-opacity duration-300 ${isQuizMode ? 'opacity-30 pointer-events-none' : ''}`}>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest min-w-16">Speed</span>
                <input 
                    type="range" 
                    min="100" 
                    max="2000" 
                    step="100"
                    value={2100 - speed} 
                    onChange={(e) => setSpeed(2100 - parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <span className="text-xs font-mono font-semibold text-emerald-400/90 min-w-12 text-right">
                    {speed}ms
                </span>
            </div>
        </div>
    );
};

export default Controls;
