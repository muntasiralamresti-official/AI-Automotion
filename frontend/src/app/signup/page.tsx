"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OddoLogo from "@/components/OddoLogo";
import { 
  Bot, 
  ArrowRight, 
  Store, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Zap,
  ShoppingBag,
  MessageSquare
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState<"starter" | "growth" | "enterprise">("growth");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white flex text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* LEFT PANEL: Form */}
      <div className="w-full lg:w-[50%] xl:w-[45%] flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-r border-slate-100 overflow-y-auto">
        
        {/* Brand Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <OddoLogo className="w-9 h-9 group-hover:scale-105 transition-all" />
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                oddo<span className="text-emerald-600">.ai</span>
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                PRO
              </span>
            </div>
          </Link>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto my-auto py-8">
          
          <div className="space-y-1.5 mb-7">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create your store workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Start your 7-day risk-free pilot. Deploy your AI sales agent in 2 minutes.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Store / Brand Name</label>
                <div className="relative">
                  <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. TrendyWear BD"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Owner Full Name</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Tanvir Hasan"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">WhatsApp / Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01711-000000"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tanvir@brand.com"
                    className="w-full pl-10 pr-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-2xs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Set Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Plan Selector */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-slate-700">Select Trial Plan</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPlan("starter")}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    plan === "starter"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="text-xs">Starter</div>
                  <div className="text-[10px] text-slate-500">৳2,490/mo</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan("growth")}
                  className={`p-2.5 rounded-xl border text-center relative transition-all cursor-pointer ${
                    plan === "growth"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-bold">
                    Popular
                  </span>
                  <div className="text-xs">Growth Pro</div>
                  <div className="text-[10px] text-slate-500">৳4,990/mo</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan("enterprise")}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    plan === "enterprise"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="text-xs">Enterprise</div>
                  <div className="text-[10px] text-slate-500">৳9,990/mo</div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 mt-3 cursor-pointer"
            >
              <span>{loading ? "Initializing Workspace..." : "Activate 7-Day Free Pilot"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="text-center text-xs text-slate-500 mt-6">
            Already registered?{" "}
            <Link href="/login" className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline">
              Sign In to workspace
            </Link>
          </div>

        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>No Credit Card Required</span>
          </div>
          <div>
            <span>Cancel Anytime</span>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL: Showcase */}
      <div className="hidden lg:flex flex-1 bg-slate-950 text-white relative overflow-hidden flex-col justify-between p-12 xl:p-16">
        
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-grid opacity-20 pointer-events-none" />

        <div className="flex items-center justify-between relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>DIALOSYNC_NETWORK</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Meta Cloud Verified
          </span>
        </div>

        <div className="relative z-10 max-w-md mx-auto my-auto w-full space-y-6">
          <div className="space-y-2">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Onboard in 2 Minutes
            </span>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Start Closing Orders on Social DMs 24/7.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connect your Facebook Page & WhatsApp number, feed your product catalog, and let autonomous AI agents handle customer inquiries and address verification while you sleep.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Native understanding of Bengali, Banglish & English</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct Steadfast & RedX Courier consignment generation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>1-Click human takeover whenever you want to step in</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
          <div>
            100% Cloud Server • Zero Downtime
          </div>
          <div className="text-emerald-400 font-semibold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>&lt; 2s Reply Velocity</span>
          </div>
        </div>

      </div>

    </div>
  );
}
