"use client";

import { useState } from "react";
import { 
  Users, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Phone, 
  Database, 
  Target, 
  Sparkles,
  ShoppingBag,
  Building,
  Check,
  X
} from "lucide-react";

interface LeadPack {
  id: string;
  name: string;
  badge?: string;
  targetAudience: string;
  leadsCount: string;
  priceBDT: number;
  regularPriceBDT: number;
  popular?: boolean;
  features: string[];
  sampleFormat: string;
}

const leadPacks: LeadPack[] = [
  {
    id: "pack-500",
    name: "500 Niche Buyer Leads",
    targetAudience: "Fashion, Gadgets, Beauty & Single-Category Stores",
    leadsCount: "500 ভেরিফাইড ক্রেতা",
    priceBDT: 2490,
    regularPriceBDT: 3500,
    features: [
      "৫০০ জন রিসেন্ট অনলাইন অ্যাক্টিভ ক্রেতার মোবাইল নম্বর",
      "ক্যাটাগরি ফিল্টার: Fashion / Gadget / Skincare / Kids",
      "১০০% ১১-ডিজিট ক্লিন ও সচল নম্বর (Zero Fake)",
      "ডেলিভারি লোকেশন ও থানা সহ কমপ্লিট ডাটা",
      "Zyncoo AI দিয়ে ১-ক্লিকে WhatsApp ব্রডকাস্ট রেডি",
      "এক্সেল ও গুগল শিট ফরম্যাটে ইনস্ট্যান্ট ডেলিভারি",
    ],
    sampleFormat: "Name, Mobile, Category, Thana, District",
  },
  {
    id: "pack-1500",
    name: "1,500 VIP Buyer Leads + AI Script",
    badge: "Most Popular • Best ROI ⭐",
    targetAudience: "Scaling E-Commerce Brands Seeking Immediate Sales",
    leadsCount: "১,৫০০ প্রিমিয়াম ক্রেতা",
    priceBDT: 5990,
    regularPriceBDT: 8500,
    popular: true,
    features: [
      "১,৫০০ জন নিয়মিত ক্যাশ-অন-ডেলিভারি রিসিভ করা VIP বায়ার",
      "কোনো ইনভ্যালিড নম্বর থাকলে ১০০% ইনস্ট্যান্ট রিপ্লেসমেন্ট গ্যারান্টি",
      "Zyncoo AI স্পেশাল ৩-স্টেপ হোয়াটসঅ্যাপ সেলস স্ক্রিপ্ট ফ্রি",
      "গড় কনভার্সন রেট: ১৫% - ২৫% (মিনিমাম ২২৫+ নতুন অর্ডার)",
      "প্রতি লিড খরচ মাত্র ৳৩.৯৯ টাকা (ফেসবুক অ্যাডের চেয়ে ৫ গুণ সস্তা)",
      "VIP ডেডিকেটেড একাউন্ট ম্যানেজার সাপোর্ট",
    ],
    sampleFormat: "Name, Mobile, Last Order Niche, City, Purchase Frequency",
  },
  {
    id: "pack-b2b",
    name: "1,000+ B2B Merchant Database",
    badge: "For Agencies & Wholesalers",
    targetAudience: "Digital Agencies, Software Companies & Wholesalers",
    leadsCount: "১,০০০+ ফেসবুক শপ ওনার্স",
    priceBDT: 8990,
    regularPriceBDT: 14000,
    features: [
      "বাংলাদেশে সক্রিয় ১,০০০+ ফেসবুক পেজ ওনার ও ই-কমার্স উদ্যোক্তা",
      "পেজের নাম, ক্যাটাগরি, ওনারের ডিরেক্ট পার্সোনাল হোয়াটসঅ্যাপ নম্বর",
      "যারা নিয়মিত কুরিয়ার (Steadfast/Pathao) দিয়ে পার্সেল পাঠান",
      "এজেন্সি সার্ভিস, হোলসেল প্রোডাক্ট বা সফটওয়্যার বিক্রির জন্য পারফেক্ট",
      "হাই-রেসপন্স B2B কোল্ড আউটরিচ স্ক্রিপ্ট সহ",
      "১০০% এক্সক্লুসিভ ও লাইভ-ভেরিফাইড ডাটাবেজ",
    ],
    sampleFormat: "Page Name, Owner WhatsApp, Category, Monthly Parcels, Courier",
  },
];

export default function LeadGenSection() {
  const [selectedPack, setSelectedPack] = useState<LeadPack | null>(null);
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerPhone, setBuyerPhone] = useState<string>("");
  const [nicheCategory, setNicheCategory] = useState<string>("Fashion & Clothing");
  const [paymentMethod, setPaymentMethod] = useState<string>("bKash");
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);

  const handleOpenModal = (pack: LeadPack) => {
    setSelectedPack(pack);
    setOrderCompleted(false);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone || !selectedPack) return;
    setOrderCompleted(true);
  };

  return (
    <section id="leads" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 via-rose-50/20 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-black shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>High-Converting Leads Store • ভেরিফাইড লিডস কিনুন</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
            ফেসবুক অ্যাডে টাকা নষ্ট না করে <br />
            <span className="text-rose-600">১০০% ভেরিফাইড ক্রেতা ও মার্চেন্ট লিড</span> কিনুন
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            কোল্ড ট্রাফিকে প্রতি মেসেজে ৳২০-৳৩০ খরচ না করে সরাসরি রিয়েল কাস্টমার ও একটিভ ই-কমার্স উদ্যোক্তাদের ভেরিফাইড ডাটা সংগ্রহ করুন। Zyncoo AI দিয়ে ১-ক্লিকে হোয়াটসঅ্যাপে সেলস ক্লোজ করুন।
          </p>
        </div>

        {/* Lead Packs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {leadPacks.map((pack) => (
            <div
              key={pack.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pack.popular
                  ? "bg-white border-2 border-rose-500 shadow-2xl shadow-rose-600/15 scale-100 lg:-translate-y-2"
                  : "bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:shadow-md"
              }`}
            >
              {pack.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-amber-600 text-white text-[11px] font-black px-4 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{pack.badge}</span>
                </div>
              )}

              <div>
                <div className="mb-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {pack.targetAudience}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    {pack.name}
                  </h3>
                  <div className="inline-block mt-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold font-mono">
                    ✓ {pack.leadsCount}
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-100">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 font-mono">
                    ৳{pack.priceBDT.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    ৳{pack.regularPriceBDT.toLocaleString()}
                  </span>
                  <span className="text-[10px] bg-rose-100 text-rose-700 font-extrabold px-1.5 py-0.5 rounded-md">
                    SAVE {Math.round(((pack.regularPriceBDT - pack.priceBDT) / pack.regularPriceBDT) * 100)}%
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    প্যাকেজে অন্তর্ভুক্ত সুবিধাসমূহ:
                  </span>
                  {pack.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="rounded-full bg-rose-100 p-0.5 text-rose-600 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => handleOpenModal(pack)}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pack.popular
                      ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/30 hover:scale-[1.02]"
                      : "bg-slate-900 hover:bg-rose-600 text-white"
                  }`}
                >
                  <span>অর্ডার করুন (ইনস্ট্যান্ট ডেলিভারি)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-2.5 text-center text-[11px] text-slate-400">
                  ⚡ অর্ডার করার ৩০ মিনিটের মধ্যে Excel ফাইল ডেলিভারি
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Lead Quality & Guarantee Banner */}
        <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">১০০% ভেরিফাইড ও রিপ্লেসমেন্ট গ্যারান্টি</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                আমাদের প্রতিটি নম্বর অ্যাক্টিভ এবং সাম্প্রতিক সময়ে কেনাকাটা করা। কোনো নম্বরে সমস্যা পেলে ইনস্ট্যান্ট রিপ্লেসমেন্ট প্রদান করা হবে।
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/8801700000000?text=${encodeURIComponent("Hello Zyncoo Team! I want to buy custom targeted leads for my e-commerce brand. Please send details.")}`}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 font-bold text-xs flex items-center gap-2 shrink-0 transition-all"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>কাস্টম ক্যাটাগরি লিড চান? হোয়াটসঅ্যাপে কথা বলুন</span>
          </a>
        </div>

      </div>

      {/* Checkout / Lead Order Modal */}
      {selectedPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            
            <button
              onClick={() => setSelectedPack(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderCompleted ? (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    Lead Order Confirmation
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    {selectedPack.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-black text-rose-600 font-mono">
                      ৳{selectedPack.priceBDT.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      ({selectedPack.leadsCount})
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">আপনার নাম / পেজের নাম</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Trendy BD বা Tanvir Ahmed"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">হোয়াটসঅ্যাপ নম্বর (যেখানে লিডস ফাইল পাবেন)</label>
                    <input
                      type="tel"
                      required
                      placeholder="01700-000000"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-rose-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">আপনার টার্গেটেড প্রোডাক্ট ক্যাটাগরি</label>
                    <select
                      value={nicheCategory}
                      onChange={(e) => setNicheCategory(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-rose-500 bg-white"
                    >
                      <option value="Fashion & Clothing">Women & Men Fashion / Clothing</option>
                      <option value="Gadgets & Smartwatches">Gadgets, Watches & Mobile Accessories</option>
                      <option value="Beauty & Cosmetics">Cosmetics, Skincare & Perfumes</option>
                      <option value="Kids & Baby Products">Kids Clothing, Toys & Baby Care</option>
                      <option value="Organic & Health Food">Organic Food, Honey & Groceries</option>
                      <option value="B2B E-Commerce Owners">B2B E-Commerce Page Owners (Active Sellers)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">পেমেন্ট মেথড বেছে নিন</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("bKash")}
                        className={`p-2.5 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                          paymentMethod === "bKash"
                            ? "bg-pink-50 border-pink-500 text-pink-700"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        bKash Personal / Merchant
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("Nagad")}
                        className={`p-2.5 rounded-xl border font-bold text-center cursor-pointer transition-all ${
                          paymentMethod === "Nagad"
                            ? "bg-orange-50 border-orange-500 text-orange-700"
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        Nagad / Bank Transfer
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!buyerName || !buyerPhone}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white font-black rounded-xl shadow-lg shadow-rose-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
                >
                  <span>অর্ডার কনফার্ম করুন (৳{selectedPack.priceBDT.toLocaleString()})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-2 animate-in fade-in">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900">অর্ডার সফলভাবে গ্রহণ করা হয়েছে!</h4>
                  <p className="text-xs text-slate-600">
                    ধন্যবাদ <strong>{buyerName}</strong>! আপনার <strong>{selectedPack.name}</strong> এর অর্ডার কনফার্ম হয়েছে।
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">প্যাকেজ:</span>
                    <span className="font-bold text-slate-900">{selectedPack.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">মোট টাকা:</span>
                    <span className="font-black text-rose-600 font-mono">৳{selectedPack.priceBDT.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">টার্গেটেড ক্যাটাগরি:</span>
                    <span className="font-semibold text-slate-800">{nicheCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ডেলিভারি হোয়াটসঅ্যাপ:</span>
                    <span className="font-mono font-bold text-slate-900">{buyerPhone}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/8801700000000?text=${encodeURIComponent(`Hello Zyncoo Team! I just ordered "${selectedPack.name}" (৳${selectedPack.priceBDT.toLocaleString()}) for my store "${buyerName}". Category: ${nicheCategory}. My WhatsApp: ${buyerPhone}. Please send bKash payment number and deliver the leads file.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp-এ পেমেন্ট নাম্বার ও ফাইল বুঝে নিন</span>
                  </a>

                  <button
                    onClick={() => setSelectedPack(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    উইন্ডো বন্ধ করুন
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
