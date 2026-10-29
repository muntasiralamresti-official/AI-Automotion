import React, { useState } from 'react';
import { Gauge, Moon, Sun, Zap } from 'lucide-react';

export default function SpeedControl({ currentSpeed, isNightVision, onSpeedChange, onNightVisionToggle }) {
  const [speed, setSpeed] = useState(currentSpeed || 65);

  const applySpeed = (val) => {
    setSpeed(val);
    if (onSpeedChange) onSpeedChange(val);
  };

  return (
    <div className="glass-panel rounded-2xl p-3.5 sm:p-4 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-cyan-400" />
          OBD-II SPEEDOMETER
        </span>

        <button
          onClick={onNightVisionToggle}
          className={`px-2 py-1 rounded-xl text-[10px] sm:text-xs font-semibold border flex items-center gap-1.5 transition-colors active:scale-95 ${
            isNightVision
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 glow-emerald'
              : 'bg-slate-950/80 border-slate-700 text-slate-400'
          }`}
        >
          {isNightVision ? <Moon className="w-3 h-3 text-emerald-400" /> : <Sun className="w-3 h-3" />}
          <span>{isNightVision ? 'IR NIGHT ON' : 'IR NIGHT OFF'}</span>
        </button>
      </div>

      <div className="my-1.5">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-[11px] text-slate-400">Current Velocity:</span>
          <span className="text-lg sm:text-xl font-black font-mono text-cyan-400">{Math.round(speed)} km/h</span>
        </div>
        <input
          type="range"
          min="0"
          max="140"
          step="5"
          value={speed}
          onChange={(e) => applySpeed(parseFloat(e.target.value))}
          className="w-full accent-cyan-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
        />

        {/* Speed Presets for Fast Mobile Tap */}
        <div className="grid grid-cols-4 gap-1.5 mt-2">
          {[0, 45, 80, 110].map((preset) => (
            <button
              key={preset}
              onClick={() => applySpeed(preset)}
              className={`py-1 rounded-lg text-[10px] font-mono font-bold border transition-colors ${
                Math.abs(speed - preset) < 10
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {preset} km/h
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-slate-800 mt-2">
        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate">
          {speed >= 90 ? '⚡ Highway: Alert at 1.8s' : speed >= 60 ? '🚗 City: Alert at 2.2s' : '🛑 Idle: Alert at 3.0s'}
        </span>
      </div>
    </div>
  );
}
