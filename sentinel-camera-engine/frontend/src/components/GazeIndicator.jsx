import React from 'react';
import { Smartphone, Eye, AlertOctagon } from 'lucide-react';

export default function GazeIndicator({ gazeDirection, isDistracted, distractionSec }) {
  const getBadge = () => {
    if (gazeDirection === 'LOOKING_DOWN_PHONE') {
      return {
        label: 'PHONE DISTRACTION',
        color: 'bg-rose-950/80 text-rose-300 border-rose-600 glow-red animate-pulse',
        icon: Smartphone
      };
    }
    if (gazeDirection === 'LOOKING_LEFT' || gazeDirection === 'LOOKING_RIGHT') {
      return {
        label: `LOOKING ${gazeDirection.replace('LOOKING_', '')}`,
        color: 'bg-amber-950/80 text-amber-300 border-amber-600 glow-amber',
        icon: Eye
      };
    }
    return {
      label: 'FOCUSED FORWARD',
      color: 'bg-emerald-950/80 text-emerald-300 border-emerald-600 glow-emerald',
      icon: Eye
    };
  };

  const badge = getBadge();
  const Icon = badge.icon;

  return (
    <div className={`p-3.5 sm:p-4 rounded-2xl glass-panel transition-all ${isDistracted ? 'border-rose-500/80 glow-red' : 'border-slate-800'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5 text-cyan-400" />
          GAZE & PHONE TRACKER
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-mono font-bold ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs pt-1">
        <span className="text-slate-400 text-[11px]">Distraction Timer:</span>
        <span className={`font-mono font-bold text-xs ${isDistracted ? 'text-rose-400' : 'text-slate-500'}`}>
          {distractionSec > 0 ? `${distractionSec.toFixed(1)}s` : '0.0s'} / 2.0s
        </span>
      </div>

      {isDistracted && (
        <div className="mt-2 text-[10px] sm:text-[11px] text-rose-200 bg-rose-950/70 p-2 rounded-xl border border-rose-800 flex items-center gap-1.5 animate-pulse">
          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Eyes averted from road! Keep focus forward!</span>
        </div>
      )}
    </div>
  );
}
