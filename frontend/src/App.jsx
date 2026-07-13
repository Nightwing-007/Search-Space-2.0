import React, { useState } from 'react';
import Visualizer from './components/Visualizer';
import Controls from './components/Controls';
import { useAlgorithmPlayback } from './hooks/useAlgorithmPlayback';
import { runAlgorithm } from './services/api';
import CodeViewer from './components/CodeViewer';
import AnalyticsPanel from './components/AnalyticsPanel';

function App() {
    const [algorithm, setAlgorithm] = useState('cycle-sort');
    const [inputArray, setInputArray] = useState('5, 2, 1, 4, 3');
    const [target, setTarget] = useState('4');
    
    const [steps, setSteps] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const playback = useAlgorithmPlayback(steps);

    const handleRun = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const parsedArray = inputArray.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
            const parsedTarget = parseInt(target.trim());

            if (parsedArray.length === 0) {
                throw new Error("Invalid array input");
            }

            const response = await runAlgorithm(algorithm, parsedArray, !isNaN(parsedTarget) ? parsedTarget : null);
            setSteps(response.steps);
        } catch (err) {
            setError(err.message || "Failed to run algorithm. Ensure the backend is running.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen p-8 overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-5xl mx-auto space-y-10 relative z-10">
                <header className="text-center space-y-3 mt-4">
                    <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 drop-shadow-sm">
                        SearchSpace
                    </h1>
                    <p className="text-slate-300 font-light text-lg">
                        Interactive, step-by-step visualizations for sorting and searching
                    </p>
                </header>

                <div className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Algorithm</label>
                            <select 
                                value={algorithm} 
                                onChange={(e) => setAlgorithm(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:outline-none transition-all text-slate-100 backdrop-blur-md"
                            >
                                <option value="cycle-sort" className="bg-slate-900">Cycle Sort</option>
                                <option value="binary-search" className="bg-slate-900">Binary Search</option>
                                <option value="bit-manipulation" className="bg-slate-900">Bit Manipulation (Unique Element)</option>
                                <option value="array-manipulation" className="bg-slate-900">Array Manipulation (Reverse)</option>
                            </select>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Input Array</label>
                            <input 
                                type="text"
                                value={inputArray}
                                onChange={(e) => setInputArray(e.target.value)}
                                placeholder="e.g. 5, 2, 1, 4, 3"
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:outline-none transition-all placeholder-slate-500 text-slate-100 backdrop-blur-md"
                            />
                        </div>

                        {algorithm === 'binary-search' && (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Target</label>
                                <input 
                                    type="number"
                                    value={target}
                                    onChange={(e) => setTarget(e.target.value)}
                                    placeholder="Search target"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:outline-none transition-all placeholder-slate-500 text-slate-100 backdrop-blur-md"
                                />
                            </div>
                        )}
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                        <button 
                            onClick={handleRun}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-900/20 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center min-w-[200px]"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                'Generate Visualization'
                            )}
                        </button>
                    </div>
                    
                    {error && <div className="mt-6 text-red-400 text-sm bg-red-900/20 border border-red-900/50 p-3 rounded-lg backdrop-blur-sm">{error}</div>}
                </div>

                {steps.length > 0 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-6">
                                <Visualizer 
                                    currentStep={playback.currentStep} 
                                    isFinished={playback.isFinished}
                                    isQuizMode={playback.isQuizMode}
                                    onPredictionClick={playback.handlePrediction}
                                    nextStepIndices={playback.nextStepIndices}
                                />
                                
                                <Controls 
                                    {...playback}
                                    hasSteps={steps.length > 0}
                                />
                            </div>
                            
                            <div className="space-y-6">
                                <AnalyticsPanel 
                                    algorithm={algorithm}
                                    comparisons={playback.currentStep?.comparisonsSoFar}
                                    writes={playback.currentStep?.writesSoFar}
                                    isQuizMode={playback.isQuizMode}
                                    quizScore={playback.quizScore}
                                />
                            </div>
                        </div>
                        
                        <div className="w-full mt-6">
                            <CodeViewer 
                                algorithm={algorithm}
                                activeLineNumber={playback.currentStep?.activeLineNumber}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
