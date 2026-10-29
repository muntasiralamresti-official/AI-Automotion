import React, { useState } from 'react';
import { Mic, MicOff, Radio, Volume2 } from 'lucide-react';
import { getApiUrl } from '../services/apiConfig';

export default function IntercomPanel() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [officerName] = useState('Officer Tareq (HQ Dispatch)');

  const toggleBroadcast = async () => {
    if (!isBroadcasting) {
      setIsBroadcasting(true);
      await fetch(getApiUrl('/api/intercom/broadcast'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ officer_name: officerName })
      });
    } else {
      setIsBroadcasting(false);
      await fetch(getApiUrl('/api/intercom/stop'), { method: 'POST' });
    }
  };

  return (
    <div className={`p-4 rounded-2xl glass-panel transition-all ${isBroadcasting ? 'border-cyan-500 glow-cyan' : 'border-slate-800'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          TWO-WAY HQ LIVE INTERCOM
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border ${
          isBroadcasting ? 'bg-cyan-950 text-cyan-300 border-cyan-600 animate-pulse' : 'bg-slate-950 text-slate-500 border-slate-800'
        }`}>
          {isBroadcasting ? 'LIVE ON AIR' : 'STANDBY'}
        </span>
      </div>

      <p className="text-[11px] text-slate-400 mb-3">
        Dispatch officers can speak directly into the driver cabin speaker upon emergency alerts.
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleBroadcast}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
            isBroadcasting
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white animate-pulse'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
          }`}
        >
          {isBroadcasting ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          <span>{isBroadcasting ? 'STOP PUSH-TO-TALK' : 'START PUSH-TO-TALK'}</span>
        </button>

        {isBroadcasting && (
          <div className="p-2.5 bg-cyan-950/80 rounded-xl border border-cyan-700 flex items-center gap-1.5 text-cyan-300 text-xs font-mono">
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span>CABIN LIVE</span>
          </div>
        )}
      </div>
    </div>
  );
}
