"use client";

import { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Moon, 
  CheckCircle2, 
  Truck, 
  Smartphone, 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  Send,
  Eye,
  ChevronRight,
  ExternalLink,
  QrCode
} from "lucide-react";

interface SceneStep {
  id: number;
  time: string;
  badge: string;
  title: string;
  description: string;
  chatBubbleCustomer?: string;
  chatBubbleZyncoo?: string;
  actionDetails?: string;
  cumulativeRevenue: number;
  ordersCount: number;
}

const scenes: SceneStep[] = [
  {
    id: 1,
    time: "03:00 AM",
    badge: "Staff Sleeping • Dhaka Office Offline",
    title: "অফিস লাইট বন্ধ, সব পেইজ অ্যাডমিন ঘুমাচ্ছে",
    description: "রাত ৩টায় সাধারণ শপগুলো কাস্টমারের মেসেজ মিস করে। কিন্তু Zyncoo AI জাগ্রত ও অ্যালার্ট থাকে।",
    chatBubbleCustomer: "ভাইয়া T900 Ultra ওয়াচটার ব্ল্যাক কালার কি স্টকে আছে? মিরপুর ১০ এ কালকে ডেলিভারি পাওয়া যাবে?",
    chatBubbleZyncoo: "আসসালামু আলাইকুম ভাইয়া! জি, T900 Ultra ব্ল্যাক কালার ফুল স্টক এভেইলেবল আছে। প্রাইস মাত্র ৳১,৫৫০। মিরপুরে আগামীকালকের মধ্যেই স্টেডফাস্ট কুরিয়ারে ক্যাশ অন ডেলিভারি পাবেন। আপনার নাম, ফুল অ্যাড্রেস ও ফোন নম্বরটি দিলে এখনই পার্সেল বুক করে দিচ্ছি!",
    actionDetails: "AI উত্তর দিল মাত্র ১.২ সেকেন্ডে (Zero Delay)",
    cumulativeRevenue: 1550,
    ordersCount: 1,
  },
  {
    id: 2,
    time: "03:08 AM",
    badge: "Automated bKash Advance QR",
    title: "ইন-চ্যাট ১০০ টাকা বিকাশ ডেলিভারি চার্জ ভেরিফিকেশন",
    description: "কাস্টমার যাতে পার্সেল রিসিভ না করে ফেরত না দেয়, সেজন্য Zyncoo স্বয়ংক্রিয়ভাবে ১০০ টাকা অ্যাডভান্স পেমেন্ট লিংক দিল।",
    chatBubbleCustomer: "অর্ডার কনফার্ম করেন। নাম: তানভির আহমেদ, মিরপুর ১০, ব্লক সি, রোড ৪, বাসা ১২। মোবাইল: 01712-345678",
    chatBubbleZyncoo: "অসংখ্য ধন্যবাদ তানভির ভাইয়া! ক্যাশ অন ডেলিভারির ডেলিভারি চার্জ বাবদ ৳১০০ নিচে দেওয়া বিকাশ মার্চেন্ট কিউআর বা পেমেন্ট লিংকে পে করে TrxID টি দিন। বাকি ৳১,৪৫০ ডেলিভারি ম্যানের হাতে দিবেন।",
    actionDetails: "বিকাশ TrxID 9K38FX91Q ভেরিফাইড (৳১০০ জমা হয়েছে)",
    cumulativeRevenue: 1550,
    ordersCount: 1,
  },
  {
    id: 3,
    time: "03:15 AM",
    badge: "Steadfast Courier API Booking",
    title: "অটোমেটিক কুরিয়ার পার্সেল এন্ট্রি ও বারকোড রেডি",
    description: "মানুষের কোনো হাত দেওয়া ছাড়াই স্টেডফাস্ট কুরিয়ারে পার্সেল বুক হয়ে গেল এবং ট্র্যাকিং আইডি কাস্টমারকে পাঠানো হলো।",
    chatBubbleCustomer: "বিকাশে পেমেন্ট করে দিয়েছি। TrxID: 9K38FX91Q",
    chatBubbleZyncoo: "পেমেন্ট সফলভাবে ভেরিফাই হয়েছে ভাইয়া! আপনার পার্সেলটি স্টেডফাস্ট কুরিয়ারে বুক করা হয়েছে। কনসাইনমেন্ট আইডি: ST-9921471। সকালে রাইডার পিকআপ করলেই আপনার ফোনে ট্র্যাকিং লিংক যাবে। শুভরাত্রি!",
    actionDetails: "Steadfast API: Consignment Created (#ST-9921471)",
    cumulativeRevenue: 1550,
    ordersCount: 1,
  },
  {
    id: 4,
    time: "03:42 AM",
    badge: "High Velocity Night Conversions",
    title: "আরও ৩টি অর্ডার কনফার্ম হলো ঘুমের মধ্যেই",
    description: "উত্তরা, চট্টগ্রাম ও সিলেট থেকে আরও ৩ জন কাস্টমার ঘড়ি ও ইয়ারবাডস অর্ডার করলো এবং Zyncoo সবার সাথে চ্যাট করে কনফার্ম করলো।",
    chatBubbleCustomer: "চট্টগ্রামে ক্যাশ অন ডেলিভারি দেওয়া যাবে? ২টা ওয়াচ নিতে চাই (ব্ল্যাক + সিলভার)।",
    chatBubbleZyncoo: "জি অবশ্যই ভাইয়া! চট্টগ্রামের যেকোনো জায়গায় ৪৮ ঘণ্টার মধ্যে পাঠাও/স্টেডফাস্ট কুরিয়ারে হোম ডেলিভারি পাবেন। ২টির জন্য মোট ৳৩,১০০। আপনার ডেলিভারি অ্যাড্রেস দিন প্লিজ!",
    actionDetails: "চট্টগ্রাম ও উত্তরা থেকে আরও ৩টি অর্ডার বুকড",
    cumulativeRevenue: 6200,
    ordersCount: 4,
  },
  {
    id: 5,
    time: "07:30 AM",
    badge: "Staff Morning Wakeup & Coffee",
    title: "সকালে উঠে দেখলেন ৪টি অর্ডার রেডি ফর পিকআপ!",
    description: "দোকানের মালিক সকালে ঘুম থেকে উঠে দেখলেন রাত ৩টায় ৪টি অর্ডার প্রসেসড, ৳৬,২০০ সেলস কমপ্লিট এবং কুরিয়ার লেবেল প্রিন্ট রেডি।",
    actionDetails: "সেলস যোগ হলো: +৳৬,২০০ • কুরিয়ার রেডি: ৪টি • নো মিসড সেলস",
    cumulativeRevenue: 6200,
    ordersCount: 4,
  }
];

export default function MidnightCaseStudyPlayer() {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const currentScene = scenes[activeSceneIndex];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveSceneIndex((prev) => (prev + 1) % scenes.length);
    }, 4500); // changes scene every 4.5 seconds

    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <section id="case-study" className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-2xs">
            <Moon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Real Store 60-Second Midnight Case Study • রাত ৩টার লাইভ স্ক্রিন রেকর্ড</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.2]">
            কীভাবে রাত ৩টায় যখন <span className="text-emerald-400">সব স্টাফ ঘুমাচ্ছিল</span>, Zyncoo AI ৪টি ওয়াচের অর্ডার পাঠিয়ে দিল কুরিয়ারে
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            বাংলাদেশের অধিকাংশ ফেসবুক শপ রাত ১২টা থেকে সকাল ৯টা পর্যন্ত কোনো সেলস পায় না কারণ কাস্টমার রিপ্লাই পায় না। দেখুন কীভাবে Zyncoo আপনার ঘুমন্ত সময়কে সর্বোচ্চ প্রফিটেবল সময়ে রূপান্তর করে।
          </p>
        </div>

        {/* Video Player Frame Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Top Video Toolbar: Status & Live Counter */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-black">{currentScene.time}</span>
                <span className="text-slate-500">•</span>
                <span>{currentScene.badge}</span>
              </div>
            </div>

            {/* Live Ticker */}
            <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Live Night Revenue</div>
                <div className="text-lg font-black text-emerald-400 font-mono">
                  ৳{currentScene.cumulativeRevenue.toLocaleString()}
                </div>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Parcels Booked</div>
                <div className="text-lg font-black text-white font-mono">
                  {currentScene.ordersCount} Units
                </div>
              </div>
            </div>
          </div>

          {/* Main Simulation Viewport (Simulating Phone Chat / Dashboard) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Chat Simulator Replay (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-5 sm:p-6 border border-slate-800/80 shadow-inner space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                    ZY
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Royal Gadget BD • WhatsApp Store</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Zyncoo AI Active (03:00 AM)
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded-md border border-slate-800">
                  Speed: 1.2s Response
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-3.5 min-h-[220px] flex flex-col justify-center">
                {currentScene.chatBubbleCustomer && (
                  <div className="flex justify-end">
                    <div className="bg-emerald-700/80 text-white rounded-2xl rounded-tr-xs p-3.5 max-w-[85%] text-xs leading-relaxed shadow-sm">
                      <div className="text-[9px] text-emerald-200 font-semibold mb-1 flex justify-between">
                        <span>Customer (Mirpur, Dhaka)</span>
                        <span>{currentScene.time}</span>
                      </div>
                      {currentScene.chatBubbleCustomer}
                    </div>
                  </div>
                )}

                {currentScene.chatBubbleZyncoo && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-tl-xs p-3.5 max-w-[90%] text-xs leading-relaxed border border-slate-700 shadow-sm space-y-2">
                      <div className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Zyncoo AI Assistant</span>
                      </div>
                      <p>{currentScene.chatBubbleZyncoo}</p>
                    </div>
                  </div>
                )}

                {/* System Action Highlight */}
                {currentScene.actionDetails && (
                  <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">{currentScene.actionDetails}</span>
                  </div>
                )}
              </div>

            </div>

            {/* Right: Step Description & Storyline (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  Scene {activeSceneIndex + 1} of {scenes.length}
                </span>
                <h3 className="text-2xl font-black text-white leading-tight">
                  {currentScene.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentScene.description}
                </p>
              </div>

              {/* Verified Merchant Badge */}
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    RH
                  </div>
                  <div>
                    <div className="font-bold text-white">রাকিবুল হাসান</div>
                    <div className="text-slate-400 text-[11px]">Owner, Royal Gadget BD • 1,200+ monthly orders</div>
                  </div>
                </div>
                <p className="text-slate-300 italic text-[11px] leading-normal pt-1">
                  &ldquo;আগে রাতে ৩০% কাস্টমার রিপ্লাই না পেয়ে অন্য পেইজে চলে যেত। এখন আমি ঘুম থেকে উঠে দেখি রাতের ৪-৫ টা অর্ডার বিকাশে ডেলিভারি চার্জ দিয়ে কনফার্ম হয়ে স্টেডফাস্টে বুক করা!&rdquo;
                </p>
              </div>

              {/* Player Progress Scrubber */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all cursor-pointer shadow-md"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  </button>

                  <button
                    onClick={() => setActiveSceneIndex(0)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="flex-1 flex gap-1.5 ml-2">
                    {scenes.map((scene, idx) => (
                      <button
                        key={scene.id}
                        onClick={() => {
                          setActiveSceneIndex(idx);
                          setIsPlaying(false);
                        }}
                        className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                          idx === activeSceneIndex
                            ? "bg-emerald-400"
                            : idx < activeSceneIndex
                            ? "bg-emerald-800"
                            : "bg-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>03:00 AM</span>
                  <span>03:15 AM</span>
                  <span>03:45 AM</span>
                  <span>07:30 AM Wakeup</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Callout */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>প্রতি মাসে গড়ে ৳৩৫,০০০+ টাকার অতিরিক্ত সেলস শুধুমাত্র রাতের শিফটে উদ্ধার হয়।</span>
            </div>

            <a
              href="#pricing"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
            >
              <span>আপনার পেইজেও ৭ দিনের ফ্রি ট্রায়াল নিন</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
