"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Send, 
  Bot, 
  CheckCheck, 
  Sparkles, 
  RefreshCw, 
  ShoppingBag, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Zap, 
  Mic, 
  Camera, 
  Volume2, 
  ImageIcon,
  Play
} from "lucide-react";
import { playOrderChime } from "@/lib/sound";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  isAudio?: boolean;
  audioDuration?: string;
  transcription?: string;
  isImage?: boolean;
  imageUrl?: string;
  visionDetection?: string;
  isOrderCard?: boolean;
  orderData?: {
    item: string;
    price: string;
    customer: string;
    phone: string;
    location: string;
  };
}

export default function InteractiveChatSimulator() {
  const [platform, setPlatform] = useState<"whatsapp" | "messenger" | "instagram">("whatsapp");
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [orderCount, setOrderCount] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: "1",
      sender: "user",
      text: "Hi! What's the price of the Ultra Watch 9? Is it waterproof and available in stock?",
      time: "10:14 AM",
    },
    {
      id: "2",
      sender: "bot",
      text: "Hello! Yes, the Ultra Watch 9 is fully IP68 waterproof with AMOLED display & Bluetooth calling. Current promotional price is ৳1,490 BDT ($19.90) with a 1-year replacement warranty. We have Black and Silver in stock! Would you like to confirm an order?",
      time: "10:14 AM",
    },
    {
      id: "3",
      sender: "user",
      text: "Do you offer Cash on Delivery? How long does delivery take?",
      time: "10:15 AM",
    },
    {
      id: "4",
      sender: "bot",
      text: "Yes, 100% Cash on Delivery! Inside Dhaka: 24-48 hours (৳60). Outside Dhaka: 2-3 business days (৳120). You inspect the package first before paying the courier.",
      time: "10:15 AM",
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: "📦 Book Order (English)", text: "I'd like to order 1 Black unit. Name: Tanvir Hasan, Phone: 01711-987654, Address: House 12, Road 5, Dhanmondi 27, Dhaka." },
    { label: "🇧🇩 অর্ডার কনফার্ম (বাংলা)", text: "আমি ১টা অর্ডার করতে চাই। নাম: তানভীর হাসান, মোবাইল: ০১৭১১-৯৮৭৬৫৪, ঠিকানা: ধানমন্ডি ২৭, ঢাকা।" },
    { label: "💳 Payment Policy", text: "Do I need to pay any advance delivery charge?" },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      let isOrder = false;
      let extractedOrderData;

      const lower = text.toLowerCase();

      if (lower.includes("order") || lower.includes("অর্ডার") || lower.includes("01711") || lower.includes("dhanmondi") || lower.includes("ধানমন্ডি")) {
        const isBangla = lower.includes("অর্ডার") || lower.includes("ধানমন্ডি");
        replyText = isBangla
          ? "অসংখ্য ধন্যবাদ তানভীর ভাই! আপনার অর্ডারটি গ্রহণ করা হয়েছে। কুরিয়ার পার্টনার Steadfast-এর মাধ্যমে দ্রুত পার্সেল পাঠিয়ে ট্র্যাকিং নম্বর এসএমএস করে দেব।"
          : "Thank you Tanvir! Your order has been recorded and synced with Steadfast Courier. You will receive an SMS with live tracking shortly.";
        
        isOrder = true;
        extractedOrderData = {
          item: "Ultra Watch 9 (Matte Black)",
          price: "৳1,490 + ৳60 (Shipping) = ৳1,550",
          customer: "Tanvir Hasan",
          phone: "01711-987654",
          location: "House 12, Road 5, Dhanmondi 27, Dhaka",
        };
        setOrderCount((prev) => prev + 1);
        playOrderChime(); // Cash Register Chime Sound!
      } else if (lower.includes("advance") || lower.includes("payment") || lower.includes("অগ্রিম")) {
        replyText = "No advance required! We operate on 100% Cash on Delivery (COD). You inspect the package in front of the courier agent before payment.";
      } else {
        replyText = "Understood! Our AI understands complex questions, checks live inventory from your dashboard, and captures customer credentials accurately.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOrderCard: isOrder,
        orderData: extractedOrderData,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  // Feature 1A: Simulate Bengali Voice Message
  const handleSendVoiceNote = () => {
    const audioMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: "Voice message (Bengali speech note)",
      isAudio: true,
      audioDuration: "0:06",
      transcription: "ভাইয়া ব্ল্যাক কালার আল্ট্রা ওয়াচের দাম কত? ধানমন্ডিতে কাল ডেলিভারি পাবো কি?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, audioMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "জি ভাইয়া! Ultra Watch 9 ব্ল্যাক কালার আমাদের স্টকে আছে। অফার প্রাইস ১,৪৯০ টাকা। ধানমন্ডিতে আগামীকালই ক্যাশ অন ডেলিভারিতে পেয়ে যাবেন (চার্জ ৬০ টাকা)। আপনি কি অর্ডার কনফার্ম করতে চান?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1400);
  };

  // Feature 1B: Simulate Product Screenshot / Photo Vision
  const handleSendProductPhoto = () => {
    const photoMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: "bhaiya ei watch ta ki stock e ache? dam koto?",
      isImage: true,
      imageUrl: "/zyncoo-icon.png",
      visionDetection: "Multimodal Vision Analysis: Ultra Watch 9 AMOLED identified (99.8% confidence)",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, photoMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: "ছবি দেখে শনাক্ত করা হয়েছে: এটি আমাদের Ultra Watch 9 মডেল। বর্তমান ডিসকাউন্ট প্রাইস মাত্র ১,৪৯০ টাকা (সাথে ১ বছর রিপ্লেসমেন্ট ওয়ারেন্টি)। ঢাকার ভিতর ২৪ ঘন্টায় ডেলিভারি পাবেন। অর্ডার করতে আপনার নাম, মোবাইল ও ঠিকানা লিখে দিন!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1300);
  };

  const resetChat = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-emerald-200/90 bg-white shadow-2xl shadow-emerald-950/10 overflow-hidden">
      
      {/* Simulator Header Bar */}
      <div className="bg-slate-900 text-white p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        
        {/* Channel Selector */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
            <button
              onClick={() => setPlatform("whatsapp")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                platform === "whatsapp"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>WhatsApp Cloud</span>
            </button>
            <button
              onClick={() => setPlatform("messenger")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                platform === "messenger"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Messenger</span>
            </button>
            <button
              onClick={() => setPlatform("instagram")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                platform === "instagram"
                  ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Instagram DM</span>
            </button>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/70 px-2.5 py-1.5 rounded-lg border border-emerald-800/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Cloud Worker Active</span>
          </div>
        </div>

        {/* Counters & Reset */}
        <div className="flex items-center gap-3">
          <div className="text-xs bg-slate-800/90 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Orders: <strong className="text-white">{orderCount}</strong></span>
          </div>
          <button
            onClick={resetChat}
            className="text-xs text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
            title="Reset Simulation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

      </div>

      {/* Chat Messages Body */}
      <div 
        className={`p-4 sm:p-6 h-[400px] overflow-y-auto space-y-4 ${
          platform === "whatsapp" 
            ? "bg-[#e5ddd5]/30 bg-[radial-gradient(#10b981_0.75px,transparent_0.75px)] [background-size:16px_16px]" 
            : "bg-slate-50/70"
        }`}
      >
        <div className="text-center my-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full shadow-2xs">
            <Zap className="w-3 h-3 text-emerald-600" />
            Live Zyncoo Simulator • Test Voice Notes & Product Photos below
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 sm:p-4 text-sm leading-relaxed shadow-2xs transition-all ${
                msg.sender === "user"
                  ? platform === "whatsapp"
                    ? "bg-[#dcf8c6] text-slate-800 rounded-tr-xs"
                    : platform === "instagram"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-xs"
                    : "bg-blue-600 text-white rounded-tr-xs"
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-md shadow-emerald-950/5"
              }`}
            >
              {/* Bot Header */}
              {msg.sender === "bot" && (
                <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-emerald-700">
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zyncoo AI Agent</span>
                  <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-1 rounded">24/7 Autonomous</span>
                </div>
              )}

              {/* Special Feature 1A: Audio Voice Note Rendering */}
              {msg.isAudio && (
                <div className="space-y-2 mb-1.5">
                  <div className="flex items-center gap-3 bg-emerald-800/20 p-2.5 rounded-xl border border-emerald-600/30">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 h-4">
                        <span className="w-1 bg-emerald-700 h-2 rounded-full"></span>
                        <span className="w-1 bg-emerald-700 h-3.5 rounded-full"></span>
                        <span className="w-1 bg-emerald-700 h-2 rounded-full"></span>
                        <span className="w-1 bg-emerald-700 h-4 rounded-full"></span>
                        <span className="w-1 bg-emerald-700 h-2.5 rounded-full"></span>
                        <span className="w-1 bg-emerald-700 h-3 rounded-full"></span>
                        <span className="w-1 bg-emerald-700 h-1.5 rounded-full"></span>
                        <span className="w-1 bg-emerald-700 h-3 rounded-full"></span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-900 font-bold mt-0.5 block">
                        Voice Note ({msg.audioDuration})
                      </span>
                    </div>
                  </div>
                  <div className="p-2 bg-white/80 rounded-lg text-xs text-slate-700 border border-emerald-200/70">
                    <span className="text-[10px] font-bold text-emerald-700 block uppercase tracking-wider">
                      🎙️ Transcribed via Whisper AI:
                    </span>
                    &quot;{msg.transcription}&quot;
                  </div>
                </div>
              )}

              {/* Special Feature 1B: Image Vision Rendering */}
              {msg.isImage && (
                <div className="space-y-2 mb-1.5">
                  <div className="w-40 h-28 relative rounded-xl overflow-hidden border border-slate-300 shadow-xs bg-slate-100 flex items-center justify-center">
                    <Image
                      src={msg.imageUrl || "/zyncoo-icon.png"}
                      alt="Uploaded product photo"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg text-[11px] text-emerald-900 border border-emerald-200">
                    <span className="font-bold flex items-center gap-1 text-emerald-800">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Multimodal Vision AI:
                    </span>
                    {msg.visionDetection}
                  </div>
                </div>
              )}

              {/* Standard text */}
              {!msg.isAudio && <p className="whitespace-pre-line">{msg.text}</p>}

              {/* Order Confirmation Card preview */}
              {msg.isOrderCard && msg.orderData && (
                <div className="mt-3 p-3 bg-emerald-50/90 border border-emerald-300 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5">
                    <span className="font-bold text-emerald-950 flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                      Order Captured (#ORD-7429)
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Volume2 className="w-3 h-3" />
                      Cha-Ching!
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700">
                    <div><strong>Item:</strong> {msg.orderData.item}</div>
                    <div><strong>Total:</strong> {msg.orderData.price}</div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <strong>Customer:</strong> {msg.orderData.customer} ({msg.orderData.phone})
                    </div>
                    <div className="flex items-center gap-1 sm:col-span-2">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <strong>Address:</strong> {msg.orderData.location}
                    </div>
                  </div>
                  <div className="pt-1 text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Automatically routed to Steadfast Courier consignment queue.
                  </div>
                </div>
              )}

              <div
                className={`flex items-center justify-end gap-1 text-[10px] mt-1.5 ${
                  msg.sender === "user"
                    ? platform === "whatsapp"
                      ? "text-slate-500"
                      : "text-blue-100"
                    : "text-slate-400"
                }`}
              >
                <span>{msg.time}</span>
                {msg.sender === "user" && <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl w-fit shadow-xs">
            <Bot className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
            <span className="font-medium text-emerald-700">Zyncoo is typing...</span>
            <span className="flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Preset Action Bar with Voice & Photo Simulator Buttons */}
      <div className="bg-slate-50 p-2.5 sm:p-3 border-t border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          
          {/* Feature 1A Button */}
          <button
            onClick={handleSendVoiceNote}
            className="shrink-0 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-700" />
            <span>🎙️ Test Voice Note (বাংলা)</span>
          </button>

          {/* Feature 1B Button */}
          <button
            onClick={handleSendProductPhoto}
            className="shrink-0 bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-purple-700" />
            <span>📸 Test Photo Vision</span>
          </button>

          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt.text)}
              className="shrink-0 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300 hover:border-emerald-300 px-3 py-1.5 rounded-full font-medium transition-colors shadow-2xs cursor-pointer"
            >
              {prompt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask a question or type order details (e.g. 'Can I get 1 watch delivered to Dhaka?')..."
          className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-slate-800"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isTyping}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white p-2.5 sm:px-5 sm:py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
        >
          <span className="hidden sm:inline">Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
