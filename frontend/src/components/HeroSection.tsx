"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Bot, 
  MessageSquare,
  ShoppingBag,
  Zap,
  Globe2,
  CheckCircle,
  Truck,
  ShieldAlert,
  X,
  CheckCircle2,
  Volume2,
  ShieldCheck,
  Clock
} from "lucide-react";
import InteractiveChatSimulator from "./InteractiveChatSimulator";
import ZyncooLogo from "./ZyncooLogo";
import { playOrderChime } from "@/lib/sound";

export default function HeroSection() {
  // 60s Demo Walkthrough Modal State
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [demoAutoPlaying, setDemoAutoPlaying] = useState(false);

  // Rotating animated values
  const rotatingWords = [
    "verified orders.",
    "WhatsApp sales.",
    "24/7 revenue.",
    "courier dispatches.",
    "customer delight.",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setFadeState("in");
      }, 300);
    }, 2800);

    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  // Animated Live Neural Pipeline
  const liveEvents = [
    {
      channel: "WhatsApp Cloud",
      channelColor: "bg-emerald-500",
      query: "bhaiya black smart watch stock e ache? Dhanmondi te kal delivery pabo?",
      action: "Matched: Ultra Watch 9 • In Stock: 45 units",
      result: "Order Confirmed & Sent to Steadfast Courier",
      badge: "ORDER #ORD-8419",
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      channel: "Messenger",
      channelColor: "bg-blue-500",
      query: "How much is delivery to Sylhet? Can I pay cash on delivery?",
      action: "Calculated Nationwide COD: ৳120 • 2-3 Days SLA",
      result: "Customer Qualified • 0% Drop Rate",
      badge: "INTENT QUALIFIED",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      channel: "Instagram DM",
      channelColor: "bg-pink-500",
      query: "Ami 1ta earphone order korte chai. Phone: 01711-987654.",
      action: "Extracted: Tanvir H. • Phone: 01711987654 (Valid 11 Digits)",
      result: "Courier Tracking ID Generated: STDFST7821",
      badge: "DISPATCHED ✓",
      badgeColor: "bg-teal-100 text-teal-800",
    },
  ];

  const [currentEventIdx, setCurrentEventIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventIdx((prev) => (prev + 1) % liveEvents.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [liveEvents.length]);

  const activeLiveEvent = liveEvents[currentEventIdx];

  return (
    <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-24 overflow-hidden bg-white">
      
      {/* Dynamic Ambient Background Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-300/30 via-teal-200/20 to-transparent rounded-full blur-[100px] -z-10 animate-glow-pulse pointer-events-none" />
      <div className="absolute inset-0 bg-radial-grid opacity-75 -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Animated Badge Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-300/70 text-slate-800 text-xs font-semibold shadow-xs hover:border-emerald-400 transition-all cursor-pointer group mb-6">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-600 font-medium">zyncoo.ai 2.4</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-bold group-hover:text-emerald-800 flex items-center gap-1">
            Autonomous Conversational Sales Engine
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        {/* Refined, Balanced H1 with Rotating Word */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] max-w-3xl mx-auto">
          The AI sales agent that turns inbound DMs into{" "}
          <span
            className={`inline-block text-emerald-600 font-black transition-all duration-300 ${
              fadeState === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {rotatingWords[wordIndex]}
          </span>
        </h1>

        {/* Minimal Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          Deploy 24/7 autonomous agents on WhatsApp, Facebook & Instagram. 
          Fluent in English, Bengali & Banglish—taking orders and syncing couriers while you sleep.
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 hover:-translate-y-0.5 transition-all"
          >
            <span>Start 7-Day Free Pilot</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              setDemoModalOpen(true);
              setDemoStep(1);
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 shadow-2xs transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Watch 60s Flow Demo</span>
          </button>

          <a
            href="#interactive-demo"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-2xs transition-all"
          >
            <span>Test Simulator</span>
          </a>
        </div>

        {/* Creative Animated Floating Dialogue Capsule */}
        <div className="mt-10 max-w-lg mx-auto animate-float-slow">
          <div className="glass-capsule rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 hover:border-emerald-400">
            
            {/* Top Bar inside capsule */}
            <div className="flex items-center justify-between border-b border-emerald-100/80 pb-2.5 mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeLiveEvent.channelColor} animate-pulse`}></span>
                <span className="font-bold text-slate-900">Zyncoo Live Stream</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {activeLiveEvent.channel}
                </span>
              </div>
              
              {/* Equalizer Waveform */}
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-mono">
                <span className="text-[10px] text-slate-400">1.4s Velocity</span>
                <div className="flex items-end gap-0.5 h-3 ml-1.5">
                  <span className="w-0.5 bg-emerald-500 h-2 animate-pulse"></span>
                  <span className="w-0.5 bg-emerald-500 h-3 animate-pulse [animation-delay:0.15s]"></span>
                  <span className="w-0.5 bg-emerald-500 h-1.5 animate-pulse [animation-delay:0.3s]"></span>
                  <span className="w-0.5 bg-emerald-500 h-2.5 animate-pulse [animation-delay:0.45s]"></span>
                </div>
              </div>
            </div>

            {/* Inbound Customer Bubble */}
            <div className="space-y-2 text-xs">
              <div className="bg-slate-100/90 rounded-xl p-2.5 text-slate-800 border border-slate-200/60 max-w-[92%]">
                <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase tracking-wider">
                  Customer
                </span>
                <p className="font-normal italic leading-snug">
                  &quot;{activeLiveEvent.query}&quot;
                </p>
              </div>

              {/* Zyncoo Autonomous Action */}
              <div className="bg-emerald-50/90 rounded-xl p-2.5 text-emerald-950 border border-emerald-200/70 ml-auto max-w-[94%] shadow-2xs">
                <div className="flex items-center justify-between text-[10px] font-bold text-emerald-700 mb-0.5">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Zyncoo Reasoning & Stock Match
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${activeLiveEvent.badgeColor}`}>
                    {activeLiveEvent.badge}
                  </span>
                </div>
                <p className="font-medium leading-snug">
                  {activeLiveEvent.result}
                </p>
              </div>
            </div>

            {/* Bottom Status Ticker */}
            <div className="mt-3 pt-2.5 border-t border-emerald-100/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                <span>Steadfast & RedX Courier API Synced</span>
              </span>
              <span className="font-mono text-emerald-700 font-bold">
                100% Autonomous
              </span>
            </div>

          </div>
        </div>

        {/* Minimal Channel Integration Logos */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Meta Official WhatsApp Cloud API</span>
          </div>
          <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Facebook Page Messenger</span>
          </div>
          <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
            <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            <span>Instagram Direct Message</span>
          </div>
          <div className="flex items-center gap-2 hover:text-slate-700 transition-colors">
            <span className="w-2 h-2 rounded-full bg-slate-600"></span>
            <span>Steadfast & Pathao Courier</span>
          </div>
        </div>

        {/* Interactive Comparison Component: Old Manual Way vs. Zyncoo AI */}
        <div className="mt-16 sm:mt-24 text-left">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Why Brands Switch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Human Support Staff vs. Zyncoo Autonomous AI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            
            {/* The Old Manual Way */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="font-bold text-sm text-slate-800">The Traditional Manual Way</h3>
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                  High Churn & Cost
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>15 to 45 mins reply delay:</strong> Customers leave your Facebook page and buy from a faster competitor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>12 AM to 8 AM dark hours:</strong> Zero orders captured while your staff is asleep.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>Manual typo mistakes:</strong> Wrong delivery addresses copied into courier notes leading to returned parcels.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✕</span>
                  <span><strong>High fixed salaries:</strong> ৳15,000 - ৳25,000 / month per support agent.</span>
                </li>
              </ul>
            </div>

            {/* The Zyncoo AI Way */}
            <div className="bg-emerald-50/70 p-6 rounded-2xl border-2 border-emerald-500 shadow-lg shadow-emerald-600/10 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
                <div className="flex items-center gap-2">
                  <ZyncooLogo className="w-5 h-5" />
                  <h3 className="font-bold text-sm text-slate-900">The Zyncoo AI Way</h3>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                  100% Automated
                </span>
              </div>
              <ul className="space-y-3 text-xs text-slate-800 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Sub-2s instant reply:</strong> Engages buyers the exact moment they show high purchase intent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>24/7/365 cloud availability:</strong> Captures orders at 3 AM with zero PC or laptop needed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>11-digit phone & address sanitizer:</strong> Automatically checks postal codes and books Steadfast Courier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Predictable flat subscription:</strong> Starts at just ৳2,490 / month with unlimited scale.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Live Interactive Simulator Spotlight */}
        <div id="interactive-demo" className="mt-16 sm:mt-24 pt-4">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Full Test Simulator
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              Try Sending a Message Directly to Zyncoo AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Type or select a question below to see how customer details are parsed and recorded.
            </p>
          </div>
          
          <InteractiveChatSimulator />
        </div>

      </div>

      {/* 60s Demo Walkthrough Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <ZyncooLogo className="w-8 h-8" />
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    60-Second Autonomous Order Cycle
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      02:14 AM Midnight Scenario
                    </span>
                    <span>•</span>
                    <span>No human intervention</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setDemoModalOpen(false);
                  setDemoAutoPlaying(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setDemoStep(s);
                    if (s === 5) playOrderChime();
                  }}
                  className={`py-2 px-1 text-center rounded-xl transition-all cursor-pointer ${
                    demoStep === s
                      ? "bg-emerald-600 text-white font-bold shadow-xs"
                      : demoStep > s
                      ? "bg-emerald-100 text-emerald-800 font-semibold"
                      : "bg-slate-100 text-slate-500 font-normal hover:bg-slate-200"
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider">Step {s}</div>
                  <div className="text-[11px] font-bold truncate">
                    {s === 1 && "Inquiry"}
                    {s === 2 && "Catalog"}
                    {s === 3 && "Fraud Shield"}
                    {s === 4 && "Courier API"}
                    {s === 5 && "Cha-ching!"}
                  </div>
                </button>
              ))}
            </div>

            {/* Step Body */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 min-h-[220px] flex flex-col justify-between">
              {demoStep === 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      1. Inbound Midnight Inquiry via WhatsApp Cloud
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">02:14:02 AM</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Customer (WhatsApp)</div>
                    <p className="text-xs sm:text-sm text-slate-800 italic">
                      &quot;bhaiya black smart watch ta kal delivery kobe pabo? Dhanmondi te order korbo.&quot;
                    </p>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Zyncoo AI receives webhook within <strong>180ms</strong>. No human staff is awake.</span>
                  </div>
                </div>
              )}

              {demoStep === 2 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      2. Semantic Reasoning & Server-Authoritative Catalog Match
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">02:14:04 AM</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-slate-900">Ultra Watch 9 (Black Edition)</div>
                      <div className="font-mono font-bold text-emerald-700 text-xs">৳1,550 (Fixed)</div>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Warehouse Stock: 45 units available • Delivery SLA: Next-day evening in Dhaka (৳60 COD).
                    </div>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                    <span className="font-bold block mb-0.5">Zyncoo Autonomous AI Reply (Sent in 1.4s):</span>
                    &quot;Assalamu Alaikum! Ji Ultra Watch 9 Black stock e ache. Dhanmondi te kal sondhar moddhei delivery paben (charge ৳60). Apnar name, phone number o full address ta bolben please?&quot;
                  </div>
                </div>
              )}

              {demoStep === 3 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      3. RTO Fraud Shield Cross-Courier Verification
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">02:14:48 AM</span>
                  </div>
                  <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-slate-900">Phone: 01711-987654 (Tanvir Hasan)</span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                        🟢 96% LOW RTO RISK
                      </span>
                    </div>
                    <p className="text-xs text-slate-700">
                      Cross-referenced across Steadfast & Pathao databases: 11 delivered out of 12 orders. 
                      Verified safe for <strong>100% Cash on Delivery (COD)</strong> without advance fee.
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    * If buyer had chronic return history (&gt;50% RTO), Zyncoo would automatically dispatch a ৳100 advance delivery payment link.
                  </div>
                </div>
              )}

              {demoStep === 4 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      4. Steadfast Courier API Direct Consignment
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">02:15:05 AM</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1.5 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Consignment ID:</span>
                      <span className="font-bold text-slate-900">#STDFST-8812</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Recipient:</span>
                      <span>Tanvir Hasan (01711-987654)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>COD Collection:</span>
                      <span className="font-bold text-emerald-700">৳1,610 (Item + Delivery)</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span>Pickup Scheduled:</span>
                      <span className="text-emerald-700 font-semibold">Morning 10:00 AM Hub Run</span>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Courier label created automatically in background!</span>
                  </div>
                </div>
              )}

              {demoStep === 5 && (
                <div className="space-y-3 text-center py-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto animate-bounce">
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">Cha-ching! 🔔 Order Verified & Recorded</h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                      Order <strong>#ORD-9821</strong> is live in your Client Dashboard. 
                      Customer received a confirmation card with courier tracking. You just earned <strong>৳1,550</strong> while fast asleep!
                    </p>
                  </div>
                  <button
                    onClick={() => playOrderChime()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Re-play Cash Register Chime</span>
                  </button>
                </div>
              )}

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 mt-4">
                <button
                  onClick={() => setDemoStep((prev) => Math.max(1, prev - 1))}
                  disabled={demoStep === 1}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 disabled:opacity-40 border border-slate-200 cursor-pointer"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (demoStep === 5) {
                        setDemoStep(1);
                      } else {
                        const next = demoStep + 1;
                        setDemoStep(next);
                        if (next === 5) playOrderChime();
                      }
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{demoStep === 5 ? "Restart Demo" : "Next Step"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
