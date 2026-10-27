"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, Flame, Phone, Crown } from "lucide-react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");

  const plans = [
    {
      name: "Starter Pilot",
      subtitle: "নতুন ফেসবুক শপ ও সিঙ্গেল পেজ মার্চেন্টদের জন্য উপযুক্ত",
      priceMonthlyBDT: 1990,
      priceYearlyBDT: 1590,
      priceMonthlyUSD: 24,
      priceYearlyUSD: 19,
      popular: false,
      features: [
        "১টি ফেসবুক পেইজ বা ইন্সটাগ্রাম চ্যানেল কানেক্ট",
        "১,৫০০টি সম্পূর্ণ স্বয়ংক্রিয় এআই সেলস চ্যাট / মাস",
        "ন্যাচারাল বাংলা, ইংরেজি ও বাংলিশে সাবলীল কথোপকথন",
        "ক্যাশ অন ডেলিভারি অটো-অর্ডার এক্সট্রাকশন ও ১১-ডিজিট ফোন চেক",
        "Steadfast ও Pathao কুরিয়ার ওয়ান-ক্লিক কনসাইনমেন্ট বুকিং",
        "ক্লাউড হোস্টিং (পিসি বা মোবাইল অন রাখার প্রয়োজন নেই)",
        "স্ট্যান্ডার্ড ওয়েব ড্যাশবোর্ড ও অর্ডার হিস্ট্রি CRM",
      ],
      ctaText: "Start 7-Day Free Pilot",
      ctaHref: "/dashboard?plan=starter",
    },
    {
      name: "Growth Pro",
      subtitle: "হাই-ভলিউম ই-কমার্স পেজ ও রিটার্ন কমাতে চাওয়া ব্র্যান্ডের জন্য",
      priceMonthlyBDT: 3990,
      priceYearlyBDT: 3190,
      priceMonthlyUSD: 45,
      priceYearlyUSD: 36,
      popular: true,
      features: [
        "Facebook Page + Instagram + 1 Official WhatsApp Cloud API",
        "৫,০০০টি হাই-কনভার্সন এআই সেলস কনভার্সেশন / মাস",
        "ইন-চ্যাটে ৳১০০ বিকাশ ডেলিভারি চার্জ কিউআর ও TrxID অটো-ভেরিফাই",
        "Steadfast, Pathao ও RedX ফ্রড শিল্ড ও পার্সেল অটো-এন্ট্রি",
        "বাংলা এআই ভয়েস কল (IVR) কনফার্মেশন ও কিপ্যাড '১' ভেরিফিকেশন",
        "৪x৬ থার্মাল শিপিং বারকোড স্টিকার প্রিন্ট রেডি (1-Click Print)",
        "পোস্ট-ডেলিভারি ৫-স্টার রিভিউ কালেকশন ও ১০% রেফারেল ভাউচার",
        "বিকাশ/নগদ মার্চেন্ট পেমেন্ট অটো-ইনভয়েস জেনারেটর",
        "২৪/৭ প্রায়োরিটি হোয়াটসঅ্যাপ ডেডিকেটেড সাপোর্ট",
      ],
      ctaText: "Claim Growth Pro (Recommended)",
      ctaHref: "/dashboard?plan=growth",
    },
    {
      name: "Agency & Scale",
      subtitle: "মার্কেটিং এজেন্সি, একাধিক পেজ ও এন্টারপ্রাইজ ব্র্যান্ডের জন্য",
      priceMonthlyBDT: 7990,
      priceYearlyBDT: 6390,
      priceMonthlyUSD: 85,
      priceYearlyUSD: 68,
      popular: false,
      features: [
        "আনলিমিটেড ফেসবুক পেজ ও একাধিক হোয়াটসঅ্যাপ বিজনেস নাম্বার",
        "১৫,০০০+ হাই-কনকারেন্সি সেলস কনভার্সেশন",
        "Agency White-Label রেডি (ক্লায়েন্টকে নিজের ব্র্যান্ডে সেল করুন)",
        "WooCommerce ও Shopify অটোমেটিক ২-ওয়ে ইনভেন্টরি সিঙ্ক",
        "মাল্টি-এজেন্ট লাইভ হিউম্যান টেকওভার ও চ্যাটবক্স হ্যান্ডওভার",
        "কাস্টম ক্যাটালগ এম্বেডিংস ও স্পেশাল প্রম্পট টিউনিং",
        "ডেডিকেটেড একাউন্ট ম্যানেজার, SLA ও ফোন সাপোর্ট",
      ],
      ctaText: "Get Agency & Scale",
      ctaHref: "/dashboard?plan=agency",
    },
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>স্বচ্ছ ও সাশ্রয়ী প্যাকেজ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            আপনার ফেসবুক শপের জন্য সেরা প্যাকেজ বেছে নিন
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            কোনো লুকায়িত চার্জ নেই। ৭ দিনের সম্পূর্ণ ফ্রি পাইলট দিয়ে শুরু করুন।
          </p>

          {/* Quick Cross-Link to Lead Generation Section */}
          <div className="mt-5 inline-flex items-center gap-2 p-1.5 px-4 bg-rose-50 border border-rose-200 rounded-full text-xs text-rose-800 font-semibold shadow-2xs">
            <Flame className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>সরাসরি ক্রেতা বা মার্চেন্ট লিড কিনতে চান?</span>
            <a href="#leads" className="text-rose-700 font-black underline hover:text-rose-900 ml-1">
              লিডস প্যাক দেখুন (৳২,৪৯০ থেকে শুরু) →
            </a>
          </div>

          {/* Dual Controls: Currency & Billing */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            
            {/* Currency Switcher */}
            <div className="inline-flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
              <button
                onClick={() => setCurrency("BDT")}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  currency === "BDT"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🇧🇩 BDT (৳)
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  currency === "USD"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🌐 USD ($)
              </button>
            </div>

            {/* Monthly / Yearly Toggle */}
            <div className="inline-flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                  billingCycle === "yearly"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-md font-extrabold">
                  Save 20%
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            let price = 0;
            let symbol = currency === "BDT" ? "৳" : "$";

            if (currency === "BDT") {
              price = billingCycle === "monthly" ? plan.priceMonthlyBDT : plan.priceYearlyBDT;
            } else {
              price = billingCycle === "monthly" ? plan.priceMonthlyUSD : plan.priceYearlyUSD;
            }

            return (
              <div
                key={idx}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? "bg-white border-2 border-emerald-500 shadow-2xl shadow-emerald-600/10 scale-100 lg:-translate-y-2"
                    : "bg-white border border-slate-200 shadow-sm hover:border-emerald-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black px-4 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular • সেরা প্যাকেজ</span>
                  </div>
                )}

                <div>
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.subtitle}</p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono">
                      {symbol}{price.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">/ month</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className="rounded-full bg-emerald-100 p-0.5 text-emerald-700 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    href={plan.ctaHref}
                    className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      plan.popular
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 hover:scale-[1.02]"
                        : "bg-slate-900 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="mt-3 text-center">
                    <span className="text-[11px] text-slate-400 font-medium">
                      ✓ ৭ দিনের মানি-ব্যাক গ্যারান্টি • যেকোনো সময় বাতিলযোগ্য
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Free Setup Note */}
        <div className="mt-12 bg-emerald-100/40 border border-emerald-200/80 rounded-2xl p-5 text-center max-w-2xl mx-auto flex items-center justify-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <p className="text-xs sm:text-sm text-emerald-950 font-medium">
            <strong>White-Glove Guarantee:</strong> প্রতিটি প্যাকেজের সাথে আমাদের ইঞ্জিনিয়ার সরাসরি গুগল মিট বা হোয়াটসঅ্যাপে আপনার পেজ সেটআপ ও ক্যাটালগ ইন্টিগ্রেশন করে দেবে।
          </p>
        </div>

      </div>
    </section>
  );
}
