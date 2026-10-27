"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Users,
  DollarSign,
  Share2,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Copy,
  Sparkles,
  Phone,
  Building2,
  Percent,
  ShieldCheck,
  Globe,
  Palette,
  Layers,
  Crown
} from "lucide-react";

type PartnerTier = "whitelabel" | "affiliate";

export default function AffiliatePage() {
  const [partnerTier, setPartnerTier] = useState<PartnerTier>("whitelabel");
  
  // White-label calculations (৳8,000 retail - ৳4,990 wholesale = ৳3,010 net profit / store)
  const [wlStoreCount, setWlStoreCount] = useState<number>(20);
  const wlMonthlyMargin = wlStoreCount * 3010;
  const wlAnnualMargin = wlMonthlyMargin * 12;

  // Standard affiliate calculations (20% of ৳4,990 = ৳998 / store)
  const [affStoreCount, setAffStoreCount] = useState<number>(15);
  const affMonthlyEarnings = affStoreCount * 998;
  const affAnnualEarnings = affMonthlyEarnings * 12;

  // Lead Generation States
  const [agencyName, setAgencyName] = useState<string>("");
  const [agencyPhone, setAgencyPhone] = useState<string>("");
  const [agencyDomain, setAgencyDomain] = useState<string>("");
  const [bkashNumber, setBkashNumber] = useState<string>("");
  const [partnerGenerated, setPartnerGenerated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const cleanSlug = agencyName.toLowerCase().replace(/[^a-z0-9]/g, "") || "agency";
  const whiteLabelPortalUrl = `https://ai.${cleanSlug || "yourbrand"}.com`;
  const affiliateReferralLink = `https://oddo.ai/?ref=${cleanSlug}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-white via-emerald-50/40 to-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-2xs">
              <Crown className="w-3.5 h-3.5 text-emerald-700" />
              <span>Agency White-Label & Partner Ecosystem</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
              Sell AI Automation Under <span className="text-emerald-600">Your Own Agency Brand</span> or Earn 20% Lifetime Commission
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              আপনি কি ডিজিটাল মার্কেটিং এজেন্সি, শপিফাই ডেভেলপার বা ফেসবুক মিডিয়া বায়ার? আপনার ক্লায়েন্টদের অডোর ফুল AI স্যুট প্রোভাইড করুন আপনার নিজস্ব এজেন্সির নামে অথবা রেফার করে নিশ্চিত প্যাসিভ ইনকাম তৈরি করুন।
            </p>

            {/* Partner Mode Switcher */}
            <div className="inline-flex p-1.5 bg-slate-200/90 rounded-2xl border border-slate-300 mt-2">
              <button
                onClick={() => setPartnerTier("whitelabel")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTier === "whitelabel"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <Crown className="w-4 h-4" />
                <span>Agency White-Label (Recommended)</span>
                <span className="bg-emerald-400 text-emerald-950 text-[10px] px-1.5 py-0.5 rounded-md font-black">৳3,010 Margin</span>
              </button>

              <button
                onClick={() => setPartnerTier("affiliate")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                  partnerTier === "affiliate"
                    ? "bg-slate-900 text-white shadow-md"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                <Percent className="w-4 h-4 text-emerald-400" />
                <span>Standard Affiliate (20% Lifetime)</span>
              </button>
            </div>

          </div>
        </section>

        {/* Dynamic Partner Calculator */}
        <section id="calculator" className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {partnerTier === "whitelabel" ? (
            /* WHITE LABEL CALCULATOR */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Agency White-Label Revenue Projection
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  এজেন্সির নিজস্ব ব্র্যান্ডে সেল করে কত আয় করতে পারবেন?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                  ক্লায়েন্ট থেকে আপনি নেবেন প্রতি মাসে <strong>৳৮,০০০</strong>, অডোকে দেবেন পাইকারি রেটে <strong>৳৪,৯৯০</strong> — প্রতি ক্লায়েন্টে প্রতি মাসে আপনার নিট লাভ থাকবে <strong>৳৩,০১০</strong>।
                </p>
              </div>

              {/* Slider */}
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="flex items-center justify-between font-bold text-sm text-slate-900">
                  <span>আপনার সক্রিয় ক্লায়েন্ট সংখ্যা (Agency Clients):</span>
                  <span className="text-lg font-mono text-emerald-600 font-black">{wlStoreCount} টি স্টোর</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={60}
                  step={1}
                  value={wlStoreCount}
                  onChange={(e) => setWlStoreCount(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-2.5 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>২ টি স্টোর</span>
                  <span>২০ টি</span>
                  <span>৪০ টি</span>
                  <span>৬০+ টি ক্লায়েন্ট</span>
                </div>
              </div>

              {/* Financial Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">ক্লায়েন্ট থেকে আপনি কালেক্ট করবেন</div>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-1">
                    ৳{(wlStoreCount * 8000).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">৳৮,০০০ × {wlStoreCount} স্টোর</div>
                </div>

                <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-300 text-center shadow-2xs">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">আপনার এজেন্সির মাসিক নিট লাভ</div>
                  <div className="text-3xl font-black text-emerald-700 font-mono mt-1">
                    ৳{wlMonthlyMargin.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">১০০% প্যাসিভ নেট মার্জিন</div>
                </div>

                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-center">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">বাৎসরিক এজেন্সির প্রফিট</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                    ৳{wlAnnualMargin.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">প্রতি বছর রিকারিং গ্রোথ</div>
                </div>
              </div>

              {/* White Label Feature Checklist */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-black text-sm text-slate-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>White-Label পার্টনার প্যাকেজে আপনি যা যা পাচ্ছেন:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>কাস্টম সাবডোমেন:</strong> ai.youragency.com ডোমেনে আপনার ক্লায়েন্টরা লগইন করবে।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>১০০% এজেন্সির ব্র্যান্ডিং:</strong> আপনার লোগো, নাম ও কালার। কোথাও Oddo-এর নাম থাকবে না।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>মাল্টি-টেন্যান্ট মাস্টার ড্যাশবোর্ড:</strong> এক স্ক্রিন থেকে আপনার সব ক্লায়েন্টের স্টোর ম্যানেজ করুন।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>নিজস্ব পেমেন্ট কালেকশন:</strong> ক্লায়েন্ট ফি আপনার এজেন্সির বিকাশ বা ব্যাংক অ্যাকাউন্টে আসবে।</span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* STANDARD AFFILIATE CALCULATOR */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8 animate-in fade-in">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Affiliate Referral Commission
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                  রেফারেল লিংকে কত আয় করতে পারবেন?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                  প্রতিটি স্টোর যখন আমাদের ৳৪,৯৯০ সাবস্ক্রিপশন প্ল্যানে জয়েন করবে, আপনি আজীবন প্রতি মাসে <strong>২০% (৳৯৯৮)</strong> কমিশন সরাসরি আপনার বিকাশ বা ব্যাংকে পাবেন।
                </p>
              </div>

              {/* Slider */}
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="flex items-center justify-between font-bold text-sm text-slate-900">
                  <span>রেফার করা স্টোর সংখ্যা (Referred Stores):</span>
                  <span className="text-lg font-mono text-emerald-600 font-black">{affStoreCount} টি স্টোর</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={affStoreCount}
                  onChange={(e) => setAffStoreCount(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-2.5 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>১ টি স্টোর</span>
                  <span>২৫ টি</span>
                  <span>৫০+ টি স্টোর</span>
                </div>
              </div>

              {/* Payout Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                <div className="bg-emerald-50/90 p-5 rounded-2xl border border-emerald-300 text-center">
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">মাসিক রিকারিং পে-আউট</div>
                  <div className="text-3xl font-black text-emerald-700 font-mono mt-1">৳{affMonthlyEarnings.toLocaleString()}</div>
                  <div className="text-[11px] text-emerald-600 mt-0.5">প্রতি মাসের ১ তারিখে বিকাশ/ব্যাংকে অটো ডিপোজিট</div>
                </div>

                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-center">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">বাৎসরিক আর্নিং</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono mt-1">৳{affAnnualEarnings.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">একবার রেফার, আজীবন কমিশন</div>
                </div>
              </div>

            </div>
          )}

        </section>

        {/* Comparison Table: White-Label vs Affiliate */}
        <section className="py-12 bg-white border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-slate-900">Affiliate বনাম White-Label এর পার্থক্য</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">আপনার এজেন্সির জন্য কোনটি সবচেয়ে উপযুক্ত বেছে নিন</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700">
                    <th className="p-4 font-bold">ফিচার</th>
                    <th className="p-4 font-bold">Standard Affiliate</th>
                    <th className="p-4 font-black text-emerald-700 bg-emerald-50/80">Agency White-Label ⭐</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-4 font-semibold">আপনার প্রতি ক্লায়েন্ট আয়</td>
                    <td className="p-4 font-mono">৳৯৯৮ / মাস (২০%)</td>
                    <td className="p-4 font-mono font-bold text-emerald-700 bg-emerald-50/50">৳৩,০১০ / মাস (৩৮%+)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">ব্র্যান্ডিং ও লোগো</td>
                    <td className="p-4">Oddo AI ব্র্যান্ড</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">১০০% আপনার এজেন্সির লোগো</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">কাস্টম ডোমেন সাপোর্ট</td>
                    <td className="p-4">oddo.ai/?ref=yourname</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">ai.youragency.com</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">ক্লায়েন্টকে আপনি প্রাইসিং নির্ধারণ করবেন?</td>
                    <td className="p-4">না (ফিক্সড অডো প্রাইসিং)</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">হ্যাঁ (৳৮,০০০ থেকে ৳১৫,০০০/মাস)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold">মাল্টি-ক্লায়েন্ট মাস্টার ড্যাশবোর্ড</td>
                    <td className="p-4">শুধু রেফারেল লিস্ট</td>
                    <td className="p-4 font-bold text-emerald-700 bg-emerald-50/50">সম্পূর্ণ মাস্টার অ্যাডমিন প্যানেল</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section id="join-partner" className="py-16 max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            <div className="border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold mb-1">
                {partnerTier === "whitelabel" ? <Crown className="w-3.5 h-3.5" /> : <Percent className="w-3.5 h-3.5" />}
                <span>{partnerTier === "whitelabel" ? "Apply for Agency White-Label" : "Get Affiliate Referral Link"}</span>
              </div>
              <h3 className="font-black text-xl text-slate-900">
                {partnerTier === "whitelabel" ? "এজেন্সি পার্টনার পোর্টাল চালু করুন" : "Oddo অ্যাফিলিয়েট নেটওয়ার্কে যুক্ত হন"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {partnerTier === "whitelabel"
                  ? "আপনার এজেন্সির তথ্য দিন, ইনস্ট্যান্ট হোয়াইট-লেবেল প্রিভিউ পেয়ে যাবেন।"
                  : "আপনার বিকাশ নম্বর দিন, প্রতি মাসের ১ তারিখে কমিশন সরাসরি বিকাশ হবে।"}
              </p>
            </div>

            {!partnerGenerated ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!agencyName || !agencyPhone) return;
                  setPartnerGenerated(true);
                }}
                className="space-y-4 text-xs"
              >
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    {partnerTier === "whitelabel" ? "এজেন্সির নাম (Agency Name)" : "আপনার / এজেন্সির নাম"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MediaCraft Agency বা Zenith Digital"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {partnerTier === "whitelabel" && (
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">
                      পছন্দের কাস্টম সাবডোমেন (Subdomain)
                    </label>
                    <div className="flex items-center">
                      <span className="p-3 bg-slate-100 text-slate-500 border border-r-0 border-slate-300 rounded-l-xl font-mono text-xs">
                        ai.
                      </span>
                      <input
                        type="text"
                        placeholder="youragency"
                        value={agencyDomain}
                        onChange={(e) => setAgencyDomain(e.target.value)}
                        className="w-full p-3 border border-slate-300 focus:outline-hidden focus:border-emerald-500 font-mono text-xs"
                      />
                      <span className="p-3 bg-slate-100 text-slate-500 border border-l-0 border-slate-300 rounded-r-xl font-mono text-xs">
                        .com
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">অফিসিয়াল হোয়াটসঅ্যাপ নম্বর (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="01700-000000"
                    value={agencyPhone}
                    onChange={(e) => setAgencyPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">কমিশন / প্রফিট পেআউট বিকাশ বা ব্যাংক নম্বর</label>
                  <input
                    type="tel"
                    placeholder="01800-000000 (Personal or Merchant bKash)"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!agencyName || !agencyPhone}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {partnerTier === "whitelabel"
                      ? "হোয়াইট-লেবেল স্যান্ডবক্স ড্যাশবোর্ড জেনারেট করুন 🚀"
                      : "আমার অ্যাফিলিয়েট রেফারেল লিংক তৈরি করুন"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="space-y-5 animate-in fade-in zoom-in-95">
                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-1.5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-black text-sm text-slate-900">
                    {partnerTier === "whitelabel" ? "White-Label Agency Portal Ready!" : "Partner Link Generated!"}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {partnerTier === "whitelabel"
                      ? `Welcome ${agencyName}! Your dedicated white-label portal is ready.`
                      : "Your 20% recurring commission tracker is now live."}
                  </p>
                </div>

                {partnerTier === "whitelabel" ? (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-1">
                      <div className="text-[10px] text-emerald-400 uppercase font-mono font-bold">Your Branded Client Portal</div>
                      <div className="text-sm font-mono font-bold text-white truncate">
                        {`https://ai.${agencyDomain || cleanSlug}.com`}
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 space-y-2">
                      <div className="font-bold text-slate-800">পরবর্তী পদক্ষেপ:</div>
                      <p>
                        আমাদের পার্টনার সাপোর্ট টিম আপনার হোয়াটসঅ্যাপ <strong>({agencyPhone})</strong>-এ DNS CNAME ভেরিফিকেশন ও কাস্টম লোগো আপলোডের গাইড পাঠিয়ে দিয়েছে।
                      </p>
                      <a
                        href={`https://wa.me/8801700000000?text=${encodeURIComponent(`Hello Oddo Team! I just registered my Agency "${agencyName}" for White-Label AI portal at ai.${agencyDomain || cleanSlug}.com. Please activate my Sandbox master admin!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-700 font-bold hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>WhatsApp-এ সরাসরি পার্টনার ম্যানেজারের সাথে কথা বলুন</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700 block">Your Dedicated Referral Link:</label>
                      <div className="flex items-center gap-1.5 p-2.5 bg-slate-100 rounded-xl border border-slate-300 font-mono text-[11px] overflow-hidden">
                        <span className="truncate flex-1 text-emerald-800 font-bold">{affiliateReferralLink}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(affiliateReferralLink);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className="bg-white hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg border border-slate-300 transition-colors cursor-pointer shrink-0"
                        >
                          {copied ? "Copied! ✓" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                      Share this link with your clients. Every month when they renew their subscription, 20% commission (৳৯৯৮) will be deposited to your bKash ({bkashNumber || agencyPhone}).
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setPartnerGenerated(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline block mx-auto cursor-pointer"
                >
                  Edit details or switch tier
                </button>
              </div>
            )}

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
