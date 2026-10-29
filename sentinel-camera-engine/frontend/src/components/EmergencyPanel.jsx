import React from 'react';
import { Radio, AlertTriangle, Vibrate, MapPin, Globe } from 'lucide-react';

export default function EmergencyPanel({
  hazardActive,
  hapticActive,
  sosDispatched,
  voiceLang,
  onLangChange,
  onResetEmergency
}) {
  return (
    <div className={`p-4 rounded-2xl glass-panel transition-all ${hazardActive ? 'border-red-500 glow-red' : 'border-slate-800'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          ADAS RELAY & FLEET SOS
        </span>

        {/* Voice Language Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <Globe className="w-3 h-3 text-cyan-400 ml-1" />
          <button
            onClick={() => onLangChange('bn-BD')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${voiceLang === 'bn-BD' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400'}`}
          >
            বাংলা
          </button>
          <button
            onClick={() => onLangChange('en-US')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${voiceLang === 'en-US' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400'}`}
          >
            ENG
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${hazardActive ? 'bg-red-600/30 border-red-500 text-red-200 animate-pulse glow-red' : 'bg-slate-950/60 border-slate-800/80 text-slate-500'}`}>
          <AlertTriangle className={`w-4 h-4 shrink-0 ${hazardActive ? 'text-red-400' : 'text-slate-600'}`} />
          <div className="text-[10px] leading-tight min-w-0">
            <div className="font-bold truncate">HAZARD LIGHTS</div>
            <div className="text-[9px]">{hazardActive ? 'ACTIVE FLASHING' : 'STANDBY'}</div>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${hapticActive ? 'bg-amber-600/30 border-amber-500 text-amber-200 animate-pulse glow-amber' : 'bg-slate-950/60 border-slate-800/80 text-slate-500'}`}>
          <Vibrate className={`w-4 h-4 shrink-0 ${hapticActive ? 'text-amber-400' : 'text-slate-600'}`} />
          <div className="text-[10px] leading-tight min-w-0">
            <div className="font-bold truncate">SEAT HAPTIC</div>
            <div className="text-[9px]">{hapticActive ? 'VIBRATING!' : 'INACTIVE'}</div>
          </div>
        </div>
      </div>

      {/* GPS & SOS Status Pill */}
      <div className="flex items-center justify-between text-[11px] bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 mb-2">
        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] sm:text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>23.8103° N, 90.4125° E</span>
        </div>
        <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[9px] sm:text-[10px] border ${sosDispatched ? 'bg-rose-950/80 text-rose-300 border-rose-700 animate-pulse' : 'bg-slate-900 text-slate-400 border-slate-700'}`}>
          {sosDispatched ? 'SOS SENT' : 'HQ LINKED'}
        </span>
      </div>

      {hazardActive && (
        <button
          onClick={onResetEmergency}
          className="w-full py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95"
        >
          RESET EMERGENCY HAZARDS
        </button>
      )}
    </div>
  );
}
