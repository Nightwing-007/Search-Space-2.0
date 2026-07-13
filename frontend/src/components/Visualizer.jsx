import React from 'react';

const Visualizer = ({ currentStep, isFinished }) => {
    if (!currentStep) {
        return (
            <div className="w-full h-64 flex items-center justify-center bg-slate-800 rounded-lg shadow-inner">
                <p className="text-slate-400">Select an algorithm and run it to see the visualization.</p>
            </div>
        );
    }

    const { arrayState, highlightIndices, description } = currentStep;
    const maxVal = Math.max(...arrayState, 1);

    return (
        <div className="w-full flex flex-col items-center gap-8 p-8 backdrop-blur-xl bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10">
            <div className="text-xl font-medium text-emerald-300 min-h-8 text-center transition-all duration-300 drop-shadow-md">
                {description}
            </div>
            
            <div className="flex items-end justify-center gap-3 h-72 w-full pt-4">
                {arrayState.map((val, idx) => {
                    const isHighlighted = highlightIndices && highlightIndices.includes(idx);
                    
                    let bgClass = "bg-gradient-to-t from-blue-900 to-blue-500 shadow-blue-500/50";
                    if (isFinished) bgClass = "bg-gradient-to-t from-emerald-900 to-emerald-400 shadow-emerald-500/50";
                    else if (isHighlighted) bgClass = "bg-gradient-to-t from-amber-900 to-amber-400 shadow-amber-500/50 ring-2 ring-amber-300";

                    const heightPercentage = (val / maxVal) * 100;

                    return (
                        <div 
                            key={idx} 
                            className="relative flex flex-col items-center gap-3 group transition-all duration-500 ease-in-out"
                            style={{ width: `${Math.min(45, 100 / arrayState.length)}%` }}
                        >
                            <div 
                                className={`w-full rounded-t-lg transition-all duration-500 ${bgClass} shadow-lg relative`}
                                style={{ height: `${heightPercentage}%` }}
                            >
                                {/* Tooltip on hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl pointer-events-none transition-all duration-200 z-10 whitespace-nowrap backdrop-blur-sm border border-white/10">
                                    Value: {val}
                                </div>
                            </div>
                            <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{val}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Visualizer;
