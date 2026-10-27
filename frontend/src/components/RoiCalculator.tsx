"use client";

import { useState } from "react";
import { Calculator, TrendingUp, Clock, DollarSign, Sparkles } from "lucide-react";

export default function RoiCalculator() {
  const [dailyMessages, setDailyMessages] = useState<number>(80);

  const monthlyInquiries = dailyMessages * 30;
  const hoursSaved = Math.round((monthlyInquiries * 3.5) / 60);
  const extraOrders = Math.round(monthlyInquiries * 0.08);
  const estimatedCostSavingUSD = dailyMessages > 80 ? "$180 - $280 / mo" : "$90 - $140 / mo";
  const estimatedCostSavingBDT = dailyMessages > 80 ? "৳20,000 - ৳30,000" : "৳10,000 - ৳15,000";

  return (
    <section id="roi" className="py-20 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-3">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive ROI & Velocity Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Quantify Your Labor Savings & Revenue Upside
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              Drag the slider below to represent your brand's average daily inbound inquiries:
            </p>
          </div>

          {/* Slider */}
          <div className="max-w-xl mx-auto mb-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-3 text-sm font-bold">
              <span className="text-slate-300">Daily Inbound Chats:</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">
                {dailyMessages} inquiries / day
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="400"
              step="5"
              value={dailyMessages}
              onChange={(e) => setDailyMessages(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span>10 / day</span>
              <span>100 / day</span>
              <span>250 / day</span>
              <span>400+ / day</span>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative z-10">
            
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">
                {hoursSaved} hrs
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">
                Manual Rep Support Time Saved Monthly
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-300 font-mono">
                +{extraOrders} Orders
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">
                Recovered Conversions via Instant Reply
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {estimatedCostSavingUSD}
              </div>
              <div className="text-xs text-slate-300 mt-1 font-medium">
                ({estimatedCostSavingBDT}) Monthly Payroll Saved
              </div>
            </div>

          </div>

          <div className="text-center mt-8">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Deploy Autonomous Agent on Your Store</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
