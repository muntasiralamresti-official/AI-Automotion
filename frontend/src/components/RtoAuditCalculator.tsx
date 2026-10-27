"use client";

import { useState } from "react";
import { 
  Calculator, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  TrendingDown, 
  Sparkles, 
  Phone, 
  Store, 
  Truck, 
  CheckCircle2, 
  FileText,
  DollarSign,
  Download
} from "lucide-react";

export default function RtoAuditCalculator() {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(450);
  const [returnRate, setReturnRate] = useState<number>(22); // average 22% RTO in BD
  
  // Lead form states
  const [storeName, setStoreName] = useState<string>("");
  const [merchantPhone, setMerchantPhone] = useState<string>("");
  const [courierName, setCourierName] = useState<string>("Steadfast Courier");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Financial Calculations
  // Average return cost in BD: ৳70 outgoing + ৳70 return charge + ৳10 packing = ৳150
  const avgReturnCost = 150;
  const currentReturns = Math.round(monthlyOrders * (returnRate / 100));
  const currentLostBDT = currentReturns * avgReturnCost;
  const annualLostBDT = currentLostBDT * 12;

  // Oddo reduces RTO by ~72% via 3-step fraud defense (bKash advance fee + phone check + AI IVR call)
  const oddoReturnRate = Math.max(4, Math.round(returnRate * 0.28));
  const oddoReturns = Math.round(monthlyOrders * (oddoReturnRate / 100));
  const oddoLostBDT = oddoReturns * avgReturnCost;
  const monthlySavedBDT = currentLostBDT - oddoLostBDT;
  const annualSavedBDT = monthlySavedBDT * 12;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantPhone || !storeName) return;
    setIsSubmitted(true);
  };

  return (
    <section id="rto-audit" className="py-20 sm:py-28 bg-gradient-to-b from-white via-amber-50/20 to-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Free Store RTO Leakage Audit • নো কস্ট, ইনস্ট্যান্ট রিপোর্ট</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
            গত মাসে আপনার কুরিয়ার রিটার্নে <span className="text-rose-600 underline decoration-rose-300">কত টাকা নষ্ট হয়েছে?</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            আপনার মাসিক পার্সেল সংখ্যা এবং গড় রিটার্ন রেট দিন। Oddo AI হিসাব করে দেখিয়ে দেবে আপনার বিজনেসের প্রতি মাসে কত টাকা সেভ করা সম্ভব।
          </p>
        </div>

        {/* Main Grid: Calculator on Left, Action Lead Capture on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Sliders & Live Comparison (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-7">
            
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <span>আপনার স্টোরের কুরিয়ার ডাটা দিন</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">রিয়েল-টাইমে হিসাব দেখতে স্লাইডার দুটি পরিবর্তন করুন</p>
            </div>

            {/* Slider 1: Monthly Orders */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-700">প্রতি মাসে কত পার্সেল পাঠান? (Monthly Orders):</span>
                <span className="text-lg font-mono font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  {monthlyOrders} পার্সেল
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="25"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>৫০ পার্সেল/মাস</span>
                <span>৫০০</span>
                <span>১,৫০০</span>
                <span>২,৫০০+ পার্সেল</span>
              </div>
            </div>

            {/* Slider 2: Current Return % */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-700">বর্তমান রিটার্ন বা ক্যানসেল রেট (RTO %):</span>
                <span className="text-lg font-mono font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200">
                  {returnRate}% রিটার্ন
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="45"
                step="1"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>৮% (খুব ভালো)</span>
                <span>২২% (গড় বাংলাদেশি ফেসবুক পেজ)</span>
                <span>৪৫% (মারাত্মক ক্ষতি)</span>
              </div>
            </div>

            {/* Impact Metric Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Lost Card */}
              <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-2xl relative overflow-hidden">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-rose-600" />
                  <span>কুরিয়ার চার্জে মাসিক ক্ষতি (Waste)</span>
                </div>
                <div className="text-3xl font-black text-rose-600 font-mono mt-2">
                  ৳{currentLostBDT.toLocaleString()}
                </div>
                <div className="text-xs text-rose-800/80 mt-1 font-medium">
                  {currentReturns} টি পার্সেল রিটার্ন × ৳১৫০ কুরিয়ার লস
                </div>
                <div className="mt-2 text-[11px] text-rose-500 font-mono">
                  বছরে ক্ষতি: ৳{annualLostBDT.toLocaleString()}
                </div>
              </div>

              {/* Oddo Protected Card */}
              <div className="bg-emerald-50/90 border border-emerald-300 p-5 rounded-2xl relative overflow-hidden shadow-2xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Oddo AI দিয়ে নিশ্চিত সেভিংস</span>
                </div>
                <div className="text-3xl font-black text-emerald-700 font-mono mt-2">
                  ৳{monthlySavedBDT.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-800 mt-1 font-semibold">
                  রিটার্ন ড্রপ করে {returnRate}% থেকে মাত্র {oddoReturnRate}%-এ নামবে
                </div>
                <div className="mt-2 text-[11px] text-emerald-600 font-mono font-bold">
                  বছরে বাঁচবে: ৳{annualSavedBDT.toLocaleString()} 🔥
                </div>
              </div>

            </div>

            {/* Micro Explainer */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>কীভাবে অডো এই টাকা সেভ করে?</span>
              </div>
              <p>
                ১. অর্ডার কনফার্মের সাথে সাথে ইন-চ্যাটে <strong>৳১০০ ডেলিভারি চার্জ বিকাশ পেমেন্ট লিংক</strong> পাঠায় (৯০% ফেইক বা টাইমপাস কাস্টমার সেখানেই ফিল্টার হয়)।
                ২. <strong>Steadfast কুরিয়ার ডাটাবেজ</strong> চেক করে ব্যাড হিস্ট্রি বা ফ্রড ফোন নম্বর ডিটেক্ট করে।
                ৩. পার্সেল পাঠানোর আগে <strong>বাংলা AI ভয়েস কল</strong> দিয়ে ফাইনাল কনফার্ম করে।
              </p>
            </div>

          </div>

          {/* Right Column: Lead Magnet Form & Instant Action Report (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {!isSubmitted ? (
              <div className="space-y-5 relative z-10">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                    Free Merchant Audit
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                    আপনার পেজের ফ্রি RTO অডিট রিপোর্ট নিন
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    আপনার পেজের নাম ও হোয়াটসঅ্যাপ নম্বর দিন। অডোর AI স্পেশালিস্ট টিম আপনার কুরিয়ার লিকেজ ফিক্স করার একটি কমপ্লিট ১-পেজ অ্যাকশন প্ল্যান তৈরি করে পাঠিয়ে দেবে।
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 block flex items-center gap-1.5">
                      <Store className="w-3.5 h-3.5 text-emerald-400" />
                      <span>আপনার ফেসবুক পেজ / শপের নাম</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka Gadget Hub বা Trendy Fashion BD"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-400 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 block flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>হোয়াটসঅ্যাপ নম্বর (যেখানে রিপোর্ট পাবেন)</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01700-000000"
                      value={merchantPhone}
                      onChange={(e) => setMerchantPhone(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-400 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300 block flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>আপনি কোন কুরিয়ার বেশি ব্যবহার করেন?</span>
                    </label>
                    <select
                      value={courierName}
                      onChange={(e) => setCourierName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-400 text-xs cursor-pointer"
                    >
                      <option value="Steadfast Courier">Steadfast Courier (স্টেডফাস্ট)</option>
                      <option value="Pathao Courier">Pathao Courier (পাঠাও)</option>
                      <option value="RedX Logistics">RedX Logistics (রেডএক্স)</option>
                      <option value="Paperfly">Paperfly (পেপারফ্লাই)</option>
                      <option value="Multiple">একাধিক কুরিয়ার ব্যবহার করি</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!storeName || !merchantPhone}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                    >
                      <span>আমার ফ্রি অডিট রিপোর্ট চাই 🚀</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400 text-center">
                    🔒 ১০০% ফ্রি ও কনফিডেনশিয়াল। কোনো ক্রেডিট কার্ড লাগবে না।
                  </p>
                </form>
              </div>
            ) : (
              /* Instant Generated Lead Audit Confirmation */
              <div className="space-y-5 animate-in fade-in zoom-in-95 relative z-10 text-center py-2">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto border border-emerald-400/40 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-black text-white">অডিট রিকোয়েস্ট সফল হয়েছে!</h4>
                  <p className="text-xs text-slate-300">
                    <strong className="text-emerald-400">{storeName}</strong>-এর ফ্রি RTO রিপোর্ট তৈরি করা হয়েছে।
                  </p>
                </div>

                {/* Instant Scorecard Badge */}
                <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">স্টোর নাম:</span>
                    <span className="font-bold text-white">{storeName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">বর্তমান মাসিক ক্ষতি:</span>
                    <span className="font-bold text-rose-400 font-mono">৳{currentLostBDT.toLocaleString()} / মাস</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">Oddo প্রটেক্টেড সেভিংস:</span>
                    <span className="font-bold text-emerald-400 font-mono">+৳{monthlySavedBDT.toLocaleString()} / মাস</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">কুরিয়ার পার্টনার:</span>
                    <span className="font-medium text-slate-300">{courierName}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <a
                    href={`https://wa.me/8801700000000?text=${encodeURIComponent(`Hi Oddo Team! I just ran an RTO Audit for my store "${storeName}". My monthly lost courier cash is ৳${currentLostBDT.toLocaleString()}. Please send my complete RTO Shield Action Report to my WhatsApp: ${merchantPhone}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>WhatsApp-এ ফুল রিপোর্ট ডাউনলোড করুন</span>
                  </a>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    আরেকটি পেজের হিসাব দেখুন
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
