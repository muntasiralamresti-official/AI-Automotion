import React from 'react';
import { Eye, EyeOff, Smile, Compass } from 'lucide-react';

export default function TelemetryCards({ telemetry }) {
  const isEyesClosed = telemetry?.is_eyes_closed ?? false;
  const avgEar = telemetry?.avg_ear ?? 0.0;
  const blinks = telemetry?.total_blinks ?? 0;
  const yawns = telemetry?.total_yawns ?? 0;
  const mar = telemetry?.mar ?? 0.0;
  const pitch = telemetry?.head_pitch ?? 0.0;
  const isNodding = telemetry?.is_nodding ?? false;

  const cards = [
    {
      title: 'EYE APERTURE (EAR)',
      value: avgEar.toFixed(2),
      status: isEyesClosed ? 'CLOSED' : 'OPEN',
      statusColor: isEyesClosed ? 'text-red-400 bg-red-950/80 border-red-800 glow-red' : 'text-emerald-400 bg-emerald-950/80 border-emerald-800 glow-emerald',
      icon: isEyesClosed ? EyeOff : Eye,
      iconColor: isEyesClosed ? 'text-red-400' : 'text-cyan-400',
      subText: `Blinks: ${blinks}`
    },
    {
      title: 'MOUTH / YAWN (MAR)',
      value: mar.toFixed(2),
      status: telemetry?.is_yawning ? 'YAWNING' : 'NORMAL',
      statusColor: telemetry?.is_yawning ? 'text-amber-400 bg-amber-950/80 border-amber-800 glow-amber' : 'text-slate-400 bg-slate-950 border-slate-800',
      icon: Smile,
      iconColor: 'text-amber-400',
      subText: `Yawns: ${yawns}`
    },
    {
      title: 'HEAD PITCH (NOD)',
      value: `${pitch > 0 ? '+' : ''}${pitch}°`,
      status: isNodding ? 'NODDING DOWN' : 'UPRIGHT',
      statusColor: isNodding ? 'text-red-400 bg-red-950/80 border-red-800 glow-red' : 'text-emerald-400 bg-emerald-950/80 border-emerald-800 glow-emerald',
      icon: Compass,
      iconColor: isNodding ? 'text-red-400' : 'text-indigo-400',
      subText: isNodding ? 'Micro-sleep risk' : 'Posture upright'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div key={idx} className="glass-panel rounded-2xl p-3.5 sm:p-4 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
              <IconComponent className={`w-4 h-4 ${card.iconColor}`} />
            </div>

            <div className="my-1.5 flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-black font-mono text-white">{card.value}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-lg border font-semibold ${card.statusColor}`}>
                {card.status}
              </span>
            </div>

            <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">{card.subText}</div>
          </div>
        );
      })}
    </div>
  );
}
