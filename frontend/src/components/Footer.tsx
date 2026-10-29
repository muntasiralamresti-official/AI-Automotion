"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import ZyncooLogo from "./ZyncooLogo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <ZyncooLogo className="w-9.5 h-9.5" />
              <span className="font-extrabold text-2xl tracking-tight text-white">
                zyncoo<span className="text-emerald-500">.ai</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              The premier autonomous conversational infrastructure for social commerce. Engineered for high-conversion sales across WhatsApp, Messenger & Instagram.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Meta API Verified</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>WhatsApp Cloud Ready</span>
              </span>
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">WhatsApp Conversational AI</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Messenger Order Engine</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Autonomous Address Extraction</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Courier API Dispatch</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Smart Lead Bank CRM</a></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#interactive-demo" className="hover:text-emerald-400 transition-colors">Live AI Simulator</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#roi" className="hover:text-emerald-400 transition-colors">ROI Calculator</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Plans & Pricing</a></li>
              <li>
                <Link href="/track" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold">
                  <span>Track Live Order</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold">
                  <span>Affiliate Partner (20%)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold">
                  <span>Client Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-slate-300 flex items-center gap-1 font-medium text-xs">
                  <span>Super Admin HQ</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Enterprise & Support</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+880 1700-000000 (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>support@zyncoo.ai</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Zyncoo AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
            <Link href="/privacy#security" className="hover:text-slate-400">Security Architecture</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
