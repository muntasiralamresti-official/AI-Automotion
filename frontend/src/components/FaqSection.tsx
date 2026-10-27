"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need to keep a PC or laptop turned on 24/7?",
      a: "No! DialoSync runs natively on dedicated cloud server workers. Even if your laptop, phone, or home internet is completely turned off, our AI infrastructure continues listening and replying to inbound customers 24/7/365 without interruption.",
    },
    {
      q: "How does DialoSync handle regional languages like Bengali & Banglish?",
      a: "DialoSync utilizes fine-tuned localized LLM pipelines that fluently parse English, standard Bengali, and phonetic Banglish (e.g., 'bhaiya delivery charge koto?'). The AI replies naturally with warm, professional phrasing tailored to social commerce etiquette.",
    },
    {
      q: "How do orders sync to my fulfillment team or courier?",
      a: "As soon as the customer provides their name, verified 11-digit mobile number, and shipping address, the order instantly logs into your Client Dashboard. With built-in integrations for Steadfast, RedX, and Pathao, you can push orders to your courier in a single click.",
    },
    {
      q: "What happens if a customer asks something out of scope or requests a human?",
      a: "The platform features an automated 'Human Takeover' safety fallback. If a customer demands a supervisor or asks about custom negotiations, the AI politely notifies the customer that a senior representative is connecting, and triggers an instant sound and push notification in your dashboard.",
    },
    {
      q: "Is there any risk of Facebook Page or WhatsApp bans?",
      a: "Zero risk. DialoSync strictly uses official Meta Graph APIs and Meta Official WhatsApp Cloud APIs. We do not use unofficial scrapers or hacky browser extensions that trigger Meta security flags.",
    },
    {
      q: "Can I update product prices, stocks, or shipping rules anytime?",
      a: "Yes! Your Client Portal includes a real-time 'Knowledge Base' interface. Simply update product prices, add new items, or tweak discount codes, and the AI agent updates its internal context within seconds.",
    },
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            Everything you need to know about deploying your autonomous sales agent.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left bg-white hover:bg-slate-50 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
