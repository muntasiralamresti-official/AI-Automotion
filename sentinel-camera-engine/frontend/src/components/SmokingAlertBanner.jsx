import React from 'react';
import { Cigarette, AlertCircle } from 'lucide-react';

export default function SmokingAlertBanner({ isSmoking, smokingCount }) {
  if (!isSmoking && (!smokingCount || smokingCount === 0)) {
    return null;
  }

  return (
    <div className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
      isSmoking ? 'bg-orange-950/70 border-orange-500 text-orange-200 animate-pulse glow-amber' : 'bg-slate-900 border-slate-800 text-slate-400'
    }`}>
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${isSmoking ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-500'}`}>
          <Cigarette className="w-4 h-4" />
        </div>
        <div className="text-xs">
          <div className="font-bold text-white">{isSmoking ? 'SMOKING / VAPING DETECTED!' : 'Smoking Policy Monitor'}</div>
          <div className="text-[10px] text-slate-400">Strictly prohibited in commercial transport & fuel tankers.</div>
        </div>
      </div>

      <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-slate-950 text-orange-400 border border-slate-800 font-bold">
        Violations: {smokingCount || 0}
      </span>
    </div>
  );
}
