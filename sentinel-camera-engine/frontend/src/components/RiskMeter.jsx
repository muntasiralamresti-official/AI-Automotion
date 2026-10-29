import React from 'react';
import { AlertTriangle, Clock, Zap } from 'lucide-react';

export default function RiskMeter({ riskScore, closedSec, sleepThreshold }) {
  const safeRisk = Math.min(100, Math.max(0, riskScore || 0));
  const safeClosed = Math.max(0, closedSec || 0);
  const safeThreshold = sleepThreshold || 3.0;
  const progressRatio = Math.min(1.0, safeClosed / safeThreshold);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * safeRisk) / 100;

  const getColor = () => {
    if (safeRisk >= 75) return '#ef4444'; // Red
    if (safeRisk >= 40) return '#f59e0b'; // Amber
    return '#10b981'; // Emerald
  };

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-cyan-400" />
          DROWSINESS RISK GAUGE
        </h3>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full font-mono bg-slate-950/80 text-cyan-400 border border-slate-800">
          Target: {safeThreshold}s
        </span>
      </div>

      <div className="flex flex-row items-center justify-around gap-4 py-2">
        {/* Modern Circular SVG Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#1e293b"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={getColor()}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              {Math.round(safeRisk)}%
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
              Threat Level
            </span>
          </div>
        </div>

        {/* Eye Closed Countdown Bar */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              Closed Timer:
            </span>
            <span className={`font-mono font-bold text-xs ${safeClosed > 1.5 ? 'text-red-400 animate-pulse' : 'text-slate-200'}`}>
              {safeClosed.toFixed(1)}s / {safeThreshold}s
            </span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-150 ${
                progressRatio >= 0.8
                  ? 'bg-gradient-to-r from-red-500 to-rose-600 animate-pulse'
                  : progressRatio >= 0.4
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                  : 'bg-gradient-to-r from-cyan-500 to-teal-400'
              }`}
              style={{ width: `${progressRatio * 100}%` }}
            />
          </div>

          <div className="flex items-start gap-1 text-[10px] text-slate-400 leading-snug">
            <Zap className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
            <span>Dual-tone Siren alarms immediately upon reaching {safeThreshold}s.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
