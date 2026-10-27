"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OddoLogo from "@/components/OddoLogo";
import { 
  Bot, 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  ShoppingBag,
  Zap,
  Globe2,
  ArrowUpRight
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("asif.sathread@gmail.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  const handleQuickClientLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  const handleQuickAdminLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/admin");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white flex text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* LEFT PANEL: Modern Form (Compact, Clean, High Aesthetic) */}
      <div className="w-full lg:w-[48%] xl:w-[42%] flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-r border-slate-100">
        
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
        <div className="max-w-sm w-full mx-auto my-auto py-8">
          
          <div className="space-y-1.5 mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Sign in to manage your autonomous AI agents & order pipeline.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Email Address</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-700">Password</label>
                <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>{loading ? "Signing In..." : "Sign In to Workspace"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Quick Demo Access Bar (Ultra Clean Redesign) */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                ⚡ Instant Demo Login
              </span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                1-Click Preset
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickClientLogin}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">Store Owner</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">GadgetZone Client Portal</span>
              </button>

              <button
                type="button"
                onClick={handleQuickAdminLogin}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-900 hover:text-white transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-white">Platform Owner</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                </div>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300 block mt-0.5">Super Admin HQ</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline">
              Register store for free
            </Link>
          </div>

        </div>

        {/* Footer Meta info */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit SSL Encrypted</span>
          </div>
          <div>
            <span>Meta Cloud Verified</span>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL: Sleek Creative Showcase (High Tech Dark Glassmorphism) */}
      <div className="hidden lg:flex flex-1 bg-slate-950 text-white relative overflow-hidden flex-col justify-between p-12 xl:p-16">
        
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-grid opacity-20 pointer-events-none" />

        {/* Top Tag */}
        <div className="flex items-center justify-between relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>DIALOSYNC_NEURAL_ENGINE :: ONLINE</span>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            v2.4 Production
          </span>
        </div>

        {/* Centerpiece: Dynamic Live Dialogue & Order Simulation Card */}
        <div className="relative z-10 max-w-md mx-auto my-auto w-full space-y-4">
          
          <div className="text-left mb-6">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Autopilot Social Commerce
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Real-time inbound inquiries automatically converted into courier-ready consignments.
            </p>
          </div>

          {/* Floating Message Card 1 */}
          <div className="glass-capsule-dark rounded-2xl p-4 border border-slate-800/80 space-y-2 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Cloud Inbound
              </span>
              <span className="text-[10px] text-slate-400 font-mono">2s ago</span>
            </div>
            <p className="text-xs text-slate-200 italic">
              &quot;bhaiya black smart watch er dam koto? Dhanmondi te kal delivery pabo?&quot;
            </p>
          </div>

          {/* Floating Message Card 2 (AI Auto-Reply) */}
          <div className="glass-capsule-dark rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/20 space-y-2 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                DialoSync LLM (Bengali & English)
              </span>
              <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-1.5 py-0.2 rounded font-mono">
                1.4s VELOCITY
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              &quot;Yes! In stock for ৳1,490 (COD). Dhanmondi delivery within 24 hours via Steadfast Courier.&quot;
            </p>
          </div>

          {/* Floating Message Card 3 (Auto-Order Dispatched) */}
          <div className="glass-capsule-dark rounded-2xl p-4 border border-slate-800/80 space-y-2 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between text-xs">
              <span className="text-teal-400 font-bold flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                Steadfast Consignment Booked
              </span>
              <span className="text-[10px] font-mono text-emerald-400">#STDFST-786221</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Customer: Tanvir Hasan (Dhanmondi)</span>
              <span className="text-white font-mono font-bold">৳1,550 COD</span>
            </div>
          </div>

        </div>

        {/* Bottom Social Proof Bar */}
        <div className="relative z-10 pt-6 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
          <div>
            <span className="text-white font-bold">140+ brands</span> scaling social sales
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>99.98% Cloud Uptime</span>
          </div>
        </div>

      </div>

    </div>
  );
}
