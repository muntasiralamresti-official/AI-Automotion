import React, { useState } from 'react';
import { Camera, Maximize, Minimize, RefreshCw, Radio } from 'lucide-react';
import { getApiUrl } from '../services/apiConfig';

export default function VideoFeed({ isAlarmActive }) {
  const [streamKey, setStreamKey] = useState(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const reloadStream = () => setStreamKey(Date.now());

  const toggleFullscreen = () => {
    const elem = document.getElementById('camera-feed-container');
    if (!elem) return;
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      id="camera-feed-container"
      className={`relative rounded-2xl overflow-hidden glass-panel transition-all ${
        isAlarmActive
          ? 'border-red-500 glow-red ring-4 ring-red-500/40'
          : 'border-slate-800/80 shadow-2xl'
      } flex flex-col`}
    >
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full border border-slate-700/80 text-[11px] text-white">
        <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span className="font-mono font-semibold tracking-wider">HUD OPTICAL FEED</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
      </div>

      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <button
          onClick={reloadStream}
          title="Reload Stream"
          className="p-2 bg-slate-950/80 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white border border-slate-700/80 transition-colors shadow-md active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={toggleFullscreen}
          title="Toggle Fullscreen"
          className="p-2 bg-slate-950/80 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white border border-slate-700/80 transition-colors shadow-md active:scale-95"
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
        </button>
      </div>

      {isAlarmActive && (
        <div className="absolute inset-0 z-20 pointer-events-none border-4 sm:border-8 border-red-600 bg-red-600/15 animate-pulse flex items-center justify-center p-4">
          <div className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600/90 backdrop-blur-md text-white font-black text-lg sm:text-2xl tracking-wider rounded-xl shadow-2xl animate-bounce text-center">
            ⚠️ WAKE UP! EYES CLOSED! ⚠️
          </div>
        </div>
      )}

      <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-950 flex items-center justify-center relative overflow-hidden">
        <img
          key={streamKey}
          src={getApiUrl(`/api/video_feed?t=${streamKey}`)}
          alt="Driver HUD Camera Stream"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 pointer-events-none p-4 text-center">
          <Camera className="w-10 h-10 mb-2 text-slate-600 animate-pulse" />
          <p className="text-xs sm:text-sm font-medium">Connecting to Driver Optical Sentinel...</p>
          <p className="text-[10px] sm:text-xs text-slate-600 mt-1">Live Optical Face Scanning</p>
        </div>
      </div>
    </div>
  );
}
