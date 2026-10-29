"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, LayoutDashboard, Menu, X, Flame, Truck } from "lucide-react";
import ZyncooLogo from "./ZyncooLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Sleek Top Announcement Strip */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-emerald-900/40">
        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>
          ⚡ <strong>Zyncoo AI Engine 2.4:</strong> Autonomous sales automation & verified B2B e-commerce lead packs
        </span>
        <span className="hidden md:inline text-emerald-400 font-semibold">• 7-Day Free Pilot</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-17">
            
            {/* Brand Logo - Zyncoo AI */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <ZyncooLogo className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-105 transition-transform duration-200 shrink-0" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 whitespace-nowrap">
                    zyncoo<span className="text-emerald-600">.ai</span>
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border border-emerald-200 uppercase tracking-widest shrink-0">
                    PRO
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase -mt-0.5 whitespace-nowrap hidden sm:block">
                  AI AUTOMATION & LEADS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Clean, No-Wrap, Perfectly Aligned) */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs xl:text-[13px] font-semibold text-slate-600 whitespace-nowrap">
              <a 
                href="#features" 
                className="hover:text-emerald-600 transition-colors whitespace-nowrap py-1"
              >
                Features
              </a>

              <a 
                href="#case-study" 
                className="hover:text-emerald-600 transition-colors flex items-center gap-1 text-slate-700 whitespace-nowrap py-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Case Study</span>
              </a>

              <a 
                href="#rto-audit" 
                className="hover:text-amber-800 transition-colors text-amber-700 font-bold flex items-center gap-1.5 whitespace-nowrap py-1"
              >
                <span>RTO Audit</span>
                <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded-md font-black shrink-0 leading-none">
                  FREE
                </span>
              </a>

              <a 
                href="#leads" 
                className="hover:text-rose-700 transition-colors text-emerald-700 font-bold flex items-center gap-1.5 whitespace-nowrap py-1"
              >
                <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
                <span>Buy Leads</span>
                <span className="bg-rose-100 text-rose-700 text-[9px] px-1.5 py-0.5 rounded-md font-black shrink-0 leading-none">
                  HOT
                </span>
              </a>

              <a 
                href="#pricing" 
                className="hover:text-emerald-600 transition-colors whitespace-nowrap py-1"
              >
                Packages
              </a>

              <Link 
                href="/affiliate" 
                className="hover:text-emerald-600 transition-colors text-slate-700 whitespace-nowrap py-1"
              >
                White-Label
              </Link>

              <Link 
                href="/track" 
                className="hover:text-emerald-600 transition-colors text-slate-600 flex items-center gap-1 whitespace-nowrap py-1"
              >
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span>Track</span>
              </Link>
            </nav>

            {/* Desktop Action Buttons (Visible at lg:flex) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0 whitespace-nowrap">
              <Link
                href="/login"
                className="hidden xl:inline-block px-2.5 py-2 text-xs xl:text-[13px] font-semibold text-slate-600 hover:text-emerald-700 transition-colors whitespace-nowrap"
              >
                Log In
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-[13px] font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 transition-all shadow-2xs whitespace-nowrap"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Dashboard</span>
              </Link>
              
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs xl:text-[13px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-600/20 hover:shadow-md hover:shadow-emerald-600/30 transition-all whitespace-nowrap"
              >
                <span>Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>

            {/* Mobile / Tablet Menu Bar Controls (Visible at < lg) */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/dashboard"
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 flex items-center gap-1"
              >
                <LayoutDashboard className="w-3 h-3 text-emerald-600" />
                <span>Portal</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
            >
              Capabilities & Features
            </a>
            <a
              href="#case-study"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50/70 rounded-lg flex items-center justify-between"
            >
              <span>🌙 3:00 AM Midnight Case Study</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-black px-1.5 py-0.5 rounded-md">PROOF</span>
            </a>
            <a
              href="#rto-audit"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-amber-800 bg-amber-50 rounded-lg flex items-center justify-between"
            >
              <span>🔥 Free Store RTO Leakage Audit</span>
              <span className="text-[10px] bg-amber-200 text-amber-900 font-black px-1.5 py-0.5 rounded-md">FREE</span>
            </a>
            <a
              href="#leads"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-rose-700 bg-rose-50 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-rose-600" />
                <span>Buy Verified E-Commerce Leads</span>
              </span>
              <span className="text-[10px] bg-rose-200 text-rose-900 font-black px-1.5 py-0.5 rounded-md">HOT PACKS</span>
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
            >
              Packages & Pricing
            </a>
            <Link
              href="/affiliate"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50 rounded-lg"
            >
              👑 Agency White-Label (৳3,010 Margin)
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 rounded-lg"
            >
              🚚 Track Live Parcel
            </Link>
            
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                <span>Launch Client Dashboard</span>
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
              >
                <span>Start 7-Day Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
