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
        <div className="w-full min-h-[500px] backdrop-blur-xl bg-white/5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] border border-white/10 p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-emerald-300 mb-4 uppercase tracking-wider">Pseudocode</h3>
            <div className="flex-grow overflow-auto rounded-xl bg-[#1d1f21] border border-white/5 shadow-inner">
                <SyntaxHighlighter 
                    language="javascript" 
                    style={atomDark}
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{ 
                        margin: 0, 
                        padding: '1.5rem', 
                        background: 'transparent',
                        fontSize: '1.1rem',
                        lineHeight: '1.6'
                    }}
                    lineProps={lineNumber => {
                        let style = { display: 'block' };
                        if (lineNumber === activeLineNumber) {
                            style.backgroundColor = 'rgba(16, 185, 129, 0.2)'; // Emerald highlight
                            style.borderLeft = '4px solid #34d399';
                        }
                        return { style };
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeViewer;
