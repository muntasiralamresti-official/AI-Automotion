# Zyncoo AI - Driver Drowsiness Sentinel & Safety System

একটি আধুনিক, এডভান্সড রিয়েল-টাইম ফেস স্ক্যানিং ও তন্দ্রা শনাক্তকরণ (Drowsiness Detection) সিস্টেম। গাড়ির ড্রাইভার ড্রাইভ করার সময় ক্যামেরা তার চোখ, মুখ ও দৃষ্টির অভিমুখ সার্বক্ষণিক ট্র্যাক করে। ড্রাইভার ৩-৪ সেকেন্ডের বেশি সময় চোখ বন্ধ রাখলে অবিলম্বে গাড়ির স্পিকারে উচ্চমাত্রার সাইরেন ও স্মার্ট বাংলা/ইংরেজি ভয়েস দিয়ে ড্রাইভারকে জাগিয়ে তোলে।

---

## 📁 আর্কিটেকচার ও ফাইল স্ট্রাকচার

প্রজেক্টটি পরিষ্কারভাবে **Backend** ও **Frontend** আলাদা ফোল্ডারে বিভক্ত এবং প্রতিটি ফাইল ৩০০ লাইনের নিচে রাখা হয়েছে (Component-based Modular Architecture):

```text
e:\eyes\
├── backend/                        # Python 3.11 + FastAPI + Computer Vision Engine
│   ├── api/
│   │   ├── routes.py               # REST API Endpoints (Settings, Speed, SOS, Alarm)
│   │   └── websocket.py            # Live Telemetry WebSocket Broadcaster
│   ├── core/
│   │   └── config.py               # System Configurations & Pydantic State
│   ├── detectors/
│   │   ├── ear.py                  # Eye Aspect Ratio (EAR) Calculation
│   │   ├── mar.py                  # Mouth Aspect Ratio (MAR) & Yawn Detection
│   │   ├── head_pose.py            # 3D Head Tilt / Pose Estimation (Nodding)
│   │   ├── gaze.py                 # Iris Position & Phone Distraction Detection
│   │   ├── night_vision.py         # CLAHE Infrared Low-Light Enhancement
│   │   └── drowsiness_engine.py    # Unified Threat Score & Dynamic Speed Timer
│   ├── services/
│   │   ├── audio_service.py        # Local Hardware Speaker Siren Service
│   │   ├── fleet_service.py        # Fleet SOS Dispatch, GPS & Hazard Relay
│   │   └── camera_service.py       # Camera Capture, MediaPipe & Video Streamer
│   ├── main.py                     # FastAPI Application Entry
│   └── requirements.txt            # Python Dependencies
│
├── frontend/                       # Modern Automotive HUD Dashboard (React + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Zyncoo AI Branding, Trip Timer & Status Badge
│   │   │   ├── VideoFeed.jsx       # Camera Stream + Facial Mesh Overlay
│   │   │   ├── RiskMeter.jsx       # Drowsiness Threat Gauge (0-100%) & Timer Bar
│   │   │   ├── TelemetryCards.jsx  # EAR, Blink, Yawn & Head Pose Cards
│   │   │   ├── GazeIndicator.jsx   # Iris Gaze & Phone Distraction Warning Card
│   │   │   ├── SpeedControl.jsx    # OBD-II Speedometer & IR Night Vision Toggle
│   │   │   ├── EmergencyPanel.jsx  # Hazard Lights, Seat Haptic & GPS Fleet SOS
│   │   │   ├── EarChart.jsx        # Real-time EAR Oscilloscope Waveform
│   │   │   ├── AlarmBuzzer.jsx     # Speaker Siren Controller & Volume Slider
│   │   │   ├── SettingsPanel.jsx   # Calibration & Sensitivity Sliders
│   │   │   └── EventLog.jsx        # Real-time Incident Audit Log
│   │   ├── services/
│   │   │   ├── audioBuzzer.js      # Web Audio API Siren Synthesizer
│   │   │   ├── voiceAlert.js       # Bengali & English Speech Voice Engine
│   │   │   └── websocket.js        # Auto-reconnecting Telemetry WebSocket
│   │   ├── App.jsx                 # Dashboard State & Layout Orchestrator
│   │   └── index.css               # Obsidian Glassmorphic HUD Theme
│   └── package.json
│
├── run_backend.bat                 # Backend চালুর শর্টকাট
├── run_frontend.bat                # Frontend চালুর শর্টকাট
└── start_all.bat                   # এক ক্লিকে সম্পূর্ণ সিস্টেম চালুর স্ক্রিপ্ট
```

---

## ⚡ বিশেষ ফিচারসমূহ

1. **মাল্টি-মেট্রিক ডিটেকশন:**
   - **Eye Aspect Ratio (EAR):** চোখের সূক্ষ্ম ওঠানামা মেপে চোখ বন্ধ থাকলে কাউন্টডাউন শুরু হয়।
   - **Sleep Timer (3-4s Alert):** চোখ একটানা বন্ধ থাকলে তৎক্ষণাৎ ডুয়াল-টোন সাইরেন বেজে ওঠে।
   - **Mouth Aspect Ratio (MAR):** ড্রাইভার বারবার হাই তুললে তা ক্লান্তি হিসেবে শনাক্ত করে।
   - **Head Pose Estimation:** ড্রাইভারের মাথা সামনের দিকে ঝুঁকে পড়লে (মাইক্রো-স্লিপ) ওয়ার্নিং দেয়।
   - **Gaze & Phone Tracking:** সামনের রাস্তায় না তাকিয়ে মোবাইল ফোনের দিকে তাকিয়ে থাকলে ডিটেক্ট করে।
2. **স্মার্ট বাংলা ও ইংরেজি ভয়েস অ্যালার্ট:**
   - সাইরেনের পাশাপাশি স্পষ্ট বাংলা কণ্ঠে স্বয়ংক্রিয়ভাবে সতর্ক করে।
3. **ওবিডি-২ স্পিড অ্যাডাপ্টেশন (Dynamic Safety Window):**
   - হাইওয়েতে উচ্চগতিতে চলার সময় সিস্টেম স্বয়ংক্রিয়ভাবে স্লিপ অ্যালার্ট থ্রেশহোল্ড কমিয়ে ১.৮ সেকেন্ডে নামিয়ে আনে।
4. **স্বয়ংক্রিয় হ্যাজার্ড লাইট ও হ্যাপটিক সিট ভাইব্রেশন:**
   - জরুরি পরিস্থিতিতে পেছনের গাড়িগুলোকে সতর্ক করতে স্বয়ংক্রিয়ভাবে হ্যাজার্ড লাইট অন করে।
5. **নাইট ভিশন (IR Filter):**
   - রাতের অন্ধকারে কেবিনের কম আলোতেও নিখুঁত ডিটেকশন।
