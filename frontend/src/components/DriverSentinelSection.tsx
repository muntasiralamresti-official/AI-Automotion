"use client";

import Link from "next/link";
import {
  Car,
  Eye,
  ShieldAlert,
  Volume2,
  Gauge,
  Moon,
  Sparkles,
  ArrowRight,
  Radio,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export default function DriverSentinelSection() {
  return (
    <section id="driver-sentinel" className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#b8e900]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b8e900]/10 border border-[#b8e900]/25 text-[#b8e900] text-xs font-bold uppercase tracking-wider mb-4">
            <Car className="w-4 h-4" />
            <span>NEW IoT LAUNCH • সড়ক দুর্ঘটনা প্রতিরোধে এআই বিপ্লব</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Zyncoo Driver Sentinel™
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-[#b8e900] to-teal-300 mt-2">
              ড্রাইভারের তন্দ্রা শনাক্তকরণ ও লাইভ সেফটি সিস্টেম
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            গাড়ির চালক চোখ ৩ সেকেন্ড বন্ধ রাখলেই গাড়ির স্পিকারে স্বয়ংক্রিয়ভাবে বেজে উঠবে ৯০dB ডুয়াল-টোন সাইরেন ও বাংলা ভয়েস সতর্কবার্তা। দূরপাল্লার বাস, ট্রাক ও ব্যক্তিগত গাড়ির শতভাগ নিরাপত্তা।
          </p>
        </div>

        {/* Feature Grid with Interactive Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Cards: Core Tech Stack */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  468-Point 3D ফেস ও আই-মেশ স্ক্যানার
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  MediaPipe আল্ট্রা-ফাস্ট ভিশন এআই দিয়ে চালকের চোখের পাতা (EAR), হাই তোলা (MAR) এবং মাথা সামনের দিকে ঝুঁকে পড়া রিয়েল-টাইমে পরিমাপ করে।
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  ৯০dB লাউড সাইরেন ও স্পষ্ট বাংলা ভয়েস অ্যালার্ট
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  ড্রাইভারের তন্দ্রা আসামাত্র গাড়ির স্পিকারে বেজে ওঠে জরুরি অ্যালার্ম এবং স্বয়ংক্রিয়ভাবে সতর্ক করে: "ড্রাইভার ভাই, গাড়ি সাবধানে চালান! চোখ খুলুন!"
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shrink-0">
                <Gauge className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  OBD-II হাইওয়ে স্পিড ইন্টিগ্রেশন (Dynamic Timing)
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  গাড়ি যখন ৮০+ কিমি/ঘণ্টা গতিতে হাইওয়েতে চলে, তখন দুর্ঘটনা রোধে এআই রেসপন্স টাইম স্বয়ংক্রিয়ভাবে ৩ সেকেন্ড থেকে কমিয়ে ১.৮ সেকেন্ডে অ্যালার্ট বাজায়।
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 transition-all flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0">
                <Moon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  ইনফ্রারেড (IR) লো-লাইট নাইট ভিশন
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  গাড়ির কেবিনে সম্পূর্ণ অন্ধকার বা রাতের বেলাতেও অ্যাডাপটিভ কনট্রাস্ট ও ইনফ্রারেড ফিল্টারে চালকের চোখ শতভাগ নিখুঁতভাবে ট্র্যাক করে।
                </p>
              </div>
            </div>

          </div>

          {/* Right Visual Console Preview Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono text-xs text-slate-300 font-semibold uppercase">
                    LIVE AUTOMOTIVE HUD CONSOLE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#b8e900] bg-[#b8e900]/10 px-2 py-0.5 rounded border border-[#b8e900]/30">
                  OBD-II SYNC: ACTIVE
                </span>
              </div>

              {/* Graphic Simulator Box */}
              <div className="my-6 p-6 rounded-2xl bg-black border border-slate-800 text-center relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center justify-center py-4">
                  <div className="w-20 h-20 rounded-full border-2 border-[#b8e900]/50 bg-emerald-950/40 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(184,233,0,0.2)]">
                    <Car className="w-10 h-10 text-[#b8e900]" />
                  </div>
                  <div className="font-mono text-sm font-bold text-white">
                    DRIVER EYE ASPECT RATIO (EAR): <span className="text-emerald-400">0.32 (AWAKE)</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    Speed: 72 km/h • Sleep Window: 2.4s • GPS: Connected
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-[10px] font-mono">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    STATUS: <strong className="text-emerald-400">SAFE</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    THREAT: <strong className="text-cyan-400">0%</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    ALERT: <strong className="text-slate-400">STANDBY</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/sentinel"
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-[#b8e900] hover:bg-[#a6d200] shadow-lg shadow-[#b8e900]/25 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>লাইভ ক্যামেরা ডেমো ও প্যাকেজ দেখুন (৳৪,৪৯০ থেকে শুরু)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ইন্টারনেট ছাড়াও ১০০% অফলাইন কাজ করে</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>লাইফটাইম সফটওয়্যার লাইসেন্স</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
