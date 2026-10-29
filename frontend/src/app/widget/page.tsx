"use client";

import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { Sparkles, Copy, Check, ExternalLink, Code2 } from "lucide-react";
import ZyncooLogo from "@/components/ZyncooLogo";

export default function WidgetDemoPage() {
  const [copied, setCopied] = useState(false);
  const [brandColor, setBrandColor] = useState("#10b981");
  const [storeName, setStoreName] = useState("GadgetZone BD");
  const [greeting, setGreeting] = useState("আসসালামু আলাইকুম! Zyncoo AI-তে আপনাকে স্বাগতম। কীভাবে সাহায্য করতে পারি?");

  const snippet = `<script 
  src="${typeof window !== "undefined" ? window.location.origin : "https://zyncoo.ai"}/zyncoo-widget.js" 
  data-store="${storeName}" 
  data-color="${brandColor}"
  data-greeting="${greeting}"
  async>
</script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <ZyncooLogo className="w-9 h-9" />
            <span className="font-black text-lg text-white tracking-tight">Zyncoo AI Widget</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <span>← Back to Dashboard</span>
          </Link>
        </div>

        {/* Hero */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Universal 1-Line Embeddable Web Chat</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            যেকোনো ওয়েবসাইটে মাত্র ১ লাইনের কোড বসিয়ে লাইভ এআই চ্যাট চালু করুন
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            WordPress, Shopify, custom PHP বা যেকোনো HTML ওয়েবসাইটে নিচের স্ক্রিপ্টটি বসিয়ে দিলেই স্বয়ংক্রিয়ভাবে ডান কোণায় Zyncoo AI চ্যাটবাবল চালু হয়ে যাবে। নিচের ডান কোণায় দেখুন লাইভ প্রিভিউ কাজ করছে!
          </p>
        </div>

        {/* Configuration Controls */}
        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl border border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Client / Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Widget Brand Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Initial Greeting Message</label>
            <input
              type="text"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>HTML Embed Code (ওয়েবসাইটের &lt;body&gt; ট্যাগে পেস্ট করুন)</span>
            </div>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Embed Code"}</span>
            </button>
          </div>

          <pre className="p-4 bg-slate-900/90 rounded-xl text-emerald-300 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
            {snippet}
          </pre>
        </div>

        {/* Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-400">১. ওয়ার্ডপ্রেস (WordPress)</div>
            <p className="text-slate-400">
              WPCode প্লাগইন দিয়ে বা `footer.php` ফাইলে কোডটি পেস্ট করে সেভ করুন।
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-400">২. শপিফাই (Shopify)</div>
            <p className="text-slate-400">
              Online Store &gt; Themes &gt; Edit Code &gt; `theme.liquid` ফাইলের `&lt;/body&gt;` এর ঠিক আগে বসান।
            </p>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-400">৩. কাস্টম ওয়েবসাইট</div>
            <p className="text-slate-400">
              React, Next.js, Laravel বা সাধারণ HTML সাইটের প্রধান লেআউটে স্ক্রিপ্ট ট্যাগটি যোগ করুন।
            </p>
          </div>
        </div>

      </div>

      {/* Live widget script injection on this page */}
      <Script
        id="zyncoo-live-widget"
        src="/zyncoo-widget.js"
        data-store={storeName}
        data-color={brandColor}
        data-greeting={greeting}
        strategy="lazyOnload"
      />
    </div>
  );
}
