"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ZyncooLogo from "@/components/ZyncooLogo";
import {
  ShieldAlert,
  Eye,
  Volume2,
  VolumeX,
  Gauge,
  Moon,
  Smartphone,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Play,
  Square,
  ArrowRight,
  Download,
  Key,
  Car,
  Sparkles,
  Phone,
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  Send,
  Zap,
  Activity
} from "lucide-react";

export default function SentinelProductPage() {
  // Demo State
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [simulatedSleep, setSimulatedSleep] = useState(false);
  const [countdown, setCountdown] = useState(3.0);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [voiceSpoken, setVoiceSpoken] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [speedKmh, setSpeedKmh] = useState(65);
  const [earValue, setEarValue] = useState(0.31);
  const [audioSupported, setAudioSupported] = useState(true);

  // Purchase Modal State
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "fleet_pro" | "enterprise">("starter");
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "cod">("bkash");
  const [trxId, setTrxId] = useState("");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Web Audio Siren Synthesizer
  const startSiren = () => {
    if (audioMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (oscRef.current) return;

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.35, audioCtxRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsAlarmPlaying(true);
    } catch (e) {
      console.warn("Audio Context init blocked:", e);
      setAudioSupported(false);
    }
  };

  const stopSiren = () => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      setIsAlarmPlaying(false);
    } catch (e) {}
  };

  // Bengali Voice Alert
  const triggerVoiceAlert = () => {
    if (audioMuted || voiceSpoken) return;
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("ড্রাইভার ভাই, গাড়ি সাবধানে চালান! চোখ খুলুন!");
      utterance.lang = "bn-BD";
      utterance.rate = 1.05;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
      setVoiceSpoken(true);
    }
  };

  // Sleep Simulation Countdown Loop
  useEffect(() => {
    let timer: any;
    if (simulatedSleep) {
      setEarValue(0.12);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 0.2) {
            startSiren();
            triggerVoiceAlert();
            return 0;
          }
          return parseFloat((prev - 0.2).toFixed(1));
        });
      }, 200);
    } else {
      setEarValue(0.32);
      setCountdown(speedKmh >= 80 ? 1.8 : 3.0);
      stopSiren();
      setVoiceSpoken(false);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
    return () => clearInterval(timer);
  }, [simulatedSleep, speedKmh]);

  // Camera toggle
  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        alert("ক্যামেরা এক্সেস পাওয়া যায়নি। আপনি ক্যামেরা ছাড়া সিমুলেশন বাটন ব্যবহার করতে পারেন।");
      }
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/sentinel/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone: customerPhone,
          vehicleModel,
          packageId: selectedPlan,
          deliveryAddress,
          paymentMethod,
          trxId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderSuccess(data.order);
      } else {
        alert("অর্ডার তৈরিতে সমস্যা হয়েছে: " + (data.error || "আবার চেষ্টা করুন"));
      }
    } catch (err) {
      alert("সার্ভার ত্রুটি। অনুগ্রহ করে সরাসরি ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const plans = [
    {
      id: "starter" as const,
      name: "Personal Driver Starter Kit",
      tagline: "ব্যক্তিগত প্রাইভেট কার, জীপ ও সিঙ্গেল রাইডারদের জন্য",
      price: "৳৪,৪৯০",
      originalPrice: "৳৬,৫০০",
      billing: "এককালীন লাইসেন্স (Lifetime Software + Siren)",
      badge: "জনপ্রিয় ব্যক্তিগত",
      features: [
        "১টি গাড়ির জন্য পার্মানেন্ট ফুল-ফিচারড লাইসেন্স",
        "রিয়েল-টাইম 468-Point ফেস ও আই-মেশ স্ক্যানার",
        "৩-৪ সেকেন্ড চোখ বন্ধে ৯০dB লাউড ডুয়াল-টোন সাইরেন",
        "বাংলা ও ইংরেজি অটোমেটিক ভয়েস অ্যালার্ট",
        "ইনফ্রারেড (IR) লো-লাইট নাইট ভিশন অ্যালগরিদম",
        "উইন্ডোজ/ল্যাপটপ বা মিনি ইন-কার পিসি এক-ক্লিকে ইনস্টলার",
        "লাইফটাইম সফটওয়্যার ফ্রি আপডেট ও হোয়াটসঅ্যাপ সাপোর্ট",
      ],
    },
    {
      id: "fleet_pro" as const,
      name: "Fleet & Transport Pro",
      tagline: "বাস, দূরপাল্লার ট্রাক, অ্যাম্বুলেন্স ও কুরিয়ার সার্ভিসের জন্য",
      price: "৳১২,৯৯০",
      originalPrice: "৳১৮,০০০",
      billing: "৫টি গাড়ির বান্ডেল প্যাক (OBD-II রেডি)",
      badge: "মোস্ট ভ্যালু ফ্লিট",
      popular: true,
      features: [
        "একসাথে ৫টি গাড়ির জন্য মাল্টি-ডিভাইস লাইসেন্স কি",
        "OBD-II হাইওয়ে স্পিড সিঙ্ক (গতি বাড়লে ১.৮ সেকেন্ডেই অ্যালার্ট)",
        "স্মার্টফোন ডিসট্রাকশন ও গেজ ডিটেকশন (অন্যমনস্ক রোধ)",
        "বারবার হাই তোলা (MAR) ক্লান্তি ডিটেকশন সতর্কবার্তা",
        "সেন্ট্রাল ক্লাউড ড্যাশবোর্ড ও ফ্লিট টেলিমেট্রি স্ট্রিম",
        "জরুরি সিচুয়েশনে স্বয়ংক্রিয় হ্যাজার্ড লাইট অ্যাক্টিভেশন",
        "২৪/৭ প্রায়োরিটি হার্ডওয়্যার সেটআপ অ্যাসিস্ট্যান্স",
      ],
    },
    {
      id: "enterprise" as const,
      name: "Enterprise Transport Network",
      tagline: "বড় ট্রান্সপোর্ট এজেন্সি (Hanif, Shohagh, Pathao, Uber) এর জন্য",
      price: "৳২৯,৯৯০",
      originalPrice: "৳৪০,০০০",
      billing: "২০টি গাড়ির জন্য কমপ্লিট এন্টারপ্রাইজ ফ্লিট সলিউশন",
      badge: "কর্পোরেট এন্টারপ্রাইজ",
      features: [
        "২০টি গাড়ির আনলিমিটেড লাইসেন্স ও ডেডিকেটেড নোড",
        "রিয়েল-টাইম জিপিএস লোকেশন ও সেন্ট্রাল SOS ডিসপ্যাচ",
        "লাইভ ভিডিও স্ট্রিম মনিটরিং কনসোল (সুপার অ্যাডমিন)",
        "ড্রাইভার বিহেভিয়ার ও রিস্ক স্কোরিং অডিট রিপোর্ট",
        "কাস্টম ব্র্যান্ডিং ও এজেন্সির নিজস্ব ডোমেইনে হোস্টিং",
        "ডেডিকেটেড টেকনিক্যাল ইঞ্জিনিয়ার ও অন-সাইট ইনস্টলেশন",
        "এসএলএ ৯৯.৯% আপটাইম ও টেলিফোনিক হটলাইন সাপোর্ট",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-500/20 py-2 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#b8e900] animate-pulse"></span>
          <span className="font-semibold text-white">
            🚗 ZYNCOO DRIVER SENTINEL IoT:
          </span>
          <span className="text-slate-300">
            বাংলাদেশে প্রথম এআই চালিত চালক তন্দ্রা শনাক্তকরণ ও সড়ক দুর্ঘটনা প্রতিরোধক ব্যবস্থা
          </span>
          <Link href="#pricing" className="text-[#b8e900] font-bold underline ml-2 hover:text-white">
            প্যাকেজ দেখুন →
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <ZyncooLogo className="w-9 h-9 rounded-lg" />
            <div>
              <div className="font-extrabold text-lg text-white tracking-wide flex items-center gap-1.5">
                <span>zyncoo</span>
                <span className="text-[#b8e900]">.ai</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#b8e900]/15 text-[#b8e900] border border-[#b8e900]/30 rounded font-bold uppercase">
                  SENTINEL
                </span>
              </div>
              <div className="text-[9px] text-slate-400 font-mono">
                Driver Safety & Drowsiness Defense
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              ← Back to Main Website
            </Link>
            <Link
              href="/dashboard"
              className="text-xs text-slate-300 hover:text-white bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                setSelectedPlan("starter");
                setIsBuyModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#b8e900] hover:bg-[#a6d200] shadow-md shadow-[#b8e900]/20 transition-all flex items-center gap-1.5"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Buy License</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>AI Automotive Safety Sentinel</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            ড্রাইভার ঘুমিয়ে পড়লে বা ৩ সেকেন্ড চোখ বন্ধ রাখলেই বাজবে{" "}
            <span className="text-[#b8e900]">তীব্র এআই সাইরেন!</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            রাতে বা দূরপাল্লার ড্রাইভিংয়ে চোখের পলকে ঘটে যেতে পারে প্রাণঘাতী দুর্ঘটনা। Zyncoo Driver Sentinel রিয়েল-টাইমে চালকের চোখ, মুখ ও দৃষ্টি স্ক্যান করে মাইক্রো-স্লিপের মুহূর্তে উচ্চ শব্দে অ্যালার্ট দিয়ে প্রাণ বাঁচায়।
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#interactive-demo"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-[#b8e900] hover:bg-[#a6d200] shadow-lg shadow-[#b8e900]/25 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>লাইভ ব্রাউজার ডেমো টেস্ট করুন</span>
            </a>

            <a
              href="#pricing"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>প্যাকেজ ও মূল্য তালিকা</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs text-left">
              <div className="text-2xl font-black text-white">468 Pts</div>
              <div className="text-xs text-slate-400 mt-1">3D ফেসিয়াল ল্যান্ডমার্কস</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs text-left">
              <div className="text-2xl font-black text-[#b8e900]">1.8s - 3s</div>
              <div className="text-xs text-slate-400 mt-1">ডাইনামিক স্লিপ রেসপন্স</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs text-left">
              <div className="text-2xl font-black text-emerald-400">90 dB+</div>
              <div className="text-xs text-slate-400 mt-1">ডুয়াল-টোন ও বাংলা ভয়েস</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs text-left">
              <div className="text-2xl font-black text-cyan-400">100% Offline</div>
              <div className="text-xs text-slate-400 mt-1">ইন্টারনেট ছাড়াও সক্রিয়</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator / Camera Demo Section */}
      <section id="interactive-demo" className="py-16 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#b8e900] text-xs font-mono font-bold tracking-wider uppercase">
              // INTERACTIVE TEST DRIVE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              সরাসরি ব্রাউজারে সিস্টেমের কার্যকারিতা পরীক্ষা করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              আপনার ওয়েবক্যাম অন করুন অথবা নিচের "চোখ বন্ধের সিমুলেশন" বাটনে চাপ দিয়ে দেখুন কীভাবে সিস্টেম অ্যালার্ট সক্রিয় করে।
            </p>
          </div>

          {/* Interactive HUD Console */}
          <div className="rounded-3xl bg-slate-900 border border-slate-700/80 p-5 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Bar of Console */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${isAlarmPlaying ? "bg-red-500 animate-ping" : "bg-emerald-400"}`}></span>
                <span className="font-mono text-xs font-bold tracking-wider uppercase text-slate-200">
                  STATUS: {isAlarmPlaying ? "CRITICAL: SLEEP ALARM ACTIVE!" : simulatedSleep ? "EYES CLOSED DETECTED" : "DRIVER AWAKE & MONITORING"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAudioMuted(!audioMuted)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  {audioMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{audioMuted ? "Sound Unmute" : "Sound Mute"}</span>
                </button>

                <button
                  onClick={toggleCamera}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    cameraActive
                      ? "bg-red-500/20 text-red-300 border-red-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{cameraActive ? "Stop Camera" : "Start Webcam"}</span>
                </button>
              </div>
            </div>

            {/* Main Stage Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              
              {/* Left Stage: Video / HUD Feed */}
              <div className="lg:col-span-7 flex flex-col">
                <div className={`relative rounded-2xl bg-black border-2 overflow-hidden aspect-video flex items-center justify-center transition-all ${
                  isAlarmPlaying ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]" : "border-slate-800"
                }`}>
                  {/* Real video if camera active */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${cameraActive ? "block" : "hidden"}`}
                  />

                  {/* Fallback Graphic HUD when camera not on */}
                  {!cameraActive && (
                    <div className="text-center p-6">
                      <div className="relative inline-block mb-3">
                        <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all ${
                          isAlarmPlaying ? "border-red-500 bg-red-500/10 animate-pulse" : "border-emerald-500/40 bg-slate-900"
                        }`}>
                          <Car className={`w-10 h-10 ${isAlarmPlaying ? "text-red-400" : "text-emerald-400"}`} />
                        </div>
                      </div>
                      <div className="text-sm font-bold text-white">
                        {cameraActive ? "Live Face Mesh Feed" : "Virtual Driver HUD Simulator"}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        ক্যামেরা চালু করুন অথবা ডানের কন্ট্রোল দিয়ে তন্দ্রা পরীক্ষা করুন
                      </div>
                    </div>
                  )}

                  {/* Red Alert Overlay */}
                  {isAlarmPlaying && (
                    <div className="absolute inset-0 bg-red-600/30 backdrop-blur-2xs flex flex-col items-center justify-center text-center p-4 animate-pulse">
                      <AlertTriangle className="w-16 h-16 text-yellow-300 mb-2 drop-shadow" />
                      <div className="text-2xl font-black text-white tracking-widest drop-shadow-md">
                        🚨 SLEEP ALARM TRIGGERED! 🚨
                      </div>
                      <div className="text-sm font-bold text-yellow-200 mt-1">
                        "ড্রাইভার ভাই, গাড়ি সাবধানে চালান! চোখ খুলুন!"
                      </div>
                    </div>
                  )}

                  {/* HUD Corner Overlays */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 border border-white/10 font-mono text-[10px] text-emerald-400">
                    EAR: {earValue.toFixed(2)} | THRESHOLD: 0.20
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 border border-white/10 font-mono text-[10px] text-cyan-400">
                    SPEED: {speedKmh} KM/H
                  </div>
                </div>

                {/* Simulation Control Buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onMouseDown={() => setSimulatedSleep(true)}
                    onMouseUp={() => setSimulatedSleep(false)}
                    onTouchStart={() => setSimulatedSleep(true)}
                    onTouchEnd={() => setSimulatedSleep(false)}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      simulatedSleep
                        ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-98"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700"
                    }`}
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>{simulatedSleep ? "চোখ বন্ধ অবস্থায় আছে (ছেড়ে দিলে চোখ খুলবে)" : "চেপে ধরে রাখুন: চোখ বন্ধ (Simulate Sleep)"}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (isAlarmPlaying) {
                        stopSiren();
                      } else {
                        startSiren();
                        triggerVoiceAlert();
                      }
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>{isAlarmPlaying ? "Stop Sound" : "Test Siren & Voice"}</span>
                  </button>
                </div>
              </div>

              {/* Right Stage: Live Telemetry Cards */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                
                {/* Risk Gauge Card */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Drowsiness Risk Threat Level</span>
                    <span className="font-mono font-bold text-white">
                      {isAlarmPlaying ? "100%" : simulatedSleep ? `${Math.round(((3 - countdown) / 3) * 100)}%` : "0%"}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full mt-2 overflow-hidden border border-slate-700">
                    <div
                      className={`h-full transition-all duration-200 ${
                        isAlarmPlaying ? "bg-red-500 w-full" : simulatedSleep ? "bg-amber-400" : "bg-emerald-400 w-1"
                      }`}
                      style={{
                        width: isAlarmPlaying ? "100%" : simulatedSleep ? `${((3 - countdown) / 3) * 100}%` : "4%",
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
                    <span>Countdown to Siren:</span>
                    <span className={`font-bold ${countdown < 1 ? "text-red-400" : "text-[#b8e900]"}`}>
                      {countdown.toFixed(1)} seconds
                    </span>
                  </div>
                </div>

                {/* OBD-II Speedometer Slider */}
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                      <Gauge className="w-4 h-4 text-cyan-400" />
                      <span>OBD-II Vehicle Speed Simulation</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {speedKmh} km/h
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="140"
                    value={speedKmh}
                    onChange={(e) => setSpeedKmh(Number(e.target.value))}
                    className="w-full mt-3 accent-cyan-400 cursor-pointer"
                  />
                  <div className="text-[11px] text-slate-400 mt-1 flex justify-between">
                    <span>0 km/h (City: 3.0s window)</span>
                    <span className="text-[#b8e900]">80+ km/h (Highway: 1.8s window)</span>
                  </div>
                </div>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">IR Night Vision</div>
                      <div className="text-[10px] text-slate-400">অন্ধকারেও পারফেক্ট</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">Phone Distraction</div>
                      <div className="text-[10px] text-slate-400">মোবাইল দেখলে অ্যালার্ট</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">Fleet Cloud SOS</div>
                      <div className="text-[10px] text-slate-400">সেন্ট্রাল জিপিএস রিপোর্ট</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#b8e900] shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-200">Hazard Auto-Blink</div>
                      <div className="text-[10px] text-slate-400">ইমার্জেন্সি লাইট অন</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Pricing & Packages Section */}
      <section id="pricing" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b8e900]/10 border border-[#b8e900]/30 text-[#b8e900] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMERCIAL PACKAGES & LICENSING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              আপনার গাড়ি বা ট্রান্সপোর্ট ফ্লিটের জন্য প্যাকেজ বেছে নিন
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              লাইফটাইম ক্লায়েন্ট সফটওয়্যার লাইসেন্স, ফ্রি আপডেট ও সম্পূর্ণ সেটআপ গাইড অন্তর্ভুক্ত।
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? "bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/10 md:-translate-y-2"
                    : "bg-slate-900/80 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-[#b8e900] text-slate-950 text-xs font-black px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    {!plan.popular && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 min-h-8">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500 line-through">
                      {plan.originalPrice}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-1">
                    {plan.billing}
                  </div>

                  <div className="my-6 border-t border-slate-800" />

                  {/* Feature Checklist */}
                  <ul className="space-y-3 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#b8e900] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setIsBuyModalOpen(true);
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-[#b8e900] hover:bg-[#a6d200] text-slate-950 shadow-lg shadow-[#b8e900]/20"
                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    <span>এখনই অর্ডার করুন (Buy Now)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Help Strip */}
          <div className="mt-14 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#b8e900]/10 border border-[#b8e900]/20 text-[#b8e900]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  ফ্লিট বা কাস্টম হার্ডওয়্যার ইন্টিগ্রেশন প্রয়োজন?
                </div>
                <div className="text-xs text-slate-400">
                  আমাদের টেকনিক্যাল সাপোর্ট টিম সরাসরি আপনার গাড়িতে ক্যামেরা ও ওবিডি-২ সেটআপে সাহায্য করবে।
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/8801711223344?text=Hello%20Zyncoo,%20I%20want%20to%20learn%20more%20about%20Driver%20Sentinel%20Safety%20System."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shrink-0"
            >
              WhatsApp কনসাল্টেশন →
            </a>
          </div>

        </div>
      </section>

      {/* Checkout Modal */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => {
                setIsBuyModalOpen(false);
                setOrderSuccess(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {!orderSuccess ? (
              <>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-xl bg-[#b8e900]/15 text-[#b8e900] border border-[#b8e900]/30">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      অর্ডার কনফার্মেশন — Zyncoo Driver Sentinel
                    </h3>
                    <p className="text-xs text-slate-400">
                      প্যাকেজ: {plans.find((p) => p.id === selectedPlan)?.name} ({plans.find((p) => p.id === selectedPlan)?.price})
                    </p>
                  </div>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      আপনার নাম / প্রতিষ্ঠানের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. তানভীর হাসান / গ্রিন লাইন পরিবহন"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        মোবাইল নাম্বার *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="017xxxxxxxx"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        গাড়ি / ফ্লিট মডেল
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Toyota Allion / Hino 1J Bus"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ডেলিভারি / সেটআপ ঠিকানা
                    </label>
                    <textarea
                      rows={2}
                      placeholder="হার্ডওয়্যার কিট ও ইনস্টলেশন ড্রাইভ কুরিয়ারের জন্য সম্পূর্ণ ঠিকানা দিন"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-slate-300 font-semibold mb-2">
                      পেমেন্ট পদ্ধতি নির্বাচন করুন
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bkash")}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          paymentMethod === "bkash"
                            ? "bg-pink-600/20 border-pink-500 text-pink-300 font-bold"
                            : "bg-slate-800 border-slate-700 text-slate-400"
                        }`}
                      >
                        bKash
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("nagad")}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          paymentMethod === "nagad"
                            ? "bg-amber-600/20 border-amber-500 text-amber-300 font-bold"
                            : "bg-slate-800 border-slate-700 text-slate-400"
                        }`}
                      >
                        Nagad
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          paymentMethod === "cod"
                            ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold"
                            : "bg-slate-800 border-slate-700 text-slate-400"
                        }`}
                      >
                        Cash on Delivery
                      </button>
                    </div>
                  </div>

                  {paymentMethod !== "cod" && (
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
                      <div>
                        মার্চেন্ট নাম্বার: <strong className="text-white font-mono">01711223344</strong> (Send Money / Make Payment)
                      </div>
                      <div className="mt-2">
                        <label className="block text-slate-400 font-semibold mb-1">
                          TrxID (ট্রানজেকশন আইডি দিন):
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. BK99120485"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-[#b8e900] hover:bg-[#a6d200] text-slate-950 shadow-lg shadow-[#b8e900]/20 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    {isSubmitting ? (
                      <span>অর্ডার প্রসেস হচ্ছে...</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>অর্ডার সম্পন্ন করুন ({plans.find((p) => p.id === selectedPlan)?.price})</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success Card */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">
                  অভিনন্দন! আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  অর্ডার আইডি: <strong className="text-white font-mono">{orderSuccess.orderId}</strong>
                </p>

                {/* Generated License Key */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-800 border border-slate-700 text-left">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <Key className="w-3.5 h-3.5 text-[#b8e900]" />
                      <span>আপনার সফটওয়্যার লাইসেন্স কি:</span>
                    </span>
                    <span className="text-emerald-400 text-[10px] font-mono">ACTIVE</span>
                  </div>
                  <div className="text-base font-black font-mono text-[#b8e900] mt-1 select-all tracking-wider bg-slate-900 p-2 rounded-lg border border-slate-800">
                    {orderSuccess.licenseKey}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2">
                    প্যাকেজ: {orderSuccess.packageName}
                  </div>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://github.com/muntasiralamresti-official/AI-Automotion"
                    target="_blank"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#b8e900] hover:bg-[#a6d200] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>সফটওয়্যার প্যাকেজ ডাউনলোড (.zip)</span>
                  </a>

                  <Link
                    href="/dashboard"
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center transition-colors"
                  >
                    ড্যাশবোর্ডে যান →
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Zyncoo AI & Driver Sentinel Safety System. All rights reserved.</p>
          <div className="mt-2 flex items-center justify-center gap-4 text-slate-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>•</span>
            <Link href="/dashboard" className="hover:text-white">Client Portal</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
