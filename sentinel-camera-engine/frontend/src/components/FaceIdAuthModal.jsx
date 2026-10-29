import React, { useState, useEffect } from 'react';
import { UserCheck, UserX, Fingerprint } from 'lucide-react';
import { getApiUrl } from '../services/apiConfig';

export default function FaceIdAuthModal({ isAuthorized, driverName }) {
  const [authData, setAuthData] = useState({
    is_authorized: isAuthorized ?? true,
    driver_name: driverName || 'Karim Uddin (ID #8492)',
    license: 'DL-DHAKA-2024-912',
    similarity: 0.96
  });

  useEffect(() => {
    fetch(getApiUrl('/api/face_id/status'))
      .then((res) => res.json())
      .then((data) => setAuthData(data))
      .catch(() => {});
  }, [driverName, isAuthorized]);

  const authorized = authData.is_authorized;

  return (
    <div className={`p-4 rounded-2xl glass-panel transition-all ${authorized ? 'border-slate-800' : 'border-red-500 glow-red'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
          BIOMETRIC FACE ID & TIME-CARD
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border ${
          authorized ? 'bg-emerald-950 text-emerald-300 border-emerald-700' : 'bg-red-950 text-red-300 border-red-700 animate-pulse'
        }`}>
          {authorized ? 'DRIVER AUTHORIZED' : 'UNAUTHORIZED INTRUDER'}
        </span>
      </div>

      <div className="flex items-center gap-3 p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${authorized ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {authorized ? <UserCheck className="w-5 h-5" /> : <UserX className="w-5 h-5" />}
        </div>
        <div className="min-w-0 flex-1 text-xs">
          <div className="font-bold text-white truncate">{authData.driver_name}</div>
          <div className="text-[10px] text-slate-400 truncate">License: {authData.license}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] text-slate-400">Match</div>
          <div className="font-mono font-bold text-emerald-400 text-xs">{(authData.similarity * 100).toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
}
