import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ALGORITHM_CODE = {
    'binary-search': 
`function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
    'cycle-sort':
`function cycleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let item = array[i];
    let pos = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < item) pos++;
    }
    if (pos === i) continue;
    while (item === array[pos]) pos++;
    swap(item, array[pos]);
    while (pos !== i) {
      pos = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < item) pos++;
      }
      while (item === array[pos]) pos++;
      swap(item, array[pos]);
    }
  }
}`,
    'bit-manipulation':
`function findUnique(array) {
  let unique = 0;
  for (let i = 0; i < array.length; i++) {
    unique ^= array[i];
  }
  return unique;
}`,
    'array-manipulation':
`function reverseArray(array) {
  let left = 0;
  let right = array.length - 1;
  while (left < right) {
    swap(array[left], array[right]);
    left++;
    right--;
  }
}`
};

const CodeViewer = ({ algorithm, activeLineNumber }) => {
    const code = ALGORITHM_CODE[algorithm] || '// Select an algorithm';

    return (
        <div className="w-full min-h-[500px] backdrop-blur-xl bg-white/[0.03] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/[0.06] p-6 flex flex-col">
            <h3 className="text-sm font-semibold text-emerald-400/90 mb-4 uppercase tracking-widest">Pseudocode Tracker</h3>
            <div className="flex-grow overflow-auto rounded-xl bg-[#111116] border border-white/[0.02] shadow-inner font-mono text-sm relative">
                <SyntaxHighlighter 
                    language="javascript" 
                    style={atomDark}
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{ 
                        margin: 0, 
                        padding: '1.5rem', 
                        background: 'transparent',
                        fontSize: '14px',
                        lineHeight: '1.7',
                        fontFamily: 'inherit' // Inherits JetBrains Mono from parent
                    }}
                    lineProps={lineNumber => {
                        const isActive = lineNumber === activeLineNumber;
                        return {
                            style: { 
                                display: 'block',
                                backgroundColor: isActive ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                                borderLeft: isActive ? '4px solid #34d399' : '4px solid transparent',
                                transition: 'background-color 0.3s ease, border-color 0.3s ease'
                            },
                            className: isActive ? 'active-line' : ''
                        };
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeViewer;
