import React, { useState, useEffect } from 'react';
import { Coffee, MapPin, Star } from 'lucide-react';
import { getApiUrl } from '../services/apiConfig';

export default function RestStopFinder({ isFatigued }) {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    fetch(getApiUrl('/api/rest_stops'))
      .then((res) => res.json())
      .then((data) => setStops(data.stations || []))
      .catch(() => {});
  }, [isFatigued]);

  return (
    <div className={`p-4 rounded-2xl glass-panel transition-all ${isFatigued ? 'border-amber-500 glow-amber' : 'border-slate-800'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Coffee className="w-3.5 h-3.5 text-amber-400" />
          NEAREST HIGHWAY REST STOPS & TEA
        </span>
        {isFatigued && (
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-950 text-amber-300 border border-amber-600 animate-pulse">
            FATIGUE ALERT
          </span>
        )}
      </div>

      <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
        {stops.map((station) => (
          <div
            key={station.id}
            className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
              station.recommended
                ? 'bg-amber-950/40 border-amber-600/80 text-amber-200'
                : 'bg-slate-950/60 border-slate-800 text-slate-300'
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 font-bold text-white text-[11px] truncate">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{station.name}</span>
                <span className="text-[9px] text-amber-400 flex items-center ml-1">
                  <Star className="w-2.5 h-2.5 fill-amber-400" /> {station.rating}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{station.type}</span>
                <span>•</span>
                <span>{station.amenities.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            <div className="text-right shrink-0 ml-2">
              <div className="font-mono font-bold text-cyan-400 text-xs">{station.distance_km} km</div>
              <div className="text-[9px] text-slate-500 font-mono">~{station.eta_mins} mins</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
