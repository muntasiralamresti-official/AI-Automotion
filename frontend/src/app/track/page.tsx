"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, Search, ArrowRight, Truck, CheckCircle2, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GeneralTrackingPage() {
  const router = useRouter();
  const [orderQuery, setOrderQuery] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    router.push(`/track/${orderQuery.trim().toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Truck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Real-time Courier Delivery Network</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Track Your E-Commerce Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Enter your 7-character Order ID or phone number to check live courier status, assigned rider, and delivery ETA.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleTrack} className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-md space-y-4 max-w-lg mx-auto">
          <div className="relative">
            <Package className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="e.g. ORD-9821"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm font-mono rounded-2xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 uppercase"
            />
          </div>

          <button
            type="submit"
            disabled={!orderQuery.trim()}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Track Parcel</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-xs text-slate-500">
            <span>Try sample order: </span>
            <Link href="/track/ORD-9821" className="font-mono font-bold text-emerald-700 hover:underline">
              ORD-9821 (Out for Delivery)
            </Link>
            <span className="mx-2">•</span>
            <Link href="/track/ORD-9820" className="font-mono font-bold text-emerald-700 hover:underline">
              ORD-9820 (In Transit)
            </Link>
          </div>
        </form>

        {/* Features banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto pt-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Multi-Courier API</span>
            </div>
            <p className="text-slate-500">Synced directly with Steadfast, Pathao & RedX networks.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Rider Contact Info</span>
            </div>
            <p className="text-slate-500">Call your assigned local hub delivery rider directly.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Dropoffs</span>
            </div>
            <p className="text-slate-500">Live SMS & WhatsApp order tracking notifications.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
