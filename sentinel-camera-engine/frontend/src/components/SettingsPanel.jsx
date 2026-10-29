import React, { useState, useEffect } from 'react';
import { Sliders, Check } from 'lucide-react';
import { getApiUrl } from '../services/apiConfig';

export default function SettingsPanel({ onSettingsUpdated }) {
  const [sleepSec, setSleepSec] = useState(3.0);
  const [earThreshold, setEarThreshold] = useState(0.22);
  const [marThreshold, setMarThreshold] = useState(0.65);
  const [backendBuzzer, setBackendBuzzer] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch(getApiUrl('/api/settings'))
      .then((res) => res.json())
      .then((data) => {
        if (data.sleep_time_seconds) setSleepSec(data.sleep_time_seconds);
        if (data.ear_threshold) setEarThreshold(data.ear_threshold);
        if (data.mar_threshold) setMarThreshold(data.mar_threshold);
        if (data.enable_backend_buzzer !== undefined) setBackendBuzzer(data.enable_backend_buzzer);
      })
      .catch(() => {});
  }, []);

  const saveSettings = async () => {
    try {
      const payload = {
        sleep_time_seconds: parseFloat(sleepSec),
        ear_threshold: parseFloat(earThreshold),
        mar_threshold: parseFloat(marThreshold),
        enable_backend_buzzer: backendBuzzer
      };
      const res = await fetch(getApiUrl('/api/settings'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
        if (onSettingsUpdated) onSettingsUpdated(payload);
      }
    } catch (e) {}
  };

  return (
    <div className="glass-panel rounded-2xl p-4 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          CALIBRATION & SENSITIVITY
        </h3>
        {isSaved && (
          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-600 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
            <Check className="w-3 h-3" /> Saved!
          </span>
        )}
      </div>

      <div className="space-y-2.5 text-xs">
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Sleep Alert Trigger Timeout:</span>
            <span className="font-mono text-cyan-400 font-bold">{sleepSec}s</span>
          </div>
          <input
            type="range"
            min="1.5"
            max="5.0"
            step="0.5"
            value={sleepSec}
            onChange={(e) => setSleepSec(e.target.value)}
            className="w-full accent-cyan-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>EAR Threshold (Eye Closure):</span>
            <span className="font-mono text-cyan-400 font-bold">{earThreshold}</span>
          </div>
          <input
            type="range"
            min="0.15"
            max="0.32"
            step="0.01"
            value={earThreshold}
            onChange={(e) => setEarThreshold(e.target.value)}
            className="w-full accent-cyan-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-slate-400 text-[11px]">Hardware Buzzer Relay:</span>
          <button
            onClick={() => setBackendBuzzer(!backendBuzzer)}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-colors active:scale-95 ${
              backendBuzzer ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300' : 'bg-slate-950 border-slate-700 text-slate-400'
            }`}
          >
            {backendBuzzer ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>

      <button
        onClick={saveSettings}
        className="mt-3.5 w-full py-2 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-700/80 transition-colors shadow-md active:scale-95"
      >
        SAVE PREFERENCES
      </button>
    </div>
  );
}
