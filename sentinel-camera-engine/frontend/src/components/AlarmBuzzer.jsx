import React, { useState } from 'react';
import { Volume2, VolumeX, BellRing, BellOff } from 'lucide-react';
import { browserAlarm } from '../services/audioBuzzer';
import { getApiUrl } from '../services/apiConfig';

export default function AlarmBuzzer({ isAlarmActive }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isTesting, setIsTesting] = useState(false);

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    browserAlarm.setVolume(isMuted ? 0 : vol);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    browserAlarm.setVolume(nextMuted ? 0 : volume);
  };

  const testAlarmSound = async () => {
    setIsTesting(true);
    browserAlarm.startAlarm();
    try {
      await fetch(getApiUrl('/api/alarm/test'), { method: 'POST' });
    } catch (e) {}
    setTimeout(() => {
      browserAlarm.stopAlarm();
      setIsTesting(false);
    }, 2500);
  };

  const silenceAll = async () => {
    browserAlarm.stopAlarm();
    try {
      await fetch(getApiUrl('/api/alarm/silence'), { method: 'POST' });
    } catch (e) {}
  };

  return (
    <div className={`p-4 rounded-2xl glass-panel transition-all ${isAlarmActive ? 'border-red-500 glow-red' : 'border-slate-800'}`}>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          {isAlarmActive ? (
            <BellRing className="w-4 h-4 text-red-400 animate-bounce" />
          ) : (
            <BellOff className="w-4 h-4 text-slate-400" />
          )}
          <h3 className="text-xs sm:text-sm font-bold text-slate-200">SPEAKER & SIREN</h3>
        </div>

        <button
          onClick={toggleMute}
          className={`p-1.5 px-2.5 rounded-xl border text-[11px] font-semibold flex items-center gap-1.5 transition-colors active:scale-95 ${
            isMuted
              ? 'bg-rose-950/80 border-rose-800 text-rose-300'
              : 'bg-slate-950 border-slate-700 text-slate-300'
          }`}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          <span>{isMuted ? 'MUTED' : 'UNMUTED'}</span>
        </button>
      </div>

      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-[11px] text-slate-400">Volume:</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 accent-cyan-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
        />
        <span className="text-xs font-mono font-bold text-cyan-400 w-8 text-right">{Math.round(volume * 100)}%</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={testAlarmSound}
          disabled={isTesting}
          className="flex-1 py-2 px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
        >
          {isTesting ? 'SOUNDING SIREN...' : 'TEST ALARM SIREN'}
        </button>

        <button
          onClick={silenceAll}
          className="py-2 px-3.5 bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors active:scale-95"
        >
          SILENCE
        </button>
      </div>
    </div>
  );
}
