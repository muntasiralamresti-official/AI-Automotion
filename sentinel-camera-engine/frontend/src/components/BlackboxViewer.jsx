import React, { useState, useEffect } from 'react';
import { Film, Lock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { getApiUrl } from '../services/apiConfig';

export default function BlackboxViewer() {
  const [recordings, setRecordings] = useState([]);
  const [isLocking, setIsLocking] = useState(false);

  const fetchRecordings = () => {
    fetch(getApiUrl('/api/blackbox/recordings'))
      .then((res) => res.json())
      .then((data) => setRecordings(data.recordings || []))
      .catch(() => {});
  };

  useEffect(() => {
    fetchRecordings();
    const interval = setInterval(fetchRecordings, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerLock = async () => {
    setIsLocking(true);
    await fetch(getApiUrl('/api/blackbox/trigger'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason: 'Operator Manual Incident Capture' })
    });
    setTimeout(() => {
      fetchRecordings();
      setIsLocking(false);
    }, 1200);
  };

  return (
    <div className="p-4 rounded-2xl glass-panel border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Film className="w-3.5 h-3.5 text-cyan-400" />
          BLACKBOX 30s ROLLING CRASH RECORDER
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-950 text-cyan-400 border border-slate-800">
          Rolling Buffer: 30s
        </span>
      </div>

      <div className="flex items-center justify-between text-xs mb-2.5 p-2 bg-slate-950/70 rounded-xl border border-slate-800">
        <span className="text-slate-400 text-[11px]">Continuous Loop Cache:</span>
        <button
          onClick={triggerLock}
          disabled={isLocking}
          className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95 disabled:opacity-50"
        >
          <Lock className="w-3 h-3" />
          <span>{isLocking ? 'LOCKING CLIP...' : 'LOCK 30s INCIDENT CLIP'}</span>
        </button>
      </div>

      <div className="space-y-1.5 max-h-[105px] overflow-y-auto pr-1 text-xs">
        {recordings.length > 0 ? (
          recordings.map((rec, i) => (
            <div
              key={i}
              className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px]"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate font-mono text-slate-200">{rec.filename}</span>
              </div>
              <span className="text-[9px] text-slate-500 shrink-0 ml-2">{rec.timestamp}</span>
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-center py-4 text-xs italic">
            Loop active. Footage automatically locked upon collision or severe sleep alert.
          </p>
        )}
      </div>
    </div>
  );
}
