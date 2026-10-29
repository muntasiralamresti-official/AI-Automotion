import React from 'react';
import { History, ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';

export default function EventLog({ logs }) {
  const getIcon = (type) => {
    if (type === 'ALARM') return <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0" />;
    if (type === 'WARNING') return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    return <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
  };

  return (
    <div className="glass-panel rounded-2xl p-4 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          INCIDENT TELEMETRY LOG
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">Live Audit</span>
      </div>

      <div className="space-y-1.5 max-h-[130px] overflow-y-auto pr-1 text-xs">
        {logs && logs.length > 0 ? (
          logs.map((log, index) => (
            <div
              key={index}
              className={`p-2 rounded-xl border flex items-center justify-between text-[11px] gap-2 ${
                log.type === 'ALARM'
                  ? 'bg-red-950/40 border-red-900/80 text-red-300'
                  : log.type === 'WARNING'
                  ? 'bg-amber-950/40 border-amber-900/80 text-amber-300'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                {getIcon(log.type)}
                <span className="truncate">{log.message}</span>
              </div>
              <span className="font-mono text-[9px] opacity-75 shrink-0">{log.time}</span>
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-center py-5 text-xs italic">
            Monitoring active. All driver parameters normal.
          </p>
        )}
      </div>
    </div>
  );
}
