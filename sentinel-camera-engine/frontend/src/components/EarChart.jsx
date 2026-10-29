import React from 'react';
import { TrendingDown } from 'lucide-react';

export default function EarChart({ earHistory, threshold = 0.22 }) {
  const points = earHistory || [];
  const maxVal = 0.45;
  const minVal = 0.05;
  const width = 360;
  const height = 85;

  const getY = (val) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    return height - ((clamped - minVal) / (maxVal - minVal)) * height;
  };

  const polylinePoints = points
    .map((val, idx) => {
      const x = (idx / Math.max(1, points.length - 1)) * width;
      const y = getY(val);
      return `${x},${y}`;
    })
    .join(' ');

  const thresholdY = getY(threshold);

  return (
    <div className="glass-panel rounded-2xl p-4 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <TrendingDown className="w-3.5 h-3.5 text-cyan-400" />
          REAL-TIME EAR OSCILLOSCOPE
        </span>
        <span className="text-[10px] font-mono text-red-400 bg-red-950/50 px-2 py-0.5 rounded-md border border-red-900/60 font-bold">
          Threshold: {threshold}
        </span>
      </div>

      <div className="relative w-full h-[85px] bg-slate-950/80 rounded-xl overflow-hidden border border-slate-800/80 p-1">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
          <line
            x1="0"
            y1={thresholdY}
            x2={width}
            y2={thresholdY}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />

          {polylinePoints && (
            <polyline
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={polylinePoints}
            />
          )}
        </svg>

        <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500">
          Last {points.length} frames
        </div>
      </div>
    </div>
  );
}
