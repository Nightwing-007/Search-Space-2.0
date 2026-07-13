import React from 'react';
import { Play, Pause, StepForward, StepBack, RotateCcw } from 'lucide-react';

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
        <div className="flex flex-col items-center gap-6 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] w-full max-w-2xl mx-auto mt-6">
            <div className="flex w-full justify-between items-center mb-2 px-8">
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Predict the Step (Quiz)</span>
                <button 
                    onClick={toggleQuizMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${isQuizMode ? 'bg-purple-600' : 'bg-slate-600'}`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isQuizMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>

            <div className="flex items-center gap-6">
                <button 
                    onClick={reset}
                    disabled={!hasSteps}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    title="Reset"
                >
                    <RotateCcw className="w-5 h-5 text-slate-300" />
                </button>
                <button 
                    onClick={stepBackward}
                    disabled={isPlaying || !hasSteps || isQuizMode}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    title="Step Backward"
                >
                    <StepBack className="w-5 h-5 text-slate-300" />
                </button>
                <button 
                    onClick={togglePlay}
                    disabled={isFinished || !hasSteps || isQuizMode}
                    className={`p-4 rounded-full disabled:opacity-30 text-white shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center w-16 h-16 ${isQuizMode ? 'bg-slate-700' : 'bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 shadow-emerald-500/30'}`}
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                </button>
                <button 
                    onClick={stepForward}
                    disabled={isPlaying || isFinished || !hasSteps || isQuizMode}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    title="Step Forward"
                >
                    <StepForward className="w-5 h-5 text-slate-300" />
                </button>
            </div>
            
            <div className={`flex items-center gap-6 w-full px-8 ${isQuizMode ? 'opacity-30 pointer-events-none' : ''}`}>
                <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider min-w-16">Speed</span>
                <input 
                    type="range" 
                    min="100" 
                    max="2000" 
                    step="100"
                    value={2100 - speed} // Invert so sliding right is faster
                    onChange={(e) => setSpeed(2100 - parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-emerald-500 outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <span className="text-sm font-bold text-emerald-400 min-w-16 text-right">
                    {speed}ms
                </span>
            </div>
        </div>
    );
};

export default Controls;
