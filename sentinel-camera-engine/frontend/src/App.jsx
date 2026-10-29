import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import VideoFeed from './components/VideoFeed';
import RiskMeter from './components/RiskMeter';
import TelemetryCards from './components/TelemetryCards';
import EarChart from './components/EarChart';
import AlarmBuzzer from './components/AlarmBuzzer';
import SettingsPanel from './components/SettingsPanel';
import EventLog from './components/EventLog';
import GazeIndicator from './components/GazeIndicator';
import SpeedControl from './components/SpeedControl';
import EmergencyPanel from './components/EmergencyPanel';
import IntercomPanel from './components/IntercomPanel';
import AlcoholInterlock from './components/AlcoholInterlock';
import RestStopFinder from './components/RestStopFinder';
import BlackboxViewer from './components/BlackboxViewer';
import FaceIdAuthModal from './components/FaceIdAuthModal';
import SmokingAlertBanner from './components/SmokingAlertBanner';
import { TelemetrySocket } from './services/websocket';
import { browserAlarm } from './services/audioBuzzer';
import { voiceAlert } from './services/voiceAlert';
import { getApiUrl, getWebSocketUrl } from './services/apiConfig';
import { LayoutDashboard, Sliders, Shield, Radio } from 'lucide-react';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [telemetry, setTelemetry] = useState(null);
  const [tripDuration, setTripDuration] = useState(0);
  const [earHistory, setEarHistory] = useState([]);
  const [eventLogs, setEventLogs] = useState([]);
  const [voiceLang, setVoiceLang] = useState('bn-BD');
  const [isNightVision, setIsNightVision] = useState(false);
  const [mobileTab, setMobileTab] = useState('feed');
  const lastAlarmRef = useRef(false);

  useEffect(() => {
    const wsUrl = getWebSocketUrl('/ws/telemetry');
    const socket = new TelemetrySocket(
      wsUrl,
      (data) => {
        setTelemetry(data);

        if (data.avg_ear !== undefined) {
          setEarHistory((prev) => {
            const next = [...prev, data.avg_ear];
            return next.length > 30 ? next.slice(next.length - 30) : next;
          });
        }

        // Audio Siren & Voice Alerts
        if (data.trigger_alarm) {
          browserAlarm.startAlarm();
          voiceAlert.speak('SLEEP', voiceLang);
          if (!lastAlarmRef.current) {
            addEventLog('ALARM', `Driver shut eyes > ${data.sleep_threshold_sec}s! Siren sounding!`);
            lastAlarmRef.current = true;
          }
        } else {
          browserAlarm.stopAlarm();
          if (lastAlarmRef.current) {
            addEventLog('NORMAL', 'Driver awake. Siren silenced.');
            lastAlarmRef.current = false;
          }
        }

        if (data.status === 'SMOKING_WARNING') {
          addEventLog('WARNING', 'Smoking detected inside cabin!');
        }

        if (data.status === 'DISTRACTION_WARNING') {
          voiceAlert.speak('DISTRACTION', voiceLang);
          addEventLog('WARNING', `Phone / Head distraction (${data.distraction_seconds}s)!`);
        }

        if (data.is_yawning && data.yawn_duration_sec > 1.2) {
          addEventLog('WARNING', 'Driver yawning detected (Fatigue Alert)');
        }
      },
      (connected) => setIsConnected(connected)
    );

    socket.connect();
    return () => socket.disconnect();
  }, [voiceLang]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetch(getApiUrl('/api/stats'))
        .then((r) => r.json())
        .then((data) => {
          if (data.trip_duration_seconds !== undefined) {
            setTripDuration(data.trip_duration_seconds);
          }
        })
        .catch(() => {});
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addEventLog = (type, message) => {
    const now = new Date().toLocaleTimeString();
    setEventLogs((prev) => [{ type, message, time: now }, ...prev.slice(0, 19)]);
  };

  const handleSpeedChange = async (speed) => {
    await fetch(getApiUrl('/api/speed'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ speed_kmh: speed })
    });
  };

  const handleNightVisionToggle = async () => {
    const res = await fetch(getApiUrl('/api/night_vision/toggle'), { method: 'POST' });
    const data = await res.json();
    setIsNightVision(data.enable_night_vision);
  };

  const handleResetEmergency = async () => {
    await fetch(getApiUrl('/api/hazard/reset'), { method: 'POST' });
  };

  const isAlarmActive = telemetry?.trigger_alarm ?? false;

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 p-2 sm:p-4 lg:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
        <Header
          status={telemetry?.status ?? 'AWAKE'}
          isConnected={isConnected}
          tripDurationSec={tripDuration}
        />

        <SmokingAlertBanner
          isSmoking={telemetry?.is_smoking ?? false}
          smokingCount={telemetry?.smoking_count ?? 0}
        />

        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center justify-between p-1 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setMobileTab('feed')}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'feed' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>HUD FEED</span>
          </button>
          <button
            onClick={() => setMobileTab('controls')}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'controls' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>CONTROLS</span>
          </button>
          <button
            onClick={() => setMobileTab('fleet')}
            className={`flex-1 py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'fleet' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>FLEET AI</span>
          </button>
        </div>

        {/* Main Grid: Responsive 12 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Left Column: Live Video Feed, Gaze, Face ID, Telemetry */}
          <div className={`lg:col-span-7 flex flex-col gap-3 sm:gap-4 ${mobileTab === 'controls' || mobileTab === 'fleet' ? 'hidden lg:flex' : 'flex'}`}>
            <VideoFeed isAlarmActive={isAlarmActive} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <FaceIdAuthModal
                isAuthorized={telemetry?.driver_authorized ?? true}
                driverName={telemetry?.driver_name}
              />
              <AlcoholInterlock
                alcoholBac={telemetry?.alcohol_bac ?? 0.0}
                isIgnitionLocked={telemetry?.ignition_locked ?? false}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              <GazeIndicator
                gazeDirection={telemetry?.gaze_direction ?? 'FORWARD'}
                isDistracted={telemetry?.is_distracted ?? false}
                distractionSec={telemetry?.distraction_seconds ?? 0}
              />
              <SpeedControl
                currentSpeed={telemetry?.vehicle_speed ?? 65}
                isNightVision={isNightVision}
                onSpeedChange={handleSpeedChange}
                onNightVisionToggle={handleNightVisionToggle}
              />
            </div>
            <TelemetryCards telemetry={telemetry} />
            <RestStopFinder isFatigued={(telemetry?.risk_score ?? 0) > 40} />
          </div>

          {/* Right Column: Risk Gauge, Intercom, Blackbox, Relays, Settings */}
          <div className={`lg:col-span-5 flex flex-col gap-3 sm:gap-4 ${mobileTab === 'feed' ? 'hidden lg:flex' : 'flex'}`}>
            <RiskMeter
              riskScore={telemetry?.risk_score ?? 0}
              closedSec={telemetry?.closed_seconds ?? 0}
              sleepThreshold={telemetry?.sleep_threshold_sec ?? 3.0}
            />
            <IntercomPanel />
            <BlackboxViewer />
            <EmergencyPanel
              hazardActive={telemetry?.hazard_lights ?? false}
              hapticActive={telemetry?.haptic_vibration ?? false}
              sosDispatched={telemetry?.sos_dispatched ?? false}
              voiceLang={voiceLang}
              onLangChange={setVoiceLang}
              onResetEmergency={handleResetEmergency}
            />
            <AlarmBuzzer isAlarmActive={isAlarmActive} />
            <EarChart
              earHistory={earHistory}
              threshold={telemetry?.ear_threshold || 0.22}
            />
            <SettingsPanel
              onSettingsUpdated={(s) =>
                addEventLog('NORMAL', `Settings: Timeout=${s.sleep_time_seconds}s, EAR=${s.ear_threshold}`)
              }
            />
            <EventLog logs={eventLogs} />
          </div>
        </div>
      </div>
    </div>
  );
}
