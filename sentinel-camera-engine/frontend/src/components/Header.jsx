import React from 'react';
import { ShieldAlert, ShieldCheck, Activity, Wifi, WifiOff } from 'lucide-react';

export default function Header({ status, isConnected, tripDurationSec }) {
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = () => {
    if (status === 'SLEEPING_ALARM') {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-red-600/30 to-rose-600/30 border border-red-500 rounded-xl text-red-300 font-bold text-xs sm:text-sm animate-pulse glow-red">
          <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0" />
          <span className="tracking-wide">CRITICAL: SLEEP ALARM</span>
        </div>
      );
    }
    if (status === 'DISTRACTION_WARNING') {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-600/30 to-amber-600/30 border border-amber-500 rounded-xl text-amber-300 font-semibold text-xs sm:text-sm glow-amber">
          <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
          <span>PHONE / DISTRACTION</span>
        </div>
      );
    }
    if (status === 'DROWSY_WARNING') {
      return (
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-600/30 to-yellow-600/30 border border-amber-500 rounded-xl text-amber-300 font-semibold text-xs sm:text-sm glow-amber">
          <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
          <span>DROWSINESS DETECTED</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/50 rounded-xl text-emerald-300 font-semibold text-xs sm:text-sm glow-emerald">
        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
        <span>DRIVER ALERT & SAFE</span>
      </div>
    );
  };

  return (
    <header className="glass-panel rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Brand & Robot Logo */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-[#c8ea00] p-1 shadow-lg shadow-[#c8ea00]/20 flex items-center justify-center shrink-0 border border-[#d8f51a]">
            <img
              src="/logo_avatar.png"
              alt="Zyncoo AI Robot Sentinel Logo"
              className="w-full h-full object-contain"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                ZYNCOO AI
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded-md bg-[#c8ea00]/20 text-[#d8f51a] border border-[#c8ea00]/40 font-mono font-bold">
                  SENTINEL v2.5
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400">Autonomous Driver Safety & Vigilance System</p>
          </div>
        </div>

        {/* Mobile Connection Status Pill */}
        <div className="sm:hidden flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px]">
          {isConnected ? (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
          )}
          <span className={isConnected ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            {isConnected ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      {/* Status Badge & Metrics Pill */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-2 sm:gap-3 flex-wrap">
        {getStatusBadge()}

        <div className="flex items-center gap-2">
          {/* Trip Duration */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/70 rounded-xl text-xs text-slate-300 border border-slate-800">
            <span className="text-slate-500 text-[10px] uppercase font-bold">Trip</span>
            <span className="font-mono font-bold text-cyan-400">{formatTime(tripDurationSec)}</span>
          </div>

          {/* Desktop Connection Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/70 rounded-xl text-xs border border-slate-800">
            {isConnected ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-[11px]">LIVE WS</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-rose-400 font-semibold text-[11px]">DISCONNECTED</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
