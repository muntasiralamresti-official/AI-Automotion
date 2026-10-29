import React, { useState } from 'react';
import { Wine, ShieldCheck, ShieldAlert, KeyRound } from 'lucide-react';
import { getApiUrl } from '../services/apiConfig';

export default function AlcoholInterlock({ alcoholBac, isIgnitionLocked }) {
  const [bac, setBac] = useState(alcoholBac || 0.0);
  const [isLocked, setIsLocked] = useState(isIgnitionLocked || false);

  const simulateBlow = async (testBac) => {
    setBac(testBac);
    setIsLocked(testBac >= 0.04);
    await fetch(getApiUrl('/api/alcohol/test'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bac_percent: testBac })
    });
  };

  return (
    <div className={`p-4 rounded-2xl glass-panel transition-all ${isLocked ? 'border-red-500 glow-red' : 'border-slate-800'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Wine className="w-3.5 h-3.5 text-cyan-400" />
          MQ-3 BREATHALYZER & IGNITION LOCK
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border ${
          isLocked ? 'bg-red-950 text-red-300 border-red-700 animate-pulse' : 'bg-emerald-950 text-emerald-300 border-emerald-700'
        }`}>
          {isLocked ? 'IGNITION LOCKED' : 'ENGINE READY'}
        </span>
      </div>

      <div className="flex items-center justify-between my-2 p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          {isLocked ? <ShieldAlert className="w-5 h-5 text-red-400" /> : <ShieldCheck className="w-5 h-5 text-emerald-400" />}
          <div>
            <div className="text-xs font-bold text-white">BAC Level: {bac.toFixed(2)}%</div>
            <div className="text-[10px] text-slate-400">Legal Threshold: 0.04% BAC</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <KeyRound className={`w-4 h-4 ${isLocked ? 'text-red-500' : 'text-emerald-400'}`} />
          <span className={`text-[10px] font-bold ${isLocked ? 'text-red-400' : 'text-emerald-400'}`}>
            {isLocked ? 'DISABLED' : 'ENABLED'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => simulateBlow(0.00)}
          className="py-1.5 bg-slate-950/80 hover:bg-slate-800 text-emerald-300 border border-emerald-900/60 rounded-xl text-[10px] font-bold transition-all active:scale-95"
        >
          BLOW: 0.00% (PASS)
        </button>
        <button
          onClick={() => simulateBlow(0.08)}
          className="py-1.5 bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/80 rounded-xl text-[10px] font-bold transition-all active:scale-95"
        >
          BLOW: 0.08% (LOCK IGNITION)
        </button>
      </div>
    </div>
  );
}
