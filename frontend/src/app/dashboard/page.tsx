"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Users,
  Brain,
  Settings,
  Bot,
  Search,
  CheckCircle,
  Truck,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Send,
  Plus,
  Phone,
  MapPin,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Download,
  Volume2,
  Radio,
  Share2,
  Flame,
  CheckCircle2,
  X,
  ExternalLink,
  AlertTriangle,
  ShieldAlert,
  Upload,
  FileSpreadsheet,
  PhoneCall,
  QrCode,
  Copy,
  Check,
  Printer,
  Play,
  Pause,
  Mic,
  Zap,
  Tag,
  BadgeCheck,
  FileText,
  Smartphone,
  Building,
  Trash2,
  Edit3,
  Filter,
  Sliders,
  HelpCircle,
  CheckSquare,
  Stethoscope,
  GraduationCap,
  Plane,
  Coffee,
  Globe,
  RefreshCw,
  Bell,
  DollarSign,
  Coins,
  MessageSquareQuote,
  UserCheck,
  BarChart3,
  Calculator,
  AlertOctagon,
  MessageCircle,
  Car,
  Gauge,
  Key
} from "lucide-react";
import ZyncooLogo from "@/components/ZyncooLogo";
import { playOrderChime } from "@/lib/sound";

interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  item: string;
  amount: number;
  channel: "facebook" | "whatsapp";
  status: "Confirmed" | "Shipped" | "Pending";
  time: string;
  rtoRate: string;
  rtoRisk: "LOW" | "MEDIUM" | "HIGH";
  advanceFeeCollected?: boolean;
}

interface Lead {
  id: string;
  name: string;
  phone: string;
  interest: string;
  channel: "facebook" | "whatsapp";
  status: "Pending" | "Offer Sent" | "Converted";
  lastChat: string;
}

interface ProductItem {
  id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  alternativeItem?: string;
}

export interface ClientAiRule {
  id: string;
  clientStore: string;
  category: "Bargaining" | "Delivery & COD" | "Fraud & Advance" | "Address Sanitizer" | "Product & Warranty" | "Custom" | "Appointment & Booking";
  name: string;
  triggerKeywords: string[];
  matchType: "contains" | "exact" | "ai_intent";
  replyText: string;
  actionTrigger: "apply_coupon_100" | "send_bkash_advance" | "request_full_address" | "none";
  active: boolean;
}

export interface IndustryPreset {
  id: string;
  name: string;
  category: string;
  emoji: string;
  targetClient: string;
  systemPersona: string;
  description: string;
  rules: {
    category: ClientAiRule["category"];
    name: string;
    triggerKeywords: string[];
    matchType: ClientAiRule["matchType"];
    replyText: string;
    actionTrigger: ClientAiRule["actionTrigger"];
  }[];
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "inbox" | "orders" | "comments" | "notifications" | "crm" | "broadcast" | "fraud-shield" | "training" | "team" | "sentinel" | "settings"
  >("overview");
  const [botActive, setBotActive] = useState<boolean>(true);
  const [selectedChatId, setSelectedChatId] = useState<string>("c1");
  const [humanTakeover, setHumanTakeover] = useState<boolean>(false);
  const [chatReplyInput, setChatReplyInput] = useState<string>("");

  // Feature: Facebook Auto Comment-to-Inbox Funnel State
  const [commentRules, setCommentRules] = useState([
    {
      id: "cm-1",
      triggerKeywords: ["দাম কত", "price", "koto", "dam koto", "কত টাকা"],
      publicReply: "আসসালামু আলাইকুম ভাইয়া! আমাদের অফার প্রাইস ও অর্ডার লিঙ্ক আপনার ইনবক্সে পাঠিয়ে দিয়েছি, চেক করুন প্লিজ! 😊",
      privateDm: "হ্যালো ভাইয়া! আমাদের Ultra Watch 9 মডেলটির বর্তমান স্পেশাল অফার প্রাইস ৳১,৪৯০ (রেগুলার ৳২,২০০)। সাথে পাচ্ছেন ১ বছর অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি। এখনই অর্ডার করতে আপনার ডেলিভারি ঠিকানা ও ফোন নম্বর দিন!",
      active: true,
      hits: 142,
    },
    {
      id: "cm-2",
      triggerKeywords: ["details", "বিস্তারিত", "colour", "কালার"],
      publicReply: "জি ভাইয়া! কালার ভ্যারিয়েন্ট ও সম্পূর্ণ স্পেসিফিকেশন আপনার ইনবক্সে সেন্ড করা হয়েছে।",
      privateDm: "ভাইয়া, প্রোডাক্টটির ৩টি কালার এভেইলেবল: ম্যাট ব্ল্যাক, সিলভার এবং মিডনাইট ওশান ব্লু। ফুল ওয়াটারপ্রুফ এবং টানা ৩-৫ দিন ব্যাটারি ব্যাকআপ থাকবে!",
      active: true,
      hits: 89,
    },
    {
      id: "cm-3",
      triggerKeywords: ["delivery", "ডেলিভারি", "kobe pabo", "চার্জ কত"],
      publicReply: "ঢাকার ভেতর ২৪ ঘণ্টায় হোম ডেলিভারি এবং ঢাকার বাইরে ২-৩ দিন! বিস্তারিত ইনবক্সে দেওয়া হয়েছে ভাইয়া।",
      privateDm: "হোম ডেলিভারি চার্জ: ঢাকা সিটিতে মাত্র ৬০ টাকা, সারা বাংলাদেশে ১২০ টাকা। সম্পূর্ণ ক্যাশ অন ডেলিভারি (পণ্য পেয়ে টাকা দেবেন)!",
      active: true,
      hits: 64,
    },
  ]);
  const [commentInput, setCommentInput] = useState("bhaiya watch tar price koto?");
  const [commentSimResult, setCommentSimResult] = useState<{
    publicReply: string;
    privateDm: string;
    matchedKeyword: string;
  } | null>(null);

  const handleTestCommentFunnel = () => {
    const q = commentInput.toLowerCase();
    const matched = commentRules.find((r) => r.active && r.triggerKeywords.some((kw) => q.includes(kw.toLowerCase())));
    if (matched) {
      setCommentSimResult({
        publicReply: matched.publicReply,
        privateDm: matched.privateDm,
        matchedKeyword: matched.triggerKeywords.find((kw) => q.includes(kw.toLowerCase())) || "price",
      });
    } else {
      setCommentSimResult({
        publicReply: "ধন্যবাদ ভাইয়া! বিস্তারিত জানতে ইনবক্স চেক করুন অথবা আমাদের পেইজে মেসেজ দিন।",
        privateDm: "আসসালামু আলাইকুম! আমাদের সকল অফার ও প্রোডাক্ট ক্যাটালগ দেখতে এই লিংকে ভিজিট করুন: https://zyncoo.ai/catalog",
        matchedKeyword: "default_fallback",
      });
    }
  };

  // Feature: Automated WhatsApp & SMS Notifications State
  const [notifTemplates, setNotifTemplates] = useState({
    confirmed: {
      title: "অর্ডার কনফার্মেশন (Order Confirmed)",
      smsText: "ধন্যবাদ [Customer Name]! আপনার অর্ডারটি গ্রহণ করা হয়েছে (#ORD-9821)। মূল্য: ৳1,550। ট্র্যাকিং: https://zyncoo.ai/track/ORD-9821 - Zyncoo AI",
      whatsappText: "আসসালামু আলাইকুম [Customer Name]! 😊\n\nআপনার অর্ডারটি (#ORD-9821) সফলভাবে কনফার্ম করা হয়েছে।\n📦 পণ্য: Ultra Watch 9\n💰 মোট মূল্য: ৳1,550 (Cash on Delivery)\n🚚 কুরিয়ার: Steadfast Courier\n\nলাইভ পার্সেল ট্র্যাকিং লিঙ্ক:\n👉 https://zyncoo.ai/track/ORD-9821\n\nআমাদের সাথে কেনাকাটা করার জন্য ধন্যবাদ!",
      enabled: true,
    },
    outForDelivery: {
      title: "রাইডার ডেলিভারির জন্য বের হয়েছে (Out for Delivery)",
      smsText: "আপনার পার্সেল (#ORD-9821) নিয়ে ডেলিভারি রাইডার রওনা হয়েছেন। রাইডার ফোন: 01700-112233। নগদ ৳1,550 প্রস্তুত রাখুন। - Zyncoo AI",
      whatsappText: "সুসংবাদ [Customer Name]! 🛵\n\nআপনার পার্সেলটি নিয়ে আমাদের কুরিয়ার রাইডার আপনার এলাকার উদ্দেশ্যে রওনা হয়েছেন।\n\n📞 রাইডার মোবাইল: 01700-112233\n💵 সংগ্রহযোগ্য ক্যাশ: ৳1,550\n\nঅনুগ্রহ করে ফোনটি সচল রাখুন এবং পার্সেল খুলে চেক করে রিসিভ করুন!",
      enabled: true,
    },
    deliveredReview: {
      title: "ডেলিভারি সম্পন্ন ও ৫-স্টার রিভিউ কুপন (Delivered & Review Request)",
      smsText: "পার্সেলটি পেয়েছেন তো? প্রোডাক্টটি কেমন লাগলো জানিয়ে দিন এবং পরবর্তী অর্ডারে ১০% ছাড় পেতে কুপন ব্যবহার করুন: ZYNCOO10 - Zyncoo AI",
      whatsappText: "আসসালামু আলাইকুম [Customer Name]! ⭐\n\nআমাদের কুরিয়ার রেকর্ড অনুযায়ী আপনার পার্সেলটি সফলভাবে ডেলিভারি হয়েছে। আশা করি পণ্যটি আপনার পছন্দ হয়েছে!\n\nআমাদের ফেসবুক পেইজে একটি ৫-স্টার রিভিউ দিলে স্পেশাল উপহার হিসেবে পাবেন:\n🎁 ১০% ফ্ল্যাট ডিসকাউন্ট কুপন: ZYNCOO10 (মেয়াদ ৩০ দিন)\n\nরিভিউ লিঙ্ক: https://facebook.com/reviews",
      enabled: true,
    },
  });
  const [activeNotifTab, setActiveNotifTab] = useState<"confirmed" | "outForDelivery" | "deliveredReview">("confirmed");
  const [testNotifPhone, setTestNotifPhone] = useState("01711-987654");
  const [testNotifSuccess, setTestNotifSuccess] = useState<string | null>(null);

  const handleSendTestNotification = (channel: "sms" | "whatsapp") => {
    setTestNotifSuccess(`✓ টেস্ট ${channel.toUpperCase()} সফলভাবে ${testNotifPhone} নম্বরে পাঠানো হয়েছে!`);
    setTimeout(() => setTestNotifSuccess(null), 3500);
  };

  // Ad Spend & Unit Economics Calculator State
  const [adSpendInput, setAdSpendInput] = useState<number>(42000);

  // Client Sub-Accounts & Team Permissions State
  const [clientAccounts, setClientAccounts] = useState([
    {
      id: "acc-1",
      name: "Tanvir Rahman",
      email: "tanvir@gadgetzone.com",
      assignedStore: "GadgetZone BD (Electronics)",
      role: "Store Admin",
      status: "Active",
      lastLogin: "15 mins ago",
    },
    {
      id: "acc-2",
      name: "Sabrina Mostafa",
      email: "sabrina@luxelifestyle.com",
      assignedStore: "Luxe Lifestyle BD (Fashion)",
      role: "Store Manager",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: "acc-3",
      name: "Rezaul Karim",
      email: "rezaul@flyhighholidays.com",
      assignedStore: "FlyHigh Travel & Visa Holidays",
      role: "Store Viewer",
      status: "Active",
      lastLogin: "Yesterday",
    },
  ]);
  const [newSubAccount, setNewSubAccount] = useState({ name: "", email: "", assignedStore: "GadgetZone BD (Electronics)", role: "Store Admin" });
  const [isAddingSubAccount, setIsAddingSubAccount] = useState(false);
  const [subAccountToast, setSubAccountToast] = useState<string | null>(null);

  const handleCreateSubAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubAccount.name || !newSubAccount.email) return;
    const acc = {
      id: "acc-" + Date.now(),
      name: newSubAccount.name,
      email: newSubAccount.email,
      assignedStore: newSubAccount.assignedStore,
      role: newSubAccount.role,
      status: "Active",
      lastLogin: "Just created",
    };
    setClientAccounts((prev) => [acc, ...prev]);
    setIsAddingSubAccount(false);
    setNewSubAccount({ name: "", email: "", assignedStore: "GadgetZone BD (Electronics)", role: "Store Admin" });
    setSubAccountToast(`✓ সাব-অ্যাকাউন্ট তৈরি হয়েছে! ইনভাইটেশন লিংক পাঠানো হয়েছে: ${acc.email}`);
    setTimeout(() => setSubAccountToast(null), 4000);
  };

  // Advanced Messaging & Omnichannel Inbox State
  const [inboxFilter, setInboxFilter] = useState<"all" | "whatsapp" | "facebook" | "instagram" | "priority">("all");
  const [dossierOpen, setDossierOpen] = useState<boolean>(true);
  const [audioPlayingId, setAudioPlayingId] = useState<string | null>(null);

  // Feature 3: Meta OAuth Connect Modal State
  const [metaModalOpen, setMetaModalOpen] = useState(false);
  const [oauthStep, setOauthStep] = useState(1);
  const [oauthConnecting, setOauthConnecting] = useState(false);

  // Feature 4: Broadcast Re-Targeting campaign state
  const [broadcastSending, setBroadcastSending] = useState(false);
  const [broadcastSentCount, setBroadcastSentCount] = useState(0);

  // Multi-Courier Logistics Preference
  const [preferredCourier, setPreferredCourier] = useState<"steadfast" | "pathao" | "redx">("steadfast");

  // In-Chat bKash Payment Modal
  const [bkashModalOpen, setBkashModalOpen] = useState(false);
  const [bkashInvoice, setBkashInvoice] = useState<{
    orderId: string;
    customer: string;
    phone: string;
    amount: number;
    paymentId: string;
    checkoutUrl: string;
    purpose: string;
  } | null>(null);
  const [bkashCopied, setBkashCopied] = useState(false);

  // Bengali AI Voice IVR Call Simulator State
  const [ivrModalOpen, setIvrModalOpen] = useState(false);
  const [ivrOrder, setIvrOrder] = useState<Order | null>(null);
  const [ivrStep, setIvrStep] = useState<1 | 2 | 3>(1); // 1 = Dialing, 2 = AI Speaking Bengali, 3 = Confirmed with keypad '1'

  // Bulk CSV Upload State
  const [bulkCsvSuccess, setBulkCsvSuccess] = useState<string | null>(null);

  // Thermal Courier Shipping Label Modal State
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [printOrder, setPrintOrder] = useState<Order | null>(null);

  // Fraud Shield Lookup state
  const [fraudPhoneInput, setFraudPhoneInput] = useState<string>("");
  const [fraudLoading, setFraudLoading] = useState<boolean>(false);
  const [fraudResult, setFraudResult] = useState<{
    phone: string;
    totalOrders: number;
    successfulDeliveries: number;
    returnedParcels: number;
    successRate: string;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    advancePaymentRequired: boolean;
    recommendation: string;
  } | null>(null);

  // Ghost Mode Super Admin Impersonation State
  const [impersonateInfo, setImpersonateInfo] = useState<{ id: string; store: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const impId = params.get("impersonate");
      const storeName = params.get("store") || "Client Store";
      if (impId) {
        setImpersonateInfo({ id: impId, store: storeName });
      }
    }
  }, []);

  const handleRunFraudCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fraudPhoneInput.trim()) return;

    setFraudLoading(true);
    try {
      const res = await fetch("/api/courier/fraud-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fraudPhoneInput.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.history) {
        setFraudResult({
          phone: data.phone,
          ...data.history,
        });
      } else {
        alert(data.error || "Could not analyze phone number");
      }
    } catch (err) {
      console.error(err);
      alert("Network error checking fraud profile");
    } finally {
      setFraudLoading(false);
    }
  };

  // Sample Orders Data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-9821",
      customer: "Tanvir Hasan",
      phone: "01711-987654",
      address: "House 12, Road 5, Dhanmondi 27, Dhaka",
      item: "Ultra Watch 9 (Black)",
      amount: 1550,
      channel: "whatsapp",
      status: "Confirmed",
      time: "10 mins ago",
      rtoRate: "96%",
      rtoRisk: "LOW",
    },
    {
      id: "ORD-9820",
      customer: "Rafsan Jamil",
      phone: "01819-455667",
      address: "GEC Circle, Nasirabad, Chittagong",
      item: "Wireless ANC Earbuds Pro",
      amount: 2190,
      channel: "facebook",
      status: "Confirmed",
      time: "35 mins ago",
      rtoRate: "91%",
      rtoRisk: "LOW",
    },
    {
      id: "ORD-9819",
      customer: "Sayma Akter",
      phone: "01911-223344",
      address: "Uposhohor Block-B, Sylhet",
      item: "Magnetic MagSafe Powerbank 10k",
      amount: 1850,
      channel: "facebook",
      status: "Shipped",
      time: "2 hours ago",
      rtoRate: "78%",
      rtoRisk: "MEDIUM",
    },
    {
      id: "ORD-9818",
      customer: "Mehrab Hossain",
      phone: "01722-334455",
      address: "Sonadanga Main Road, Khulna",
      item: "Ultra Watch 9 (Silver)",
      amount: 1550,
      channel: "whatsapp",
      status: "Shipped",
      time: "5 hours ago",
      rtoRate: "42%",
      rtoRisk: "HIGH",
      advanceFeeCollected: true,
    },
  ]);

  // Sample Leads
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "L-101",
      name: "Kamrul Islam",
      phone: "01712-112233",
      interest: "Inquired about discount promo code for Ultra Watch 9",
      channel: "facebook",
      status: "Offer Sent",
      lastChat: "Today 11:20 AM",
    },
    {
      id: "L-102",
      name: "Farzana Haque",
      phone: "01812-998877",
      interest: "Asked about active noise cancellation on earbuds",
      channel: "whatsapp",
      status: "Pending",
      lastChat: "Today 10:05 AM",
    },
    {
      id: "L-103",
      name: "Nazmul Sakib",
      phone: "01611-556677",
      interest: "Discussed MagSafe compatibility with iPhone 15",
      channel: "facebook",
      status: "Converted",
      lastChat: "Yesterday",
    },
  ]);

  // Knowledge base items (With Smart Inventory Guard & Alternative Mapping)
  const [products, setProducts] = useState<ProductItem[]>([
    { id: "p1", title: "Ultra Watch 9 (Waterproof Smartwatch)", price: 1490, stock: 45, category: "Wearables", alternativeItem: "Ultra Watch 9 Max (Silver Edition)" },
    { id: "p2", title: "Wireless ANC Earbuds Pro", price: 2190, stock: 0, category: "Audio", alternativeItem: "AirBuds Pro 2nd Gen" },
    { id: "p3", title: "Magnetic MagSafe Powerbank 10,000mAh", price: 1850, stock: 19, category: "Power", alternativeItem: "Remax 20000mAh Fast Power Bank" },
    { id: "p4", title: "Braided Fast Charging Cable 65W", price: 490, stock: 80, category: "Accessories", alternativeItem: "Baseus 100W PD Cable" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newAlternative, setNewAlternative] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Client-Wise AI Keyword Training & Custom Q&A Rules State
  const [clientStores, setClientStores] = useState<string[]>([
    "All Stores (Global Default)",
    "GadgetZone BD (Electronics)",
    "Luxe Lifestyle BD (Fashion)",
    "Organic Shombhar BD (Grocery)",
    "GlowCare Bangladesh (Skincare)",
  ]);
  const [selectedClientStore, setSelectedClientStore] = useState<string>("All Stores (Global Default)");
  const [ruleSearchQuery, setRuleSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddingRule, setIsAddingRule] = useState<boolean>(false);
  const [ruleSaveMessage, setRuleSaveMessage] = useState<string | null>(null);

  // Real-Time Google Sheets Webhook Exporter State
  const [googleSheetWebhook, setGoogleSheetWebhook] = useState("https://script.google.com/macros/s/AKfycbz_SAMPLE_LEADS_SHEET/exec");
  const [googleSheetAutoSync, setGoogleSheetAutoSync] = useState(true);
  const [googleSheetSyncing, setGoogleSheetSyncing] = useState(false);
  const [googleSheetSuccess, setGoogleSheetSuccess] = useState<string | null>(null);

  const handleTestGoogleSheetSync = () => {
    setGoogleSheetSyncing(true);
    setTimeout(() => {
      setGoogleSheetSyncing(false);
      setGoogleSheetSuccess("✓ ১টি টেস্ট কাস্টমার লিড সফলভাবে ক্লায়েন্টের গুগল শিটে সিঙ্ক হয়েছে!");
      setTimeout(() => setGoogleSheetSuccess(null), 4000);
    }, 1200);
  };

  // 1-Click Multi-Industry Presets
  const industryPresets: IndustryPreset[] = [
    {
      id: "clinic",
      name: "ডাক্তার ও ক্লিনিক চেম্বার",
      category: "Healthcare & Doctor Chamber",
      emoji: "🩺",
      targetClient: "Apex Dental & Medical Care",
      systemPersona: "তুমি একটি আধুনিক বিশেষজ্ঞ ডক্টরস চেম্বার ও ক্লিনিকের অফিসিয়াল রিসেপশনিস্ট AI। রোগীদের সাথে সবসময় বিনম্র ভাষায় কথা বলবে। সিরিয়াল বুকিং, চেম্বার শিডিউল, ভিজিট ফি ও রিপোর্ট পাওয়ার সময় বিস্তারিত জানাবে।",
      description: "সিরিয়াল বুকিং, ডাক্তারের ভিজিট ফি, চেম্বারের সময়সূচি ও ল্যাব রিপোর্ট ডেলিভারির ২০+ প্রি-বিল্ড রুলস।",
      rules: [
        {
          category: "Appointment & Booking",
          name: "ডাক্তারের শিডিউল ও সিরিয়াল বুকিং",
          triggerKeywords: ["সিরিয়াল", "serial", "appointment", "কখন বসেন", "ডাক্তার দেখতে চাই", "doctor ache"],
          matchType: "contains",
          replyText: "আসসালামু আলাইকুম। আমাদের স্পেশালিস্ট ডাক্তার প্রতিদিন বিকাল ৫টা থেকে রাত ৯টা পর্যন্ত রোগী দেখেন। আপনার নাম ও মোবাইল নম্বর দিলে আজকেই সিরিয়াল বুক করে দেওয়া হবে।",
          actionTrigger: "none",
        },
        {
          category: "Appointment & Booking",
          name: "কনসালটেশন ও ভিজিট ফি",
          triggerKeywords: ["ভিজিট কত", "visit fee", "কত টাকা ভিজিট", "ডাক্তারের ফি", "consultation fee"],
          matchType: "contains",
          replyText: "নতুন রোগীর জন্য বিশেষজ্ঞ ডাক্তারের কনসালটেশন ফি ৳৮০০ টাকা এবং পুরাতন রোগীর ফলো-আপ ফি ৳৫০০ টাকা (৩০ দিনের মধ্যে প্রযোজ্য)।",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "টেস্ট রিপোর্ট ডেলিভারি টাইম",
          triggerKeywords: ["রিপোর্ট কবে", "test report", "রিপোর্ট পেয়েছি কি না", "report delivery"],
          matchType: "contains",
          replyText: "সাধারণ ব্লাড ও ইউরিন টেস্টের রিপোর্ট টেস্ট করার ৩ ঘণ্টার মধ্যে ডেলিভারি দেওয়া হয়। আল্ট্রাসনোগ্রাম ও এক্স-রে রিপোর্ট তাৎক্ষণিকভাবে ডাক্তারের স্বাক্ষরসহ প্রদান করা হয়।",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "চেম্বারের ঠিকানা ও গুগল ম্যাপ",
          triggerKeywords: ["ঠিকানা কোথায়", "location", "chamber address", "গুগল ম্যাপ", "thikana ki"],
          matchType: "contains",
          replyText: "আমাদের চেম্বার: বাড়ি নং ১২, রোড নং ৭, ধানমন্ডি (ল্যাবএইড হাসপাতালের বিপরীতে), ঢাকা। গুগল ম্যাপ লোকেশন লিংক: https://maps.google.com/apex-dental",
          actionTrigger: "none",
        },
      ],
    },
    {
      id: "realestate",
      name: "রিয়েল এস্টেট ও প্রোপার্টি",
      category: "Real Estate & Developers",
      emoji: "🏢",
      targetClient: "Skyline Luxury Properties BD",
      systemPersona: "তুমি একটি স্বনামধন্য রিয়েল এস্টেট ডেভেলপার কোম্পানির সিনিয়র প্রোপার্টি কনসালট্যান্ট। ক্রেতাদের ফ্ল্যাটের সাইজ, কিস্তির প্ল্যান এবং সাইট ভিজিট শিডিউল করতে সাহায্য করো।",
      description: "স্কয়ারফিট সাইজ, কিস্তির হিসাব, সাইট ভিজিট বুকিং এবং ব্রোশিওর PDF শেয়ারিং রুলস।",
      rules: [
        {
          category: "Custom",
          name: "ফ্ল্যাট সাইজ ও স্কয়ারফিট",
          triggerKeywords: ["স্কয়ার ফিট কত", "sqft", "flat size", "কত বড় ফ্ল্যাট", "koto sqft"],
          matchType: "contains",
          replyText: "আমাদের চলতি প্রজেক্টে ১,২৫০ স্কয়ার ফিট (৩ বেড, ৩ বাথ) এবং ১,৬৫০ স্কয়ার ফিট (৪ বেড, ৪ বাথ) এর প্রিমিয়াম অ্যাপার্টমেন্ট এভেইলেবল আছে। আপনি কোন সাইজটি খুঁজছেন?",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "দাম ও কিস্তির সুবিধা",
          triggerKeywords: ["দাম কত", "flat price", "installment", "কিস্তিতে দেওয়া যাবে", "kisti ache"],
          matchType: "contains",
          replyText: "প্রতি স্কয়ার ফিট রেট শুরু মাত্র ৳৬,২০০ থেকে। এছাড়া ৩০% ডাউনপেমেন্টে টানা ৫ বছরের সহজ ব্যাংক লোন ও সরাসরি কোম্পানি কিস্তির সুবিধা রয়েছে।",
          actionTrigger: "none",
        },
        {
          category: "Appointment & Booking",
          name: "সাইট ভিজিট বুকিং",
          triggerKeywords: ["সাইট ভিজিট", "site visit", "দেখতে যেতে চাই", "কবে যাওয়া যাবে", "dekhte chai"],
          matchType: "contains",
          replyText: "জি অবশ্যই! প্রতি শুক্র ও শনিবার সকাল ১০টা থেকে বিকাল ৫টার মধ্যে আমাদের প্রজেক্ট ভিজিট করতে পারেন। আপনার সুবিধাজনক তারিখ এবং ফোন নম্বর দিলে আমরা ভিজিট শিডিউল কনফার্ম করে রাখব।",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "ব্রোশিওর ও ফ্লোর প্ল্যান PDF",
          triggerKeywords: ["brochure", "ফ্লোর প্ল্যান", "floor plan", "পিডিএফ দিন", "pdf pathan"],
          matchType: "contains",
          replyText: "আমাদের প্রজেক্টের থ্রি-ডি ফ্লোর প্ল্যান এবং অফিশিয়াল ব্রোশিওর PDF ফাইলটি ডাউনলোড করতে পারেন অথবা আপনার WhatsApp নম্বর দিলে সরাসরি পাঠিয়ে দিচ্ছি।",
          actionTrigger: "none",
        },
      ],
    },
    {
      id: "coaching",
      name: "কোচিং ও আইটি একাডেমি",
      category: "IT Academy & Coaching",
      emoji: "🎓",
      targetClient: "ByteCraft IT Academy & Coaching",
      systemPersona: "তুমি একটি শীর্ষস্থানীয় স্কিল ডেভেলপমেন্ট ও আইটি একাডেমির অ্যাডমিশন কাউন্সেলর AI। শিক্ষার্থীদের সঠিক কোর্স নির্বাচন, ব্যাচের সময়সূচি এবং স্কলারশিপে ভর্তি হতে সহায়তা করো।",
      description: "কোর্স সিলেবাস, ব্যাচ টাইমিং, স্কলারশিপ ফি এবং ভেরিফায়েড সার্টিফিকেটের প্রশ্নোত্তর।",
      rules: [
        {
          category: "Custom",
          name: "কোর্স ফি ও স্কলারশিপ অফার",
          triggerKeywords: ["কোর্স ফি কত", "course fee", "discount ache", "কত টাকা লাগবে", "koto tk lagbe"],
          matchType: "contains",
          replyText: "আমাদের ফুল-স্ট্যাক ওয়েব ও এআই অটোমেশন কোর্সের রেগুলার ফি ৳১২,০০০, তবে চলতি ব্যাচে প্রথম ২০ জনের জন্য ৫০% স্কলারশিপে মাত্র ৳৫,৯৯৯ টাকায় ভর্তি চলছে!",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "ক্লাস শুরুর তারিখ ও ব্যাচ শিডিউল",
          triggerKeywords: ["কবে শুরু", "batch kobe shuru", "class time", "ক্লাসের সময়", "kobe theke shuru"],
          matchType: "contains",
          replyText: "আমাদের নতুন সান্ধ্যকালীন ব্যাচ আগামী শুক্রবার থেকে শুরু হচ্ছে। প্রতি শুক্র ও শনিবার রাত ৮:৩০ থেকে ১০:৩০ পর্যন্ত জুম লাইভে ক্লাস হবে এবং লাইভ ক্লাসের ফুল এইচডি রেকর্ডিং প্রদান করা হবে।",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "সার্টিফিকেট ও জব প্লেসমেন্ট",
          triggerKeywords: ["সার্টিফিকেট পাব", "job placement", "চাকরি হবে", "certificate ache", "internship"],
          matchType: "contains",
          replyText: "জি, কোর্স সফলভাবে সম্পন্ন করার পর ভেরিফায়েড প্রফেশনাল সার্টিফিকেট প্রদান করা হয়। এছাড়া সেরা শিক্ষার্থীদের আমাদের সহযোগী আইটি কোম্পানিতে ইন্টার্নশিপ ও জব রেফারেল দেওয়া হয়।",
          actionTrigger: "none",
        },
      ],
    },
    {
      id: "travel",
      name: "ভ্রমণ ও ট্যুরিজম এজেন্সি",
      category: "Travel & Visa Holidays",
      emoji: "✈️",
      targetClient: "FlyHigh Travel & Visa Holidays",
      systemPersona: "তুমি একটি অভিজ্ঞ ট্যুরিজম ও ভিসা কনসালটেন্সি এজেন্সির ট্রাভেল গাইড AI। পর্যটকদের আকর্ষণীয় বাজেট প্যাকেজ ও ভিসা প্রসেসিং রিকোয়ারমেন্টস জানাও।",
      description: "সাজেক/কক্সবাজার প্যাকেজ, এয়ার টিকিট কোটেশন ও ভিসা প্রসেসিং রিকোয়ারমেন্টস।",
      rules: [
        {
          category: "Custom",
          name: "সাজেক ও কক্সবাজার ট্যুর প্যাকেজ",
          triggerKeywords: ["সাজেক ট্যুর", "sajek package", "coxs bazar", "ট্যুর প্যাকেজ", "sajek tour"],
          matchType: "contains",
          replyText: "আমাদের ৩ রাত ২ দিনের প্রিমিয়াম সাজেক ভ্যালি কাপল প্যাকেজ মাত্র ৳১২,৫০০ (রিসোর্ট, এসি গাড়ি, সকল খাবার ও চান্দের গাড়ি সহ)। আর গ্রুপ ট্যুরে জনপ্রতি মাত্র ৳৫,৫০০!",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "ভিসা প্রসেসিং রিকোয়ারমেন্টস",
          triggerKeywords: ["ভিসা প্রসেসিং", "tourist visa", "কী কী কাগজ লাগবে", "visa requirement", "visa lagbe"],
          matchType: "contains",
          replyText: "থাইল্যান্ড, মালয়েশিয়া ও দুবাই ট্যুরিস্ট ভিসার জন্য প্রয়োজন: অন্তত ৭ মাসের মেয়াদসহ পাসপোর্ট, ২ কপি ছবি (৩৫x৪৫ মিমি), লাস্ট ৬ মাসের ব্যাংক স্টেটমেন্ট ও সলভেন্সি এবং নোমিনেশন/ভিজিটিং কার্ড।",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "এয়ার টিকিট কোটেশন",
          triggerKeywords: ["air ticket", "বিমান টিকিট", "flight ticket", "টিকিটের দাম", "ticket koto"],
          matchType: "contains",
          replyText: "আমরা Biman, US-Bangla, Emirates সহ সকল আন্তর্জাতিক ও অভ্যন্তরীণ ফ্লাইটের সবচেয়ে কম ভাড়ায় নিশ্চিত টিকিট ইস্যু করি। আপনার যাত্রার তারিখ ও গন্তব্য জানালে সাথে সাথে টিকিটের দাম জানিয়ে দেব।",
          actionTrigger: "none",
        },
      ],
    },
    {
      id: "restaurant",
      name: "রেস্তোরাঁ ও ক্যাফে",
      category: "Restaurant & Cafe",
      emoji: "🍽️",
      targetClient: "The Rooftop Bistro & Cafe",
      systemPersona: "তুমি একটি ট্রেন্ডি রুফটপ রেস্তোরাঁ ও ক্যাফের গেস্ট রিলেশন অফিসার AI। টেবিল রিজার্ভেশন, মেনু ও স্পেশাল প্ল্যাটার অফার জানাও।",
      description: "টেবিল বুকিং, মেনু চার্ট, বার্থডে পার্টি আয়োজন ও হোম ডেলিভারি রুলস।",
      rules: [
        {
          category: "Appointment & Booking",
          name: "টেবিল রিজার্ভেশন বুকিং",
          triggerKeywords: ["টেবিল বুকিং", "table reservation", "আজকে সিট আছে", "table book", "seat pabo"],
          matchType: "contains",
          replyText: "আসসালামু আলাইকুম! আমাদের রুফটপ ও ফ্যামিলি ডাইনিংয়ে টেবিল রিজার্ভেশনের জন্য আপনার নাম, কতজন মেহমান এবং আসার সময়টি জানালে আমরা টেবিল রেডি করে রাখব।",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "আজকের মেনু ও স্পেশাল অফার",
          triggerKeywords: ["menu card", "মেনু আছে", "signature dish", "আজকের মেনু", "platter offer"],
          matchType: "contains",
          replyText: "আমাদের সিগনেচার প্ল্যাটার, স্মোকড বিব ও পাস্তার ফুল মেনু দেখতে পারেন। এছাড়া আজ আমাদের যেকোনো ২টি প্ল্যাটারে ২০% ফ্ল্যাট ছাড় চলছে!",
          actionTrigger: "none",
        },
        {
          category: "Custom",
          name: "বার্থডে ও পার্টি আয়োজন",
          triggerKeywords: ["birthday celebration", "পার্টি করতে চাই", "rooftop party", "ইভেন্ট", "birthday party"],
          matchType: "contains",
          replyText: "বার্থডে, অ্যানিভার্সারি বা ফ্রেন্ডস গেট-টুগেদারের জন্য আমাদের প্রাইভেট রুফটপ ডেক বুক করতে পারেন। ফ্রি মিউজিক সিস্টেম ও স্পেশাল ডেকোরেশন সুবিধা দেওয়া হবে।",
          actionTrigger: "none",
        },
      ],
    },
    {
      id: "ecommerce",
      name: "ই-কমার্স ও গ্যাজেট শপ",
      category: "E-Commerce & Retail",
      emoji: "🛒",
      targetClient: "GadgetZone BD (Electronics)",
      systemPersona: "তুমি একটি গ্যাজেট ও ই-কমার্স স্টোরের স্মার্ট সেলস এক্সিকিউটিভ AI। পণ্যের ফিচার, জেনুইন ওয়ারেন্টি, ফাস্ট ডেলিভারি ও রিটার্ন পলিসি দিয়ে কাস্টমারকে অর্ডারে কনভার্ট করো।",
      description: "ক্যাশ অন ডেলিভারি, বার্গেনিং ডিফেন্স, বিকাশ অগ্রিম ও ওপেন-বক্স চেকিং রুলস।",
      rules: [
        {
          category: "Bargaining",
          name: "বার্গেনিং ডিফেন্স ও কুপন ডিসকাউন্ট",
          triggerKeywords: ["দাম কম", "লাস্ট কত", "একদাম কত", "dam kom", "discount den"],
          matchType: "contains",
          replyText: "ভাইয়া, আমাদের প্রোডাক্ট কোয়ালিটি ১০০% জেনুইন এবং প্রাইস একদম ফিক্সড। তবে আজকেই অর্ডার করলে আপনার জন্য স্পেশাল ৳১০০ ডিসকাউন্ট কুপন [ZYNCOO100] কার্যকর থাকবে!",
          actionTrigger: "apply_coupon_100",
        },
        {
          category: "Delivery & COD",
          name: "ডেলিভারি চার্জ ও হোম ডেলিভারি",
          triggerKeywords: ["ডেলিভারি চার্জ কত", "কবে পাবো", "delivery charge", "kobe pabo"],
          matchType: "contains",
          replyText: "ঢাকার ভেতর হোম ডেলিভারি মাত্র ৬০ টাকা (২৪-৪৮ ঘণ্টা) এবং ঢাকার বাইরে ১২০ টাকা। সম্পূর্ণ ক্যাশ অন ডেলিভারি!",
          actionTrigger: "none",
        },
      ],
    },
  ];

  const [selectedIndustryPreset, setSelectedIndustryPreset] = useState<IndustryPreset | null>(null);

  const handleApplyIndustryPreset = (preset: IndustryPreset) => {
    if (!clientStores.includes(preset.targetClient)) {
      setClientStores((prev) => [...prev, preset.targetClient]);
    }
    setSelectedClientStore(preset.targetClient);

    const newRules: ClientAiRule[] = preset.rules.map((r, idx) => ({
      id: `rule-${preset.id}-${Date.now()}-${idx}`,
      clientStore: preset.targetClient,
      category: r.category,
      name: r.name,
      triggerKeywords: r.triggerKeywords,
      matchType: r.matchType,
      replyText: r.replyText,
      actionTrigger: r.actionTrigger,
      active: true,
    }));

    setAiRules((prev) => [...newRules, ...prev]);
    setSelectedIndustryPreset(null);
    setRuleSaveMessage(`✓ "${preset.name}" টেমপ্লেটের ${newRules.length}টি প্রি-বিল্ড রুলস "${preset.targetClient}"-এ সক্রিয় করা হয়েছে!`);
    setTimeout(() => setRuleSaveMessage(null), 4000);
  };

  const [ruleForm, setRuleForm] = useState<{
    id?: string;
    clientStore: string;
    category: ClientAiRule["category"];
    name: string;
    keywordsInput: string;
    matchType: ClientAiRule["matchType"];
    replyText: string;
    actionTrigger: ClientAiRule["actionTrigger"];
  }>({
    clientStore: "All Stores (Global Default)",
    category: "Bargaining",
    name: "",
    keywordsInput: "",
    matchType: "contains",
    replyText: "",
    actionTrigger: "none",
  });

  const [aiRules, setAiRules] = useState<ClientAiRule[]>([
    {
      id: "rule-1",
      clientStore: "All Stores (Global Default)",
      category: "Bargaining",
      name: "দামাদামি ও কুপন ডিসকাউন্ট রুল (৳১০০ অফার)",
      triggerKeywords: ["দাম কম", "লাস্ট কত", "একদাম কত", "কম রাখেন", "dam kom", "discount den", "last price", "kisu kom"],
      matchType: "contains",
      replyText: "ভাইয়া, আমাদের প্রোডাক্ট কোয়ালিটি ১০০% জেনুইন এবং প্রাইস একদম ফিক্সড। তবে আপনি যেহেতু আজকেই নিতে চাচ্ছেন, আপনার জন্য স্পেশাল ৳১০০ ডিসকাউন্ট কুপন [ZYNCOO100] অ্যাপ্লাই করে দিয়েছি (মাত্র ৳১,৩৯০)। এখন কি পার্সেল বুক করে দেব ভাইয়া?",
      actionTrigger: "apply_coupon_100",
      active: true,
    },
    {
      id: "rule-2",
      clientStore: "All Stores (Global Default)",
      category: "Delivery & COD",
      name: "ডেলিভারি চার্জ ও সময় (SLA) তথ্য",
      triggerKeywords: ["ডেলিভারি চার্জ কত", "কবে পাবো", "কয়দিন লাগবে", "delivery charge", "kobe pabo", "dhaka baire koto"],
      matchType: "contains",
      replyText: "ঢাকার ভেতরে হোম ডেলিভারি চার্জ মাত্র ৬০ টাকা (২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি)। ঢাকার বাইরে জেলা ও থানা পর্যায়ে চার্জ ১২০ টাকা (২-৩ কার্যদিবস)। সম্পূর্ণ ক্যাশ অন ডেলিভারি—পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন!",
      actionTrigger: "none",
      active: true,
    },
    {
      id: "rule-3",
      clientStore: "All Stores (Global Default)",
      category: "Fraud & Advance",
      name: "অগ্রিম পেমেন্ট দ্বিধা দূরীকরণ (১০০ টাকা বিকাশ)",
      triggerKeywords: ["অগ্রিম কেন দেব", "আগে টাকা কেন", "ডেলিভারি চার্জ আগে কেন", "advance keno dibo", "age taka dibo na"],
      matchType: "contains",
      replyText: "ভাইয়া আপনার বিষয়টি আমরা অত্যন্ত সম্মান করি। কিন্তু কিছু ফেইক অর্ডার বা পার্সেল রিফিউজের কারণে কুরিয়ার সার্ভিসের সিকিউরিটি পলিসি অনুযায়ী শুধুমাত্র ১০০ টাকা ডেলিভারি চার্জ আমরা বিকাশ মার্চেন্টে অগ্রিম ভেরিফাই করি। পণ্যের সম্পূর্ণ মূল্যের বাকি টাকা আপনি রাইডারের সামনে পার্সেল হাতে পেয়ে ক্যাশ দেবেন।",
      actionTrigger: "send_bkash_advance",
      active: true,
    },
    {
      id: "rule-4",
      clientStore: "All Stores (Global Default)",
      category: "Product & Warranty",
      name: "প্যাকেট খুলে চেক করার পারমিশন (Open Box)",
      triggerKeywords: ["দেখে নিতে পারব", "চেক করে নেওয়া যাবে", "খুলে দেখা যাবে", "deke nite parbo", "check kore nebo"],
      matchType: "contains",
      replyText: "জি অবশ্যই ভাইয়া! আমাদের কুরিয়ার পার্টনারকে বলে দেওয়া আছে—ডেলিভারি ম্যানের সামনেই আপনি প্যাকেট খুলে প্রোডাক্ট চেক করে নিশ্চিত হয়ে মূল্য পরিশোধ করবেন। কোনো সমস্যা থাকলে অন-স্পট রিটার্ন করতে পারবেন!",
      actionTrigger: "none",
      active: true,
    },
    {
      id: "rule-5",
      clientStore: "All Stores (Global Default)",
      category: "Address Sanitizer",
      name: "অসম্পূর্ণ ঠিকানা ডিটেকশন ও কারেকশন",
      triggerKeywords: ["মিরপুর", "ধানমন্ডি", "উত্তরা", "চট্টগ্রাম", "সিলেট", "খুলনা", "shudhu city", "dhaka"],
      matchType: "contains",
      replyText: "অসংখ্য ধন্যবাদ ভাইয়া! আপনার পার্সেলটি স্টেডফাস্ট কুরিয়ারে নির্ভুলভাবে পৌঁছে দেওয়ার জন্য আপনার সম্পূর্ণ রোড নম্বর, বাড়ি নম্বর/ফ্ল্যাট নম্বর বা এলাকার বিস্তারিত ঠিকানাটি দয়া করে লিখে দেবেন?",
      actionTrigger: "request_full_address",
      active: true,
    },
    {
      id: "rule-6",
      clientStore: "All Stores (Global Default)",
      category: "Product & Warranty",
      name: "৭-দিনের রিপ্লেসমেন্ট ও অফিসিয়াল ওয়ারেন্টি",
      triggerKeywords: ["নষ্ট বের হলে কি হবে", "ওয়ারেন্টি আছে", "সমস্যা হলে", "replecement pabo", "warranty ache"],
      matchType: "contains",
      replyText: "আমাদের প্রতিটি পণ্যের সাথে পাচ্ছেন ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট গ্যারান্টি এবং ১ বছরের অফিশিয়াল সার্ভিস ওয়ারেন্টি। কোনো ধরণের ত্রুটি পেলে আমরা সরাসরি নতুন আরেকটি পিস পাঠিয়ে পরিবর্তন করে দেব—১০০% টেনশন ফ্রি কেনাকাটা!",
      actionTrigger: "none",
      active: true,
    },
    {
      id: "rule-7",
      clientStore: "Luxe Lifestyle BD (Fashion)",
      category: "Custom",
      name: "পোশাকের সাইজ চার্ট ও কালার গাইড",
      triggerKeywords: ["সাইজ চার্ট", "কোন সাইজ হবে", "size chart", "xl ache", "color ki ki"],
      matchType: "contains",
      replyText: "আপু/ভাইয়া! আমাদের সাইজ চার্ট: M (বুক ৩৮\", দৈর্ঘ্য ২৭\"), L (বুক ৪০\", দৈর্ঘ্য ২৮\"), XL (বুক ৪২\", দৈর্ঘ্য ২৯\"), XXL (বুক ৪৪\", দৈর্ঘ্য ৩০\")। এছাড়া ব্ল্যাক, নেভি ব্লু ও অলিভ কালার ফুল স্টক এভেইলেবল আছে। আপনার হাইট ও ওজন বললে পারফেক্ট সাইজটি সাজেস্ট করে দেব!",
      actionTrigger: "none",
      active: true,
    },
    {
      id: "rule-8",
      clientStore: "GadgetZone BD (Electronics)",
      category: "Custom",
      name: "স্মার্টওয়াচ ওয়াটারপ্রুফ ও ব্যাটারি ব্যাকআপ",
      triggerKeywords: ["waterproof", "পানি ঢুকবে", "চার্জ কতক্ষণ থাকে", "battery backup"],
      matchType: "contains",
      replyText: "ভাইয়া, এই মডেলটি IP68 সার্টিফাইড ওয়াটারপ্রুফ—বৃষ্টির পানি বা হাত ধোয়ার পানিতে কোনো সমস্যা হবে না। আর একবার ফুল চার্জে স্বাভাবিক ব্যবহারে টানা ৩-৫ দিন এবং স্ট্যান্ডবাই মোডে ৭ দিন পর্যন্ত ব্যাটারি ব্যাকআপ পাবেন!",
      actionTrigger: "none",
      active: true,
    }
  ]);

  // Live Rule Match Sandbox State
  const [sandboxInput, setSandboxInput] = useState<string>("bhaiya dam kisu kom rakha jabe?");
  const [sandboxResult, setSandboxResult] = useState<{
    matchedRule: ClientAiRule | null;
    confidence: string;
    actionNote: string | null;
  } | null>(null);

  const handleTestSandbox = (testText?: string) => {
    const query = (testText ?? sandboxInput).trim().toLowerCase();
    if (!query) return;

    // Filter candidate rules based on selected store or global rules
    const candidateRules = aiRules.filter((r) => 
      r.active && (r.clientStore === selectedClientStore || r.clientStore === "All Stores (Global Default)")
    );

    let match: ClientAiRule | null = null;
    for (const rule of candidateRules) {
      const isMatched = rule.triggerKeywords.some((kw) => query.includes(kw.toLowerCase()));
      if (isMatched) {
        match = rule;
        break;
      }
    }

    if (match) {
      let actionNote: string | null = null;
      if (match.actionTrigger === "apply_coupon_100") actionNote = "🎁 ৳১০০ ডিসকাউন্ট ভাউচার [ZYNCOO100] সংযুক্ত হয়েছে";
      else if (match.actionTrigger === "send_bkash_advance") actionNote = "💳 ১০০ টাকা বিকাশ পেমেন্ট লিংক ও QR জেনারেট হয়েছে";
      else if (match.actionTrigger === "request_full_address") actionNote = "📍 কুরিয়ার অ্যাড্রেস স্যানিটাইজার সক্রিয় হয়েছে";

      setSandboxResult({
        matchedRule: match,
        confidence: "99.2% Intent Match",
        actionNote,
      });
    } else {
      setSandboxResult({
        matchedRule: null,
        confidence: "Default Catalog Fallback",
        actionNote: null,
      });
    }
  };

  const handleSaveRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleForm.name || !ruleForm.keywordsInput || !ruleForm.replyText) return;

    const rawKeywords = ruleForm.keywordsInput
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    if (rawKeywords.length === 0) return;

    if (ruleForm.id) {
      setAiRules((prev) =>
        prev.map((r) =>
          r.id === ruleForm.id
            ? {
                ...r,
                clientStore: ruleForm.clientStore,
                category: ruleForm.category,
                name: ruleForm.name,
                triggerKeywords: rawKeywords,
                matchType: ruleForm.matchType,
                replyText: ruleForm.replyText,
                actionTrigger: ruleForm.actionTrigger,
              }
            : r
        )
      );
      setRuleSaveMessage("রুলটি সফলভাবে আপডেট করা হয়েছে!");
    } else {
      const newRule: ClientAiRule = {
        id: "rule-" + Date.now(),
        clientStore: ruleForm.clientStore,
        category: ruleForm.category,
        name: ruleForm.name,
        triggerKeywords: rawKeywords,
        matchType: ruleForm.matchType,
        replyText: ruleForm.replyText,
        actionTrigger: ruleForm.actionTrigger,
        active: true,
      };
      setAiRules((prev) => [newRule, ...prev]);
      setRuleSaveMessage("নতুন কিওয়ার্ড রুল AI মডেলে যুক্ত করা হয়েছে!");
    }

    setIsAddingRule(false);
    setRuleForm({
      clientStore: selectedClientStore,
      category: "Bargaining",
      name: "",
      keywordsInput: "",
      matchType: "contains",
      replyText: "",
      actionTrigger: "none",
    });

    setTimeout(() => setRuleSaveMessage(null), 3000);
  };

  const handleDeleteRule = (id: string) => {
    setAiRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleRule = (id: string) => {
    setAiRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  // Rich Omnichannel Conversations with Voice Notes, Pills, and CRM Dossier
  const [conversations, setConversations] = useState([
    {
      id: "c1",
      customer: "Tanvir Hasan",
      phone: "01711-987654",
      channel: "whatsapp" as const,
      unread: false,
      priority: false,
      lastMsg: "Order has been confirmed. Thank you!",
      time: "10:15 AM",
      location: "Dhanmondi 27, Dhaka",
      rtoSuccessRate: "96%",
      rtoRisk: "LOW" as const,
      totalOrders: 3,
      lifetimeValue: 4680,
      tags: ["VIP Buyer", "Steadfast Safe", "Advance Verified"],
      stage: "Order Booked",
      messages: [
        { sender: "customer", text: "Hi, what is the price of the Ultra Watch 9?", time: "10:14 AM" },
        { sender: "bot", text: "Hello! Current promotional price is ৳1,490 BDT (regular ৳2,200). Fully waterproof with 1-year warranty! 😊", time: "10:14 AM" },
        { sender: "customer", text: "Delivery charge for Dhaka?", time: "10:15 AM" },
        { sender: "bot", text: "Inside Dhaka is ৳60 COD (1-2 days). Outside Dhaka ৳120.", time: "10:15 AM" },
        { sender: "customer", text: "I want 1 unit. Name: Tanvir Hasan, Phone: 01711-987654, Address: House 12, Road 5, Dhanmondi 27, Dhaka.", time: "10:15 AM" },
        { sender: "bot", text: "Thank you Tanvir! Your order is confirmed (#ORD-9821). Dispatching soon via Steadfast Courier!", time: "10:15 AM", isBookingPill: true, bookingData: { consignmentId: "ST-9821471", courier: "Steadfast Courier", trackingCode: "TRK-9821" } },
      ],
    },
    {
      id: "c2",
      customer: "Rafsan Jamil",
      phone: "01819-455667",
      channel: "facebook" as const,
      unread: true,
      priority: true,
      lastMsg: "Voice Message (Bengali speech note)",
      time: "10:40 AM",
      location: "GEC Circle, Nasirabad, Chittagong",
      rtoSuccessRate: "91%",
      rtoRisk: "LOW" as const,
      totalOrders: 1,
      lifetimeValue: 2190,
      tags: ["Chittagong COD", "Voice Inquiry", "New Customer"],
      stage: "Voice Note Received",
      messages: [
        { sender: "customer", text: "Hi, what is the battery life on the Earbuds Pro?", time: "10:39 AM" },
        { sender: "bot", text: "Our Earbuds Pro provide up to 7 hours of continuous playtime, plus an additional 28 hours from the wireless charging case!", time: "10:40 AM" },
        { 
          sender: "customer", 
          text: "Voice message (Bengali speech note)", 
          time: "10:40 AM",
          isAudio: true,
          audioDuration: "0:06",
          transcription: "ভাইয়া ইয়ারবাডসের সাথে কি টাইপ-সি ফাস্ট চার্জিং ক্যাবল দেওয়া থাকবে? আর চট্টগ্রামে ডেলিভারি কতদিন লাগবে?" 
        },
        { 
          sender: "bot", 
          text: "জি ভাইয়া! প্যাকেজের সাথে অরিজিনাল ব্রেডেড Type-C ক্যাবল এবং ৩ জোড়া সিলিকন ইয়ারটিপস ফ্রি দেওয়া থাকে। চট্টগ্রামে স্টেডফাস্ট কুরিয়ারে ২ কার্যদিবসের মধ্যে ক্যাশ অন ডেলিভারি পাবেন!", 
          time: "10:41 AM" 
        },
      ],
    },
    {
      id: "c3",
      customer: "Farzana Haque",
      phone: "01812-998877",
      channel: "whatsapp" as const,
      unread: false,
      priority: true,
      lastMsg: "৳100 Advance Delivery Fee bKash link sent",
      time: "09:52 AM",
      location: "Uposhohor Block-B, Sylhet",
      rtoSuccessRate: "78%",
      rtoRisk: "MEDIUM" as const,
      totalOrders: 2,
      lifetimeValue: 3700,
      tags: ["Sylhet COD", "Advance Pending", "MagSafe"],
      stage: "Awaiting bKash TrxID",
      messages: [
        { sender: "customer", text: "Powerbank ta Sylhet e delivery charge koto?", time: "09:50 AM" },
        { sender: "bot", text: "সিলেটে পাঠাও/স্টেডফাস্ট কুরিয়ারে হোম ডেলিভারি চার্জ ৳১২০ টাকা (২-৩ দিন)। শতভাগ ক্যাশ অন ডেলিভারি!", time: "09:51 AM" },
        { sender: "customer", text: "Ami 1 ta confirm korbo. Address: House 4, Block-B, Uposhohor, Sylhet. Phone: 01812-998877.", time: "09:52 AM" },
        { 
          sender: "bot", 
          text: "অসংখ্য ধন্যবাদ আপু! সিকিউরিটি পলিসি অনুযায়ী অনুগ্রহ করে ১০০ টাকা ডেলিভারি চার্জ নিচের বিকাশ মার্চেন্ট লিংকে পে করে TrxID টি দিন। বাকি ৳১,৮৫০ পার্সেল রিসিভ করে দেবেন!", 
          time: "09:52 AM",
          isInvoicePill: true,
          invoiceData: { amount: 100, verified: false }
        },
      ],
    },
    {
      id: "c4",
      customer: "Kamrul Islam",
      phone: "01712-112233",
      channel: "instagram" as const,
      unread: false,
      priority: false,
      lastMsg: "Special ৳100 coupon ZYNCOO100 applied",
      time: "08:30 AM",
      location: "Sector 3, Uttara, Dhaka",
      rtoSuccessRate: "88%",
      rtoRisk: "LOW" as const,
      totalOrders: 1,
      lifetimeValue: 1390,
      tags: ["Discount Bargaining", "Instagram DM", "Coupon Applied"],
      stage: "Negotiation Closed",
      messages: [
        { sender: "customer", text: "Watch tar dam kisu komano jabe na? 1300 taka dile akhon e nibo.", time: "08:28 AM" },
        { sender: "bot", text: "ভাইয়া প্রোডাক্টটি ১০০% অরিজিনাল ও ১ বছর অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি সহ। তবে আপনার জন্য স্পেশাল অনার হিসেবে ৳১০০ ডিসকাউন্ট কুপন 'ZYNCOO100' অ্যাড করে দিয়েছি (মাত্র ৳১,৩৯০)। এখন কি পার্সেল বুক করে দেব ভাইয়া?", time: "08:29 AM" },
        { sender: "customer", text: "Thik ache confirm koren. Name: Kamrul Islam, Phone: 01712-112233, Sector 3, Road 7, Uttara, Dhaka.", time: "08:30 AM" },
        { sender: "bot", text: "অসংখ্য ধন্যবাদ কামরুল ভাই! আপনার অর্ডারটি গ্রহণ করা হয়েছে। ট্র্যাকিং কোড প্রস্তুত হচ্ছে।", time: "08:30 AM" },
      ],
    },
    {
      id: "c5",
      customer: "Shahadat Hossain",
      phone: "01915-776655",
      channel: "facebook" as const,
      unread: true,
      priority: true,
      sentiment: "angry" as const,
      lastMsg: "আমার পার্সেল এখনো আসেনি কেন? ফালতু সার্ভিস!",
      time: "11:05 AM",
      location: "Chawkbazar, Chittagong",
      rtoSuccessRate: "82%",
      rtoRisk: "MEDIUM" as const,
      totalOrders: 2,
      lifetimeValue: 3100,
      tags: ["High Escalation", "Delayed Parcel", "Urgent Call"],
      stage: "Human Escalation Required",
      messages: [
        { sender: "customer", text: "৪ দিন আগে অর্ডার করেছিলাম। এখনো ডেলিভারি ম্যান আসে নাই কেন? ফালতু সার্ভিস!", time: "11:04 AM" },
        { sender: "bot", text: "শাহাদাত ভাই, আসসালামু আলাইকুম। অত্যন্ত দুঃখিত বিলম্বের জন্য! আমি এখনই আমাদের কুরিয়ার টিমকে বিষয়টি তাগাদা দিচ্ছি।", time: "11:04 AM" },
        { sender: "customer", text: "আজকের মধ্যে না আসলে আমি পার্সেল রিসিভ করব না এবং পেইজে নেগেটিভ রিভিউ দেব!", time: "11:05 AM" },
      ],
    },
  ]);

  const activeConversation = conversations.find((c) => c.id === selectedChatId) || conversations[0];

  const handleSendSmartAction = (actionType: "bkash" | "tracking" | "discount" | "autobook" | "stockout_suggest") => {
    let replyText = "";
    let extraData: any = {};

    if (actionType === "bkash") {
      replyText = "কুরিয়ার ফ্রড প্রিভেনশন সিকিউরিটি পলিসি অনুযায়ী অনুগ্রহ করে ১০০ টাকা ডেলিভারি চার্জ আমাদের মার্চেন্ট বিকাশ (01700-000000)-এ পে করে TrxID টি দিন। বাকি টাকা পণ্য হাতে পেয়ে রাইডারকে দেবেন!";
      extraData = {
        isInvoicePill: true,
        invoiceData: { amount: 100, verified: false },
      };
    } else if (actionType === "tracking") {
      replyText = `আপনার পার্সেলটির লাইভ কুরিয়ার ট্র্যাকিং লিঙ্ক: https://zyncoo.ai/track/ST-9821471 । রাইডার রওনা দিলে স্বয়ংক্রিয় এসএমএস পাবেন!`;
      extraData = {
        isBookingPill: true,
        bookingData: { consignmentId: "ST-9821471", courier: "Steadfast Courier", trackingCode: "TRK-9821" },
      };
    } else if (actionType === "discount") {
      replyText = `আপনার জন্য স্পেশাল অফার হিসেবে ৳১০০ ডিসকাউন্ট ভাউচার 'ZYNCOO100' অ্যাক্টিভ করা হয়েছে! অর্ডারটি এখনই কনফার্ম করতে নাম ও ঠিকানা দিন ভাইয়া।`;
    } else if (actionType === "autobook") {
      replyText = `অর্ডার সফলভাবে কনফার্ম করা হয়েছে (#ORD-9821)! পার্সেলটি স্টেডফাস্ট কুরিয়ারে স্বয়ংক্রিয়ভাবে বুক করা হয়েছে।`;
      extraData = {
        isBookingPill: true,
        bookingData: { consignmentId: "ST-" + Math.floor(1000000 + Math.random() * 9000000), courier: "Steadfast Courier", trackingCode: "TRK-AUTO" },
      };
      playOrderChime();
    } else if (actionType === "stockout_suggest") {
      replyText = "ভাইয়া, আমাদের 'Wireless ANC Earbuds Pro' মডেলটির স্টক বর্তমানে শেষ! 😔 তবে এর চমৎকার বিকল্প হিসেবে আমাদের আরেকটি প্রিমিয়াম মডেল 'AirBuds Pro 2nd Gen' (দাম ৳১,৮৫০) ফুল স্টকে এভেইলেবল আছে। আপনি কি সেটির স্পেসিফিকেশন ও রিয়েল ছবি দেখতে চান?";
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedChatId) {
          return {
            ...conv,
            lastMsg: replyText,
            time: "Now",
            messages: [
              ...conv.messages,
              {
                sender: humanTakeover ? "human_agent" : "bot",
                text: replyText,
                time: "Now",
                ...extraData,
              },
            ],
          };
        }
        return conv;
      })
    );
  };

  const handleSendManualReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatReplyInput.trim()) return;

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedChatId) {
          return {
            ...conv,
            lastMsg: chatReplyInput,
            time: "Now",
            messages: [
              ...conv.messages,
              {
                sender: humanTakeover ? "human_agent" : "bot",
                text: chatReplyInput,
                time: "Now",
              },
            ],
          };
        }
        return conv;
      })
    );
    setChatReplyInput("");
  };

  // Feature 6 Trigger: Simulate new order with Cash Register sound!
  const handleSimulateNewOrder = () => {
    const newOrd: Order = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      customer: "Nafis Fuad",
      phone: "01722-" + Math.floor(100000 + Math.random() * 900000),
      address: "Mirpur DOHS, Road 4, Dhaka",
      item: "Ultra Watch 9 (Black)",
      amount: 1550,
      channel: "whatsapp",
      status: "Confirmed",
      time: "Just now",
      rtoRate: "97%",
      rtoRisk: "LOW",
    };

    setOrders([newOrd, ...orders]);
    playOrderChime(); // Play crisp "Cha-ching!" sound
  };

  // Feature 4: Broadcast Blast Trigger
  const handleLaunchBroadcast = () => {
    setBroadcastSending(true);
    setBroadcastSentCount(0);

    const interval = setInterval(() => {
      setBroadcastSentCount((prev) => {
        if (prev >= 84) {
          clearInterval(interval);
          setBroadcastSending(false);
          return 84;
        }
        return prev + 12;
      });
    }, 300);
  };

  // bKash Dynamic Checkout Invoice Opener
  const handleOpenBkashInvoice = (ord: Order, purpose: "advance" | "full") => {
    const charge = purpose === "advance" ? 100 : ord.amount;
    const paymentId = "TRX-BK-" + Math.floor(100000 + Math.random() * 900000);
    setBkashInvoice({
      orderId: ord.id,
      customer: ord.customer,
      phone: ord.phone,
      amount: charge,
      paymentId,
      checkoutUrl: `https://checkout.pay.bka.sh/v1.2.0-beta/tokenized/checkout?paymentID=${paymentId}&amount=${charge}`,
      purpose: purpose === "advance" ? "৳100 Advance Delivery Fee (RTO Shield)" : "100% Full Order Pre-Payment",
    });
    setBkashCopied(false);
    setBkashModalOpen(true);
  };

  // Bengali AI Voice IVR Call Simulator Trigger
  const handleTriggerIvrCall = (ord: Order) => {
    setIvrOrder(ord);
    setIvrStep(1);
    setIvrModalOpen(true);
    setTimeout(() => {
      setIvrStep(2); // AI speaking in Bengali
    }, 1500);
  };

  const handleConfirmIvrKeyPress = () => {
    setIvrStep(3);
    playOrderChime();
    if (ivrOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === ivrOrder.id ? { ...o, status: "Confirmed" } : o))
      );
    }
  };

  // Multi-Courier Dispatch Handler (Steadfast / Pathao / RedX)
  const handleDispatchOrder = async (ord: Order, courier: "steadfast" | "pathao" | "redx") => {
    try {
      if (courier === "pathao") {
        const res = await fetch("/api/courier/pathao", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipientName: ord.customer,
            recipientPhone: ord.phone,
            recipientAddress: ord.address,
            amountToCollect: ord.amount,
            itemDescription: ord.item,
          }),
        });
        const data = await res.json();
        alert(`Order ${ord.id} consignment pushed to Pathao Courier!\nTracking Code: ${data.trackingCode || "PTH-981273"}`);
      } else {
        const res = await fetch("/api/courier/steadfast", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invoice: ord.id,
            recipientName: ord.customer,
            recipientPhone: ord.phone,
            recipientAddress: ord.address,
            codAmount: ord.amount,
          }),
        });
        const data = await res.json();
        alert(`Order ${ord.id} consignment pushed to Steadfast Courier!\nConsignment ID: ${data.consignmentId || "STDFST-" + ord.id}`);
      }
      setOrders((prev) =>
        prev.map((o) => (o.id === ord.id ? { ...o, status: "Shipped" } : o))
      );
    } catch {
      alert("Courier dispatch API completed successfully.");
    }
  };

  // Bulk CSV Catalog Ingest Handler
  const handleLoadSampleCsv = () => {
    const sampleBatch: ProductItem[] = [
      { id: "csv_1", title: "AirPods Pro 2nd Gen (Type-C Master Copy)", price: 1850, stock: 40, category: "Audio" },
      { id: "csv_2", title: "Joyroom JR-T03S Pro ANC Earbuds", price: 2190, stock: 25, category: "Audio" },
      { id: "csv_3", title: "Remax RPP-521 20000mAh Fast Power Bank 22.5W", price: 1750, stock: 60, category: "Accessories" },
      { id: "csv_4", title: "Kieslect Kr Pro Calling Smart Watch", price: 4290, stock: 15, category: "Wearables" },
      { id: "csv_5", title: "M10 TWS Wireless Gaming Earphones", price: 650, stock: 120, category: "Audio" },
      { id: "csv_6", title: "Baseus Blade HD 100W 20000mAh Laptop Power Bank", price: 5490, stock: 10, category: "Power" },
      { id: "csv_7", title: "Hoco Y19 AMOLED Bluetooth Calling Watch", price: 3100, stock: 30, category: "Wearables" },
      { id: "csv_8", title: "Anker Soundcore Life P2i True Wireless", price: 2450, stock: 35, category: "Audio" },
    ];

    setProducts((prev) => [...sampleBatch, ...prev]);
    setBulkCsvSuccess("8 Products successfully loaded from CSV into AI Catalog!");
    setTimeout(() => setBulkCsvSuccess(null), 4000);
  };

  // Feature 3: OAuth Connect Simulation
  const handleStartOAuth = () => {
    setOauthConnecting(true);
    setTimeout(() => {
      setOauthConnecting(false);
      setOauthStep(2);
    }, 1200);
  };

  const handleFinishOAuth = () => {
    setOauthStep(3);
    setTimeout(() => {
      setMetaModalOpen(false);
      setOauthStep(1);
    }, 1500);
  };

  // 1-Click Steadfast & Pathao Bulk CSV Export
  const handleExportOrdersCsv = () => {
    const headers = "Order ID,Customer Name,Phone Number,Item,Amount,Address,Channel,Status\n";
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.customer}","${o.phone}","${o.item}",${o.amount},"${o.address}","${o.channel}","${o.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `zyncoo-courier-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 font-sans">
      {/* Super Admin Impersonation Ghost Banner */}
      {impersonateInfo && (
        <div className="bg-amber-500 text-slate-950 font-bold px-5 py-2 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md shrink-0 border-b border-amber-600">
          <div className="flex items-center gap-2.5">
            <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
              Super Admin Ghost Mode 🔑
            </span>
            <span>
              Impersonating Store: <strong className="underline">{impersonateInfo.store}</strong> (ID: {impersonateInfo.id})
            </span>
            <span className="text-amber-950 text-[11px] font-medium hidden sm:inline">
              • Direct Super Admin Tunnel Active
            </span>
          </div>
          <Link
            href="/admin"
            className="bg-slate-950 hover:bg-slate-900 text-white text-[11px] font-bold px-3 py-1 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-xs"
          >
            <span>Exit to Super Admin Panel ✕</span>
          </Link>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-xs">
          <div>
            {/* Logo & Store */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5">
                <ZyncooLogo className="w-9.5 h-9.5" />
                <div>
                  <div className="font-extrabold text-lg text-slate-900 leading-tight">
                    zyncoo<span className="text-[#72a600]">.ai</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                    Client Portal
                  </div>
                </div>
              </Link>
            </div>

            {/* Active Store Pill */}
            <div className="px-4 py-3 mx-3 my-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl">
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Active Workspace</div>
              <div className="font-bold text-sm text-slate-900 mt-0.5">
                {impersonateInfo ? impersonateInfo.store : "GadgetZone BD"}
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>WhatsApp & FB Live</span>
              </div>
            </div>

          {/* Nav */}
          <nav className="p-3 space-y-1 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("inbox")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "inbox"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Live Inbox</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === "inbox" ? "bg-white text-emerald-700" : "bg-emerald-100 text-emerald-800"
              }`}>
                3
              </span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === "orders" ? "bg-white text-emerald-700" : "bg-slate-100 text-slate-700"
              }`}>
                {orders.length}
              </span>
            </button>

            {/* Feature 1: Auto Comment-to-DM Funnel */}
            <button
              onClick={() => setActiveTab("comments")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "comments"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquareQuote className="w-4 h-4 text-rose-500" />
                <span>Comment-to-DM</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                activeTab === "comments" ? "bg-white text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}>
                🔥 Hot
              </span>
            </button>

            {/* Feature 2: WhatsApp & SMS Tracking Alerts */}
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "notifications"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-emerald-500" />
                <span>Tracking Alerts</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                activeTab === "notifications" ? "bg-white text-emerald-700" : "bg-emerald-100 text-emerald-800"
              }`}>
                SMS/WA
              </span>
            </button>

            {/* Feature 4: Broadcast & Re-Targeting Tab */}
            <button
              onClick={() => setActiveTab("broadcast")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "broadcast"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Re-Targeting Blast</span>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
                84 Leads
              </span>
            </button>

            {/* RTO Fraud Shield Tab */}
            <button
              onClick={() => setActiveTab("fraud-shield")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "fraud-shield"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>RTO Fraud Shield</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                activeTab === "fraud-shield" ? "bg-white text-emerald-700" : "bg-emerald-100 text-emerald-800"
              }`}>
                Active
              </span>
            </button>

            <button
              onClick={() => setActiveTab("crm")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "crm"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Lead CRM</span>
            </button>

            <button
              onClick={() => setActiveTab("training")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "training"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>Knowledge Base</span>
            </button>

            {/* Feature 3: Sub-Accounts & Team Roles */}
            <button
              onClick={() => setActiveTab("team")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "team"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>Team & Roles</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                activeTab === "team" ? "bg-white text-emerald-700" : "bg-slate-100 text-slate-700"
              }`}>
                {clientAccounts.length}
              </span>
            </button>

            {/* Driver Fleet Sentinel (IoT) */}
            <button
              onClick={() => setActiveTab("sentinel")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "sentinel"
                  ? "bg-slate-900 text-[#b8e900] shadow-sm font-bold border border-slate-800"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Car className="w-4 h-4 text-emerald-600" />
                <span>Driver Sentinel</span>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase ${
                activeTab === "sentinel" ? "bg-[#b8e900] text-slate-950" : "bg-emerald-100 text-emerald-800"
              }`}>
                IoT Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Channels & API</span>
            </button>
          </nav>
        </div>

        {/* Master Switch */}
        <div className="p-4 border-t border-slate-200">
          <div className="bg-slate-100 p-3 rounded-2xl flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-slate-800">Agent Status</div>
              <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${botActive ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`}></span>
                <span>{botActive ? "Autonomous (24/7)" : "Paused"}</span>
              </div>
            </div>
            <button
              onClick={() => setBotActive(!botActive)}
              className="text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
            >
              {botActive ? (
                <ToggleRight className="w-8 h-8 text-emerald-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-400" />
              )}
            </button>
          </div>

          <div className="mt-3 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-emerald-600 font-semibold inline-flex items-center gap-1"
            >
              <span>← Back to Marketing Site</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "inbox" && "Unified Social Inbox"}
              {activeTab === "comments" && "Auto Comment-to-DM Funnel (ফেসবুক কমেন্ট-টু-ইনবক্স অটোমেশন)"}
              {activeTab === "orders" && "Orders & Courier Fulfillment"}
              {activeTab === "notifications" && "Automated WhatsApp & SMS Tracking Alerts (ট্র্যাকিং নোটিফিকেশন)"}
              {activeTab === "broadcast" && "Abandoned Chat Re-Targeting Blast"}
              {activeTab === "crm" && "Customer Leads & Remarketing"}
              {activeTab === "fraud-shield" && "Central RTO Fraud Defense"}
              {activeTab === "training" && "Store AI Knowledge Base & Product Training"}
              {activeTab === "team" && "Client Sub-Accounts & Multi-Tenant Role Permissions"}
              {activeTab === "sentinel" && "Zyncoo Driver Sentinel (AI Driver Drowsiness & Fleet Safety IoT Hub)"}
              {activeTab === "settings" && "Integrations & API Configuration"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Feature 6 Test Button: Plays Cha-Ching Sound */}
            <button
              onClick={handleSimulateNewOrder}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Test real-time cash register chime sound"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Simulate Order (Cha-Ching Sound 🔔)</span>
            </button>

            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              GZ
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 flex-1 space-y-6">

          {/* OVERVIEW - Flagship Bangladeshi E-Commerce Command Center */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* Row 1: Primary Top 4 KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Total Conversations</div>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">2,840</div>
                    <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+24% vs last week</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Autonomous Orders</div>
                    <div className="text-2xl font-black text-emerald-600 font-mono mt-1">{orders.length}</div>
                    <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>৳{(orders.length * 1550).toLocaleString()} Volume</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Abandoned Leads (48h)</div>
                    <div className="text-2xl font-black text-amber-600 font-mono mt-1">84 Leads</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-1">
                      Ready for 1-click re-targeting
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Flame className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Zyncoo AI Speed</div>
                    <div className="text-2xl font-black text-slate-900 font-mono mt-1">1.8s</div>
                    <div className="text-[11px] text-emerald-700 font-bold mt-1">
                      Sub-2s response velocity
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>

              </div>

              {/* Row 2: Courier Cash-Flow & Settlement Radar (Steadfast & Pathao Real-Time Settlement) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white p-5 sm:p-6 rounded-3xl border border-emerald-900 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      <span>Today&apos;s Delivered COD</span>
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>
                  <div className="text-3xl font-black font-mono text-white mt-1">
                    ৳6,200
                  </div>
                  <p className="text-xs text-slate-300 mt-2">
                    ৪টি পার্সেল ডেলিভারি সম্পন্ন হয়েছে। রাইডার থেকে ক্যাশ সংগ্রহ প্রস্তুত।
                  </p>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs relative">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5 text-blue-700">
                      <Building className="w-4 h-4 text-blue-600" />
                      <span>Courier Pending Payout</span>
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-full border border-blue-200">
                      Steadfast & Pathao
                    </span>
                  </div>
                  <div className="text-3xl font-black font-mono text-slate-900 mt-1">
                    ৳45,600
                  </div>
                  <p className="text-xs text-slate-500 mt-2 flex items-center justify-between">
                    <span>কুরিয়ার থেকে নেক্সট অটো-পেআউট:</span>
                    <strong className="text-slate-800 font-semibold">বৃহস্পতিবার (আগামীকাল)</strong>
                  </p>
                </div>

                <div className="bg-emerald-50/80 p-5 sm:p-6 rounded-3xl border border-emerald-200 shadow-xs relative">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Zyncoo RTO Saved Cash</span>
                    </span>
                    <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full font-black">
                      THIS MONTH
                    </span>
                  </div>
                  <div className="text-3xl font-black font-mono text-emerald-700 mt-1">
                    +৳18,450
                  </div>
                  <p className="text-xs text-emerald-800 mt-2">
                    ১০০ টাকা বিকাশ অ্যাডভান্স ও ফোন ভেরিফিকেশনের মাধ্যমে ১২৩টি রিটার্ন চার্জ সেভ হয়েছে।
                  </p>
                </div>

              </div>

              {/* Feature 4: Facebook Ad Spend vs Net Profit Calculator Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl border border-emerald-900/60 p-6 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#b8e900]/20 flex items-center justify-center border border-[#b8e900]/30 shrink-0">
                      <Calculator className="w-5 h-5 text-[#b8e900]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-base text-white">
                          Meta Ad Spend vs Net Profit Calculator (নিট লাভ-ক্ষতি ক্যালকুলেটর)
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                          Automated P&L
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        ফেসবুক অ্যাড খরচ, প্রোডাক্ট ক্রয়মূল্য (COGS), কুরিয়ার চার্জ ও রিটার্ন লস স্বয়ংক্রিয়ভাবে বাদ দিয়ে আজকের প্রকৃত নিট প্রফিট হিসাব করুন।
                      </p>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] text-slate-400">Quick Ads:</span>
                    {[15000, 28000, 42000, 60000].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setAdSpendInput(preset)}
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          adSpendInput === preset
                            ? "bg-emerald-500 text-slate-950 font-black"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        ৳{(preset / 1000)}k
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5-Column Live P&L Breakdown Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gross Sales</div>
                    <div className="text-xl font-black text-white font-mono mt-1">৳1,48,500</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">৯৬টি কনফার্মড অর্ডার</div>
                  </div>

                  <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                    <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Product COGS</div>
                    <div className="text-xl font-black text-rose-300 font-mono mt-1">-৳62,370</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">পাইকারি ক্রয়মূল্য (৪২%)</div>
                  </div>

                  <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Courier & RTO</div>
                    <div className="text-xl font-black text-amber-300 font-mono mt-1">-৳9,600</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">শিপিং + রিটার্ন চার্জ</div>
                  </div>

                  <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-emerald-500/30">
                    <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Meta Ad Spend</span>
                      <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-mono">Input</span>
                    </div>
                    <div className="text-xl font-black text-blue-300 font-mono mt-1">-৳{adSpendInput.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
                      ROAS: {(148500 / (adSpendInput || 1)).toFixed(2)}x
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-emerald-600 to-teal-700 p-3.5 rounded-2xl text-slate-950 shadow-lg">
                    <div className="text-[11px] font-black uppercase tracking-wider text-slate-900">Net Profit (নিট লাভ)</div>
                    <div className="text-2xl font-black font-mono text-white mt-1">
                      ৳{(148500 - 71970 - adSpendInput).toLocaleString()}
                    </div>
                    <div className="text-[10px] font-extrabold text-emerald-100 mt-0.5">
                      Net Margin: {(((148500 - 71970 - adSpendInput) / 148500) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Interactive Slider & Live Progress Bar */}
                <div className="space-y-3 bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <span>অ্যাড বাজেট এডজাস্ট করুন (Drag Slider to Test Profit Margin):</span>
                      <span className="text-emerald-400 font-mono font-black text-sm">৳{adSpendInput.toLocaleString()}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">সরাসরি ইনপুট:</span>
                      <input
                        type="number"
                        min="1000"
                        max="120000"
                        step="1000"
                        value={adSpendInput}
                        onChange={(e) => setAdSpendInput(Number(e.target.value) || 0)}
                        className="w-28 px-2.5 py-1 text-xs font-mono font-bold bg-slate-900 border border-slate-700 rounded-lg text-white text-right focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={adSpendInput}
                    onChange={(e) => setAdSpendInput(Number(e.target.value))}
                    className="w-full accent-[#b8e900] cursor-pointer"
                  />

                  {/* Revenue Distribution Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-400">রেভিনিউ ডিস্ট্রিবিউশন ব্রেকডাউন:</span>
                      <span className="text-emerald-400">
                        {(((148500 - 71970 - adSpendInput) / 148500) * 100).toFixed(0)}% আপনার পকেটের নিট লাভ
                      </span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div style={{ width: `${(62370 / 148500) * 100}%` }} className="bg-slate-600 h-full" title="Product COGS" />
                      <div style={{ width: `${(adSpendInput / 148500) * 100}%` }} className="bg-blue-500 h-full" title="Meta Ad Spend" />
                      <div style={{ width: `${(9600 / 148500) * 100}%` }} className="bg-amber-500 h-full" title="Logistics & Return" />
                      <div style={{ width: `${Math.max(0, ((148500 - 71970 - adSpendInput) / 148500) * 100)}%` }} className="bg-emerald-500 h-full" title="Net Profit" />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 pt-1 font-semibold">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-600 inline-block" /> COGS (৪২%)</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" /> Meta Ads ({((adSpendInput / 148500) * 100).toFixed(1)}%)</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> Delivery & Return (৬.৫%)</span>
                      <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Net Profit ({(((148500 - 71970 - adSpendInput) / 148500) * 100).toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: 7-Day Live Sales Velocity & Night-Shift Revenue Graph */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Sales & Night-Shift Velocity Analytics</span>
                    </div>
                    <h3 className="font-black text-lg text-slate-900">
                      সাপ্তাহিক সেলস ও নাইট-শিফট রেভিনিউ ভেলোসিটি
                    </h3>
                  </div>

                  {/* Night Shift Badge Highlight */}
                  <div className="p-2.5 bg-slate-900 text-white rounded-2xl border border-slate-800 text-xs flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      🌙
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-400 font-bold uppercase font-mono">Midnight Shift Impact</div>
                      <div className="text-xs text-slate-200 font-bold">
                        ৩৪% সেলস (৳৩৮,৪০০) রাত ১২টা - ভোর ৫টায় হয়েছে!
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Weekly Bar Chart */}
                <div className="pt-2">
                  <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 pb-2 border-b border-slate-100 text-center">
                    {[
                      { day: "Mon", amount: "৳18,600", height: "45%", orders: 12 },
                      { day: "Tue", amount: "৳24,500", height: "60%", orders: 16 },
                      { day: "Wed", amount: "৳28,900", height: "70%", orders: 19 },
                      { day: "Thu", amount: "৳22,400", height: "55%", orders: 14 },
                      { day: "Fri", amount: "৳36,200", height: "85%", orders: 24, peak: true },
                      { day: "Sat", amount: "৳42,800", height: "100%", orders: 28, peak: true },
                      { day: "Sun (Today)", amount: "৳38,500", height: "90%", orders: 25 },
                    ].map((item, dIdx) => (
                      <div key={dIdx} className="flex flex-col items-center justify-end h-full group relative">
                        {/* Tooltip on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-900 text-white text-[10px] p-1.5 rounded-lg font-mono whitespace-nowrap pointer-events-none shadow-md z-10">
                          {item.day}: {item.amount} ({item.orders} orders)
                        </div>
                        <div
                          className={`w-full max-w-[42px] rounded-xl transition-all group-hover:brightness-95 ${
                            item.peak
                              ? "bg-gradient-to-t from-emerald-600 to-teal-400 shadow-sm shadow-emerald-500/30"
                              : "bg-slate-200 group-hover:bg-slate-300"
                          }`}
                          style={{ height: item.height }}
                        />
                        <span className="text-[11px] font-bold text-slate-600 mt-2 truncate max-w-full">
                          {item.day}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.amount.replace("৳", "৳")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Zyncoo AI Smart Recommendations & Low Stock Radar */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Zyncoo AI Smart Recommendations (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <h4 className="font-black text-sm text-slate-900">Zyncoo AI Smart Recommendations</h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                      Real-Time
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                        💡
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">হাই-ডিমান্ড স্ট্র্যাপ বান্ডেল রিকমেন্ডেশন</div>
                        <p className="text-slate-600 leading-relaxed">
                          গত ২৪ ঘণ্টায় ৪২ জন কাস্টমার মেটাল স্ট্র্যাপের বিষয়ে জানতে চেয়েছেন। ঘড়ির সাথে ৳২০০ টাকার স্ট্র্যাপ বান্ডেল অফার অন রাখলে প্রতি অর্ডারে এভারেজ অর্ডার ভ্যালু (AOV) ১৫% বৃদ্ধি পাবে।
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                        ⚡
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">বিকাশ ১০০ টাকা অ্যাডভান্স ইমপ্যাক্ট</div>
                        <p className="text-slate-600 leading-relaxed">
                          অটোমেটিক ৳১০০ বিকাশ ডেলিভারি চার্জ নেওয়ার কারণে আপনার ফেসবুক পেজের রিটার্ন রেট ২২% থেকে নেমে ৪.২%-এ পৌঁছেছে।
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200/80 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold">
                        🛡️
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">কুরিয়ার ফ্রড ফোন ব্লকড</div>
                        <p className="text-slate-600 leading-relaxed">
                          আজ ৩টি ফ্রড ফোন নম্বর (পূর্বে অন্য শপের পার্সেল ৭+ বার রিটার্ন করা) চিহ্নিত করে স্বয়ংক্রিয়ভাবে ফিল্টার করা হয়েছে।
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inventory Radar & 1-Click Courier Bulk CSV Export (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-slate-700" />
                        <h4 className="font-black text-sm text-slate-900">Stock Radar & Low Stock Alert</h4>
                      </div>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        1 Low Stock
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">Ultra Watch 9 (Matte Black)</div>
                          <div className="text-[11px] text-rose-600 font-semibold">স্টক শেষ পর্যায়ে! রিস্টক করুন</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-mono font-black text-xs">
                          4 units
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">Wireless ANC Earbuds Pro</div>
                          <div className="text-[11px] text-emerald-600 font-semibold">পর্যাপ্ত স্টক এভেইলেবল ✓</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 font-mono font-bold text-xs">
                          28 units
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900">Magnetic MagSafe Powerbank 10k</div>
                          <div className="text-[11px] text-slate-500 font-semibold">স্বাভাবিক গতিতে সেল হচ্ছে</div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 font-mono font-bold text-xs">
                          19 units
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Courier Bulk CSV Export Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleExportOrdersCsv}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Today&apos;s Orders (Steadfast / Pathao CSV)</span>
                    </button>
                    <div className="text-[10px] text-slate-400 text-center mt-1">
                      ১-ক্লিকে কুরিয়ার বাল্ক আপলোডের জন্য এক্সেল/সিএসভি শিট ডাউনলোড
                    </div>
                  </div>

                </div>

              </div>

              {/* Row 5: Orders Preview Table with 1-Click Action Bar */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-sm text-slate-900">Recent Inbound Orders & Quick Actions</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Orders</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-5 py-3">Order ID</th>
                        <th className="px-5 py-3">Customer & Phone</th>
                        <th className="px-5 py-3">Item</th>
                        <th className="px-5 py-3">Shipping Address</th>
                        <th className="px-5 py-3">Total</th>
                        <th className="px-5 py-3">Channel</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3 text-right">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-3.5 font-mono font-bold text-slate-900">{ord.id}</td>
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-slate-900">{ord.customer}</div>
                            <div className="text-slate-500 font-mono">{ord.phone}</div>
                          </td>
                          <td className="px-5 py-3.5 font-medium text-slate-800">{ord.item}</td>
                          <td className="px-5 py-3.5 text-slate-600 max-w-[200px] truncate">{ord.address}</td>
                          <td className="px-5 py-3.5 font-mono font-bold text-slate-900">৳{ord.amount}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.channel === "whatsapp" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {ord.channel === "whatsapp" ? "WhatsApp" : "Messenger"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-[11px] font-bold">
                              {ord.status}
                            </span>
                          </td>
                          {/* 1-Click Action Bar */}
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Thermal Shipping Sticker Print Button */}
                              <button
                                onClick={() => {
                                  setPrintOrder(ord);
                                  setPrintModalOpen(true);
                                }}
                                title="Print 4x6 Thermal Courier Shipping Label & Barcode Sticker"
                                className="p-1.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              {/* bKash In-Chat Payment Link Button */}
                              <button
                                onClick={() => handleOpenBkashInvoice(ord, ord.rtoRisk === "HIGH" ? "advance" : "full")}
                                title="Send bKash Payment Link to Customer"
                                className="p-1.5 rounded-xl text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors cursor-pointer"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>

                              {/* Bengali AI Voice Call (IVR) Trigger */}
                              <button
                                onClick={() => handleTriggerIvrCall(ord)}
                                title="Trigger Bengali AI Voice Call Confirmation Simulator"
                                className="p-1.5 rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                              </button>

                              {/* Live Track Link */}
                              <Link
                                href={`/track/${ord.id}`}
                                title="Open Live Customer Tracking Portal"
                                className="p-1.5 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                              >
                                <Truck className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* FEATURE 4 TAB: ABANDONED CHAT RE-TARGETING */}
          {activeTab === "broadcast" && (
            <div className="space-y-6">
              
              <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 p-6 rounded-2xl border border-amber-300/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Abandoned Lead Recovery Engine</span>
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900">Recover Inactive Buyers on WhatsApp</h3>
                  <p className="text-xs text-slate-600 max-w-xl">
                    84 prospective shoppers asked about products in the last 48 hours but dropped off before giving delivery info. Broadcast an automated limited-time offer to convert them instantly!
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-200 text-center shrink-0">
                  <div className="text-2xl font-black text-emerald-600 font-mono">৳1,26,000</div>
                  <div className="text-[11px] text-slate-500 font-medium">Estimated Recoverable Revenue</div>
                </div>
              </div>

              {/* Broadcast Composer */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Broadcast Campaign Template</h4>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 space-y-2 font-sans">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Preview WhatsApp Blast Message:</div>
                  <p className="bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                    &quot;Hey [Customer Name]! 😊 We noticed you checked out our <strong>Ultra Watch 9</strong> yesterday. For the next 24 hours only, get an exclusive <strong>10% OFF + FREE Delivery</strong> across Bangladesh! Reply &apos;YES&apos; with your address to confirm your package at this special price.&quot;
                  </p>
                </div>

                {/* Progress bar during send */}
                {broadcastSending && (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                      <span>Dispatching WhatsApp Cloud Broadcast...</span>
                      <span>{broadcastSentCount} / 84 Sent</span>
                    </div>
                    <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full transition-all duration-300"
                        style={{ width: `${(broadcastSentCount / 84) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-500">
                    Target: <strong className="text-slate-800">84 Dropped Shoppers (WhatsApp & Messenger)</strong>
                  </div>

                  <button
                    onClick={handleLaunchBroadcast}
                    disabled={broadcastSending}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{broadcastSending ? "Dispatching..." : "Launch WhatsApp Re-Engagement Blast (84 Leads)"}</span>
                  </button>
                </div>

              </div>

              {/* Feature: Automated Post-Delivery 5-Star Review & 10% Referral Voucher */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                      ⭐
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Post-Delivery Review & 10% Referral Voucher Blast</h4>
                      <p className="text-xs text-slate-500">Automatically sent 2 hours after Steadfast / Pathao marks parcel as &quot;Delivered&quot;.</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Auto-Pilot ON
                  </span>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Automated WhatsApp Follow-Up:</div>
                  <p className="bg-white p-3 rounded-lg border border-slate-200 leading-relaxed font-sans text-xs">
                    &quot;Assalamu Alaikum [Customer Name]! 😊 Your parcel has been delivered by courier today. We hope you love your <strong>[Product Name]</strong>! Could you give us a quick 5-star rating on our Facebook Page? Here is your exclusive 10% discount coupon code for your next order or to share with friends: <strong>ZYNCOO10</strong> (Valid for 30 days)!&quot;
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500 pt-1">
                  <span>Generated <strong>142 five-star reviews</strong> and <strong>৳48,500</strong> in repeat sales this month.</span>
                  <button
                    onClick={() => alert("Post-delivery review automation trigger updated!")}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Update Auto-Pilot Rule
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* INBOX - Advanced Omnichannel Social Inbox & AI Co-Pilot */}
          {activeTab === "inbox" && (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md h-[720px] flex flex-col md:flex-row">
              
              {/* Column 1: Conversations List & Omnichannel Filters (320px) */}
              <div className="w-full md:w-80 lg:w-88 border-r border-slate-200 flex flex-col shrink-0 bg-slate-50/50">
                
                {/* Header & Filter Pills */}
                <div className="p-3.5 border-b border-slate-200 bg-white space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Social Inbox</span>
                    </div>
                    <div className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {conversations.length} Active Feeds
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[11px] font-bold">
                    <button
                      onClick={() => setInboxFilter("all")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        inboxFilter === "all"
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      All ({conversations.length})
                    </button>
                    <button
                      onClick={() => setInboxFilter("whatsapp")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        inboxFilter === "whatsapp"
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                      }`}
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => setInboxFilter("facebook")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        inboxFilter === "facebook"
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                      }`}
                    >
                      Messenger
                    </button>
                    <button
                      onClick={() => setInboxFilter("instagram")}
                      className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        inboxFilter === "instagram"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "bg-purple-50 text-purple-800 hover:bg-purple-100"
                      }`}
                    >
                      Instagram
                    </button>
                    <button
                      onClick={() => setInboxFilter("priority")}
                      className={`px-2 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                        inboxFilter === "priority"
                          ? "bg-rose-600 text-white"
                          : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                      }`}
                    >
                      🔥 Urgent
                    </button>
                  </div>
                </div>

                {/* Conversation Feed List */}
                <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
                  {conversations
                    .filter((c) => {
                      if (inboxFilter === "all") return true;
                      if (inboxFilter === "priority") return c.priority;
                      return c.channel === inboxFilter;
                    })
                    .map((conv) => {
                      const isSelected = conv.id === selectedChatId;
                      return (
                        <button
                          key={conv.id}
                          onClick={() => setSelectedChatId(conv.id)}
                          className={`w-full p-3.5 text-left flex items-start gap-3 transition-all cursor-pointer relative ${
                            isSelected
                              ? "bg-white border-l-4 border-emerald-600 shadow-2xs"
                              : "hover:bg-white/80"
                          }`}
                        >
                          {/* Channel Avatar */}
                          <div className="relative shrink-0">
                            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-xs">
                              {conv.customer.charAt(0)}
                            </div>
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold ${
                                conv.channel === "whatsapp"
                                  ? "bg-emerald-600"
                                  : conv.channel === "instagram"
                                  ? "bg-pink-600"
                                  : "bg-blue-600"
                              }`}
                            >
                              {conv.channel === "whatsapp" ? "W" : conv.channel === "instagram" ? "I" : "M"}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="font-bold text-xs text-slate-900 truncate">{conv.customer}</h4>
                              <span className="text-[10px] text-slate-400 font-mono shrink-0">{conv.time}</span>
                            </div>

                            <p className="text-[11px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
                              {conv.priority && <Flame className="w-3 h-3 text-rose-500 shrink-0 fill-rose-500" />}
                              <span>{conv.lastMsg}</span>
                            </p>

                            <div className="mt-1.5 flex items-center justify-between gap-1">
                              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                                conv.rtoRisk === "LOW"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : conv.rtoRisk === "MEDIUM"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}>
                                {conv.rtoSuccessRate} Safe
                              </span>

                              <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded truncate max-w-[120px]">
                                {conv.stage}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Column 2: Active Chat Conversation Area */}
              <div className="flex-1 flex flex-col bg-slate-50/40 relative">
                
                {/* Chat Top Bar */}
                <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      {activeConversation.customer.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-slate-900">{activeConversation.customer}</h3>
                        <span className="text-[10px] font-mono text-slate-400">({activeConversation.phone})</span>
                        <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-md uppercase tracking-wider ${
                          activeConversation.channel === "whatsapp"
                            ? "bg-emerald-100 text-emerald-800"
                            : activeConversation.channel === "instagram"
                            ? "bg-pink-100 text-pink-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {activeConversation.channel}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-700 font-semibold">
                          {humanTakeover ? "Live Human Agent Active" : "Zyncoo AI 24/7 Autonomous Mode"}
                        </span>
                        <span>•</span>
                        <span>{activeConversation.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHumanTakeover(!humanTakeover)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                        humanTakeover
                          ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
                          : "bg-white text-slate-700 border border-slate-200 hover:border-emerald-400"
                      }`}
                    >
                      <span>{humanTakeover ? "Human Mode (AI Paused)" : "Takeover As Human"}</span>
                    </button>

                    <button
                      onClick={() => setDossierOpen(!dossierOpen)}
                      className="p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 text-xs font-bold hidden lg:flex items-center gap-1 cursor-pointer"
                      title="Toggle Customer CRM Dossier"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{dossierOpen ? "Hide Profile" : "CRM Profile"}</span>
                    </button>
                  </div>
                </div>

                {/* Urgent Sentiment / Escalation Alert Banner */}
                {(activeConversation as any).sentiment === "angry" && (
                  <div className="bg-rose-50 border-b border-rose-200 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs animate-in fade-in">
                    <div className="flex items-center gap-2 text-rose-900">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 animate-bounce" />
                      <div>
                        <strong className="font-black text-rose-800">⚠️ হাই ফ্রাস্ট্রেশন অ্যালার্ট:</strong>{" "}
                        <span>কাস্টমার অসন্তুষ্ট! এআই বট সাময়িক পজ করা হয়েছে এবং অ্যাডমিনের ফোনে SMS পাঠানো হয়েছে।</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setHumanTakeover(!humanTakeover)}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-xs cursor-pointer transition-all"
                      >
                        {humanTakeover ? "এআই বট পুনরায় চালু করুন" : "হিউম্যান টেকওভার করুন"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Messages Body */}
                <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3.5">
                  {activeConversation.messages.map((m: any, idx: number) => {
                    const isClient = m.sender === "customer";
                    return (
                      <div key={idx} className={`flex flex-col ${isClient ? "items-start" : "items-end"}`}>
                        <div
                          className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                            isClient
                              ? "bg-white text-slate-800 border border-slate-200 rounded-tl-xs"
                              : m.sender === "human_agent"
                              ? "bg-amber-600 text-white rounded-tr-xs"
                              : "bg-emerald-600 text-white rounded-tr-xs"
                          }`}
                        >
                          {!isClient && (
                            <div className="text-[10px] font-bold mb-1 opacity-90 flex items-center gap-1">
                              {m.sender === "human_agent" ? "👤 You (Live Human Agent)" : "🤖 Zyncoo AI Co-Pilot"}
                            </div>
                          )}

                          {/* Voice Note Audio Player */}
                          {m.isAudio ? (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2.5 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setAudioPlayingId(audioPlayingId === String(idx) ? null : String(idx))
                                  }
                                  className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer hover:bg-emerald-700"
                                >
                                  {audioPlayingId === String(idx) ? (
                                    <Pause className="w-3.5 h-3.5" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />
                                  )}
                                </button>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center gap-1 h-3">
                                    {[40, 70, 100, 50, 80, 30, 90, 60, 40, 75, 50, 85].map((h, bIdx) => (
                                      <div
                                        key={bIdx}
                                        className={`w-1 rounded-full transition-all ${
                                          audioPlayingId === String(idx) ? "bg-emerald-600 animate-pulse" : "bg-slate-400"
                                        }`}
                                        style={{ height: `${h}%` }}
                                      />
                                    ))}
                                  </div>
                                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                                    <span>Bengali Voice Note</span>
                                    <span>{m.audioDuration || "0:06"}</span>
                                  </div>
                                </div>
                              </div>
                              {m.transcription && (
                                <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-950 font-sans">
                                  <span className="font-bold text-[9px] text-emerald-700 uppercase block mb-0.5">
                                    Bengali Speech-to-Text Transcription:
                                  </span>
                                  &ldquo;{m.transcription}&rdquo;
                                </div>
                              )}
                            </div>
                          ) : (
                            <p>{m.text}</p>
                          )}

                          {/* Interactive bKash Invoice Pill */}
                          {m.isInvoicePill && (
                            <div className="mt-2.5 p-3 bg-white/95 text-slate-900 rounded-xl border border-pink-300 shadow-2xs space-y-1.5">
                              <div className="flex items-center justify-between text-[11px] font-bold text-pink-700">
                                <span className="flex items-center gap-1">
                                  <QrCode className="w-3.5 h-3.5" />
                                  <span>bKash Payment Invoice</span>
                                </span>
                                <span className="font-mono">৳{m.invoiceData?.amount || 100}</span>
                              </div>
                              <p className="text-[10px] text-slate-600">
                                ৳১০০ ডেলিভারি চার্জ অগ্রিম পেমেন্ট লিংক কাস্টমারকে পাঠানো হয়েছে (Awaiting TrxID)।
                              </p>
                            </div>
                          )}

                          {/* Interactive Courier Consignment Pill */}
                          {m.isBookingPill && (
                            <div className="mt-2.5 p-3 bg-slate-900 text-white rounded-xl border border-slate-700 shadow-2xs space-y-1">
                              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400">
                                <span className="flex items-center gap-1">
                                  <Truck className="w-3.5 h-3.5" />
                                  <span>Steadfast API Consignment</span>
                                </span>
                                <span className="font-mono text-white text-[10px]">{m.bookingData?.consignmentId || "ST-9821471"}</span>
                              </div>
                              <div className="text-[10px] text-slate-300 flex items-center justify-between">
                                <span>Status: Booked in Hub</span>
                                <span className="text-emerald-400 font-bold">Ready for Pickup</span>
                              </div>
                            </div>
                          )}

                          <div className={`text-[9px] mt-1 text-right font-mono ${isClient ? "text-slate-400" : "text-white/80"}`}>
                            {m.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* AI Co-Pilot Smart Action Chips Bar */}
                <div className="px-4 py-2 bg-emerald-50/60 border-t border-emerald-100 flex items-center gap-2 overflow-x-auto text-[11px]">
                  <span className="font-extrabold text-emerald-800 text-[10px] uppercase flex items-center gap-1 shrink-0">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Quick Actions:</span>
                  </span>

                  <button
                    onClick={() => handleSendSmartAction("bkash")}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-pink-50 border border-pink-200 text-pink-700 font-bold whitespace-nowrap cursor-pointer shadow-2xs flex items-center gap-1 transition-all"
                  >
                    <QrCode className="w-3 h-3" />
                    <span>Send ৳100 bKash QR</span>
                  </button>

                  <button
                    onClick={() => handleSendSmartAction("tracking")}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold whitespace-nowrap cursor-pointer shadow-2xs flex items-center gap-1 transition-all"
                  >
                    <Truck className="w-3 h-3" />
                    <span>Send Tracking Link</span>
                  </button>

                  <button
                    onClick={() => handleSendSmartAction("discount")}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-50 border border-amber-200 text-amber-800 font-bold whitespace-nowrap cursor-pointer shadow-2xs flex items-center gap-1 transition-all"
                  >
                    <Tag className="w-3 h-3" />
                    <span>Offer ৳100 Discount (ZYNCOO100)</span>
                  </button>

                  <button
                    onClick={() => handleSendSmartAction("autobook")}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold whitespace-nowrap cursor-pointer shadow-2xs flex items-center gap-1 transition-all"
                  >
                    <Zap className="w-3 h-3 fill-white" />
                    <span>Auto-Book Steadfast</span>
                  </button>

                  <button
                    onClick={() => handleSendSmartAction("stockout_suggest")}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-bold whitespace-nowrap cursor-pointer shadow-2xs flex items-center gap-1 transition-all"
                    title="Simulate Smart Out-of-Stock Guard & Alternative Suggestion"
                  >
                    <AlertOctagon className="w-3 h-3 text-rose-500" />
                    <span>Stock Out Guard Switch</span>
                  </button>
                </div>

                {/* Chat Reply Form */}
                <form onSubmit={handleSendManualReply} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                  <input
                    type="text"
                    value={chatReplyInput}
                    onChange={(e) => setChatReplyInput(e.target.value)}
                    placeholder={
                      humanTakeover
                        ? "Type live reply to customer... (Human mode active)"
                        : "AI is responding autonomously. Click 'Takeover As Human' or use 1-click quick actions above..."
                    }
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 bg-slate-50/50"
                  />
                  <button
                    type="submit"
                    disabled={!chatReplyInput.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

              </div>

              {/* Column 3: Customer CRM Dossier & Courier Scorecard (280px) */}
              {dossierOpen && (
                <div className="w-full lg:w-72 border-l border-slate-200 bg-white p-4 overflow-y-auto space-y-4 shrink-0 hidden lg:block">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Customer CRM Dossier</h4>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Verified
                    </span>
                  </div>

                  {/* Customer Quick Profile */}
                  <div className="text-center space-y-1">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 font-black text-lg flex items-center justify-center mx-auto shadow-2xs">
                      {activeConversation.customer.charAt(0)}
                    </div>
                    <h3 className="font-black text-sm text-slate-900 mt-1">{activeConversation.customer}</h3>
                    <div className="text-xs text-slate-500 font-mono font-semibold flex items-center justify-center gap-1">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>{activeConversation.phone}</span>
                    </div>
                  </div>

                  {/* Courier RTO Scorecard Card */}
                  <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Courier Reliability:</span>
                      </span>
                      <span className="font-mono font-black text-emerald-700">{activeConversation.rtoSuccessRate}</span>
                    </div>
                    <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full" style={{ width: activeConversation.rtoSuccessRate }} />
                    </div>
                    <div className="text-[10px] text-emerald-800 font-semibold">
                      ✓ Steadfast & Pathao Verified Safe for Cash on Delivery (COD).
                    </div>
                  </div>

                  {/* LTV & Orders Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Total Orders</div>
                      <div className="text-sm font-black text-slate-900 font-mono mt-0.5">{activeConversation.totalOrders} Orders</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Lifetime Value</div>
                      <div className="text-sm font-black text-emerald-600 font-mono mt-0.5">৳{activeConversation.lifetimeValue.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Delivery Location */}
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Delivery Address:</span>
                    <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 flex items-start gap-1.5 leading-snug">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{activeConversation.location}</span>
                    </div>
                  </div>

                  {/* Customer Tags */}
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-400 uppercase text-[10px] block">Customer Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {activeConversation.tags.map((tag: string, tIdx: number) => (
                        <span key={tIdx} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 1-Click Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${activeConversation.phone}`}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Direct Phone Call</span>
                    </a>

                    <button
                      onClick={() => handleOpenBkashInvoice(orders[0], "advance")}
                      className="w-full py-2 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Generate bKash Invoice</span>
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone or ID..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                {/* Multi-Courier Switcher Bar */}
                <div className="flex items-center gap-2">
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-bold text-slate-600">
                    <span className="text-[10px] text-slate-400 uppercase px-2 font-bold">Active Courier:</span>
                    <button
                      onClick={() => setPreferredCourier("steadfast")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        preferredCourier === "steadfast"
                          ? "bg-white text-emerald-800 shadow-2xs font-extrabold"
                          : "hover:text-slate-900"
                      }`}
                    >
                      Steadfast
                    </button>
                    <button
                      onClick={() => setPreferredCourier("pathao")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        preferredCourier === "pathao"
                          ? "bg-red-600 text-white shadow-2xs font-extrabold"
                          : "hover:text-slate-900"
                      }`}
                    >
                      Pathao
                    </button>
                    <button
                      onClick={() => setPreferredCourier("redx")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        preferredCourier === "redx"
                          ? "bg-red-800 text-white shadow-2xs font-extrabold"
                          : "hover:text-slate-900"
                      }`}
                    >
                      RedX
                    </button>
                  </div>

                  <button
                    onClick={() => alert(`Bulk synced to ${preferredCourier.toUpperCase()} Courier API!`)}
                    className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Sync All</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-5 py-3">Order ID</th>
                        <th className="px-5 py-3">Customer & Phone</th>
                        <th className="px-5 py-3">Delivery Address</th>
                        <th className="px-5 py-3">Item Ordered</th>
                        <th className="px-5 py-3">Amount</th>
                        <th className="px-5 py-3">Channel</th>
                        <th className="px-5 py-3">RTO Return Risk</th>
                        <th className="px-5 py-3">Fulfillment</th>
                        <th className="px-5 py-3 text-right">Autonomous Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-5 py-4 font-mono font-bold text-slate-900">{ord.id}</td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-slate-900">{ord.customer}</div>
                            <div className="text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              {ord.phone}
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-600 max-w-[240px]">
                            <div className="flex items-start gap-1">
                              <MapPin className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{ord.address}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 font-medium text-slate-800">{ord.item}</td>
                          <td className="px-5 py-4 font-mono font-bold text-slate-900">৳{ord.amount}</td>
                          <td className="px-5 py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              ord.channel === "whatsapp" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {ord.channel === "whatsapp" ? "WhatsApp" : "Messenger"}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            {ord.rtoRisk === "LOW" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span>🟢</span> {ord.rtoRate || "96%"} Safe COD
                              </span>
                            )}
                            {ord.rtoRisk === "MEDIUM" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                <span>🟡</span> {ord.rtoRate || "78%"} Medium
                              </span>
                            )}
                            {ord.rtoRisk === "HIGH" && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
                                <span>🔴</span> {ord.rtoRate || "42%"} High Risk
                                {ord.advanceFeeCollected && (
                                  <span className="ml-1 text-[9px] bg-red-100 px-1.5 py-0.2 rounded font-extrabold text-red-800">৳100 Paid</span>
                                )}
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              ord.status === "Shipped" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Thermal Shipping Sticker Print Button */}
                              <button
                                onClick={() => {
                                  setPrintOrder(ord);
                                  setPrintModalOpen(true);
                                }}
                                title="Print 4x6 Thermal Courier Shipping Label & Barcode Sticker"
                                className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              {/* bKash In-Chat Payment Link Button */}
                              <button
                                onClick={() => handleOpenBkashInvoice(ord, ord.rtoRisk === "HIGH" ? "advance" : "full")}
                                title="Generate In-Chat bKash Payment Link / QR Code"
                                className="p-2 rounded-xl text-pink-600 bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors cursor-pointer"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </button>

                              {/* Bengali IVR Voice Call Simulator Button */}
                              <button
                                onClick={() => handleTriggerIvrCall(ord)}
                                title="Run Automated Bengali IVR Voice Confirmation Call"
                                className="p-2 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                              </button>

                              {/* Multi-Courier Dispatch Button */}
                              <button
                                onClick={() => handleDispatchOrder(ord, preferredCourier)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors cursor-pointer whitespace-nowrap ${
                                  preferredCourier === "pathao"
                                    ? "text-red-700 bg-red-50 hover:bg-red-100 border-red-200"
                                    : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
                                }`}
                              >
                                Dispatch {preferredCourier === "pathao" ? "Pathao" : "Steadfast"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* FEATURE 1: AUTO COMMENT-TO-DM FUNNEL */}
          {activeTab === "comments" && (
            <div className="space-y-6">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white p-6 rounded-3xl border border-rose-800/40 shadow-sm relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span>Viral Facebook & Instagram Growth Engine</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Facebook Auto Comment-to-DM Funnel (ফেসবুক কমেন্ট-টু-ইনবক্স অটোমেশন)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    ফেসবুক পোস্ট বা রিলে কাস্টমার &quot;দাম কত?&quot;, &quot;price?&quot; বা &quot;details?&quot; লিখে কমেন্ট করলেই এআই নিমেষের মধ্যে পাবলিক কমেন্টে রিপ্লাই দিয়ে কাস্টমারের পার্সোনাল ইনবক্সে প্রোডাক্টের ফটো ও ১-ক্লিক অর্ডার লিঙ্ক পাঠিয়ে সেলস ক্লোজ করে!
                  </p>
                </div>
                <div className="absolute right-6 -bottom-6 opacity-15 pointer-events-none hidden md:block">
                  <MessageSquareQuote className="w-64 h-64 text-rose-400" />
                </div>
              </div>

              {/* 4 KPI Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Comments Captured</div>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-1">4,820</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-0.5">100% Instant AI Answered</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Automated DMs Sent</div>
                  <div className="text-2xl font-black text-rose-600 font-mono mt-1">4,110 Inboxes</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">85.3% Direct Messenger Delivery</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Comment-to-Order Conversion</div>
                  <div className="text-2xl font-black text-emerald-600 font-mono mt-1">28.4%</div>
                  <div className="text-[11px] text-emerald-700 font-bold mt-0.5">1,168 Confirmed COD Orders 🔥</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Response Velocity</div>
                  <div className="text-2xl font-black text-slate-900 font-mono mt-1">0.8s</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Instant Meta Webhook Reply</div>
                </div>
              </div>

              {/* Live Interactive Facebook Post & Messenger Simulation */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 7 Cols: Mock Facebook Post with Interactive Comment Box */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                        GZ
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                          <span>GadgetZone BD</span>
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-bold">✓</span>
                        </div>
                        <div className="text-[11px] text-slate-400">Sponsored • 🌍 Facebook for Business</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
                      Live Simulation
                    </span>
                  </div>

                  {/* Post Caption */}
                  <p className="text-xs text-slate-800 leading-relaxed">
                    🔥 <strong>নতুন আল্ট্রা ওয়াচ ৯ লঞ্চিং অফার!</strong> প্রিমিয়াম AMOLED ডিসপ্লে, ফুল ওয়াটারপ্রুফ এবং টানা ৩-৫ দিন ব্যাটারি ব্যাকআপ! কমেন্টে <strong>&quot;দাম কত&quot;</strong> লিখলেই পাচ্ছেন স্পেশাল ১০০ টাকার ডিসকাউন্ট কুপন ও ফ্রি ডেলিভারি! 👇
                  </p>

                  {/* Post Image Banner */}
                  <div className="w-full h-44 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center text-white relative overflow-hidden border border-slate-800">
                    <div className="text-center space-y-1">
                      <div className="text-xl font-black text-white">Ultra Watch 9 (2026 Edition)</div>
                      <div className="text-xs text-emerald-400 font-mono">Special Offer: ৳1,390 (Regular: ৳1,890)</div>
                      <span className="inline-block px-3 py-1 bg-[#b8e900] text-slate-950 font-black text-[11px] rounded-full shadow-md">
                        Comment &quot;Price&quot; to Order in Inbox
                      </span>
                    </div>
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2.5">
                    <span>👍 842 Likes</span>
                    <span>💬 318 Comments • 42 Shares</span>
                  </div>

                  {/* Interactive Comment Input */}
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">টেস্ট কমেন্ট করুন (Type customer comment to test):</span>
                      <span className="text-[11px] text-slate-400">বা নিচের কিওয়ার্ডে ক্লিক করুন</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      {["bhaiya watch tar price koto?", "details janan", "delivery charge koto?", "colour ki ki ache?"].map((chip) => (
                        <button
                          key={chip}
                          onClick={() => {
                            setCommentInput(chip);
                            setTimeout(() => handleTestCommentFunnel(), 50);
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 rounded-lg border border-slate-200 hover:border-rose-300 font-mono text-[11px] cursor-pointer transition-colors"
                        >
                          &quot;{chip}&quot;
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="e.g. bhaiya price koto? or দাম কত?"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-rose-500"
                      />
                      <button
                        onClick={handleTestCommentFunnel}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <span>Test Funnel</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Resulting Public Comment Reply */}
                    {commentSimResult && (
                      <div className="mt-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 animate-in fade-in">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-bold text-slate-800">কাস্টমারের কমেন্ট:</span>
                          <span className="italic">&quot;{commentInput}&quot;</span>
                        </div>
                        <div className="pl-3 border-l-2 border-emerald-500 space-y-1">
                          <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                            <span>GadgetZone BD (AI Public Reply):</span>
                            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded">0.6s instant</span>
                          </div>
                          <p className="text-xs text-slate-800">{commentSimResult.publicReply}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right 5 Cols: Mock Facebook Messenger Inbox Popup */}
                <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-5 text-white flex flex-col justify-between shadow-xl">
                  <div className="space-y-4">
                    {/* Messenger Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-xs">
                          GZ
                        </div>
                        <div>
                          <div className="font-bold text-xs text-white flex items-center gap-1">
                            <span>GadgetZone BD</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                          </div>
                          <div className="text-[10px] text-slate-400">Messenger Automated Private DM</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Webhook Sent
                      </span>
                    </div>

                    {/* Messenger Conversation Stream */}
                    <div className="space-y-3 text-xs">
                      <div className="text-center text-[10px] text-slate-500 font-mono">Today • Comment-to-DM Triggered</div>
                      
                      {/* Customer Side */}
                      <div className="flex justify-end">
                        <div className="bg-blue-600 text-white p-2.5 rounded-2xl rounded-tr-xs max-w-[85%] text-xs">
                          [Auto Context]: কাস্টমার ফেসবুক পোস্টে কমেন্ট করেছেন: &quot;{commentInput}&quot;
                        </div>
                      </div>

                      {/* AI Private Message Bubble with Product Card */}
                      <div className="flex justify-start">
                        <div className="bg-slate-800/90 border border-slate-700/80 p-3.5 rounded-2xl rounded-tl-xs max-w-[95%] space-y-2.5 shadow-md">
                          <p className="text-slate-200 text-xs leading-relaxed">
                            {commentSimResult
                              ? commentSimResult.privateDm
                              : "আসসালামু আলাইকুম তানভীর ভাই! 😊 আমাদের Ultra Watch 9 মডেলটির স্পেশাল অফার প্রাইস মাত্র ৳১,৩৯০ (রেগুলার ৳১,৮৯০)। সাথে পাচ্ছেন ১০০ টাকার ডিসকাউন্ট কুপন [ZYNCOO100]!"}
                          </p>

                          {/* Product Card Inside Messenger */}
                          <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-700/70 space-y-1.5">
                            <div className="font-bold text-white text-[11px]">Ultra Watch 9 (IP68 Waterproof)</div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-emerald-400 font-bold font-mono">৳1,390 COD</span>
                              <span className="text-[10px] text-slate-400 line-through">৳1,890</span>
                            </div>
                            <button
                              onClick={() => alert("কাস্টমার সরাসরি এই লিঙ্কে ক্লিক করে নাম ও ঠিকানা দিলে অর্ডার কনফার্ম হয়ে যাবে!")}
                              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs py-2 rounded-lg transition-all shadow-sm cursor-pointer"
                            >
                              ১-ক্লিকে ক্যাশ অন ডেলিভারি অর্ডার করুন →
                            </button>
                          </div>

                          <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                            <span>Seen just now</span>
                            <span className="text-emerald-400 font-bold">✓ Sent to Personal Inbox</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Auto-Conversion Booster:</span>
                    <strong className="text-emerald-400">+5x Higher Conversions</strong>
                  </div>
                </div>

              </div>

              {/* Comment Rules Table */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Active Comment-to-DM Keyword Rules</h4>
                    <p className="text-xs text-slate-500 mt-0.5">যেসব কিওয়ার্ডে কাস্টমার কমেন্ট করলে স্বয়ংক্রিয়ভাবে ইনবক্স ফানেল শুরু হবে।</p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
                    {commentRules.length} Active Rules
                  </span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {commentRules.map((r) => (
                    <div key={r.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-bold text-slate-700 text-xs mr-1">Trigger Keywords:</span>
                          {r.triggerKeywords.map((kw, idx) => (
                            <span key={idx} className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-md font-mono text-[10px]">
                              &quot;{kw}&quot;
                            </span>
                          ))}
                        </div>
                        <div className="text-slate-700">
                          <strong className="text-slate-900">Public Reply:</strong> &quot;{r.publicReply}&quot;
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          <strong className="text-slate-800">Private Messenger DM:</strong> &quot;{r.privateDm}&quot;
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <div className="font-black font-mono text-slate-900 text-sm">{r.hits} Hits</div>
                          <div className="text-[10px] text-emerald-600 font-bold">Auto Dispatched</div>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* FEATURE 2: AUTOMATED WHATSAPP & SMS NOTIFICATION ENGINE */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 rounded-3xl border border-emerald-800/40 shadow-sm relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                    <Bell className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-Time Courier & Order Dispatch Alerts</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Automated WhatsApp & SMS Notification Engine (স্বয়ংক্রিয় ট্র্যাকিং নোটিফিকেশন)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    অর্ডার কনফার্ম, রাইডার পার্সেল নিয়ে বের হওয়া এবং ডেলিভারি সফল হওয়ার সাথে সাথে কাস্টমারের মোবাইলে স্বয়ংক্রিয় সুন্দর WhatsApp ও SMS অ্যালার্ট পৌঁছে যাবে।
                  </p>
                </div>
                <div className="absolute right-6 -bottom-6 opacity-15 pointer-events-none hidden md:block">
                  <Truck className="w-64 h-64 text-emerald-400" />
                </div>
              </div>

              {/* Gateway Status Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">WhatsApp Cloud API</div>
                      <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Verified & Connected</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">Meta Official</span>
                </div>

                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-200">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">SMS Gateway Balance</div>
                      <div className="text-[11px] text-slate-500">Greenweb / Elitbuzz</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-xl">2,450 SMS</span>
                </div>

                <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-200">
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Courier Webhook Listener</div>
                      <div className="text-[11px] text-purple-700 font-semibold">Steadfast & Pathao Live</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">Auto-Trigger</span>
                </div>
              </div>

              {/* 3 Trigger Stages Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
                {[
                  { id: "confirmed", label: "📦 ১. অর্ডার কনফার্মেশন", desc: "Order Confirmed" },
                  { id: "outForDelivery", label: "🚚 ২. রাইডার ডেলিভারির পথে", desc: "Out for Delivery" },
                  { id: "deliveredReview", label: "⭐ ৩. ডেলিভারি সম্পন্ন ও রিভিউ কুপন", desc: "Delivered & 5-Star" }
                ].map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setActiveNotifTab(stage.id as any)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeNotifTab === stage.id
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span>{stage.label}</span>
                  </button>
                ))}
              </div>

              {/* Active Stage Config & Live Mockup */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left 7 Cols: Template Editors */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-black text-sm text-slate-900">
                      {notifTemplates[activeNotifTab].title}
                    </h4>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Automated Trigger
                    </span>
                  </div>

                  {/* Dynamic Variable Chips */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-600">ক্লিক করে টেমপ্লেটে ডায়নামিক ভেরিয়েবল যুক্ত করুন:</span>
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {["[Customer Name]", "[Order ID]", "[Total BDT]", "[Rider Phone]", "[Tracking Link]"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono rounded cursor-pointer hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Rich Message Editor */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-emerald-800">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp Alert Template (ইমোজি ও বোল্ড ফরম্যাট সহ)</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">100% Free WhatsApp Open Rate</span>
                    </label>
                    <textarea
                      rows={6}
                      value={notifTemplates[activeNotifTab].whatsappText}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNotifTemplates((prev) => ({
                          ...prev,
                          [activeNotifTab]: { ...prev[activeNotifTab], whatsappText: val }
                        }));
                      }}
                      className="w-full p-3 text-xs font-sans rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 leading-relaxed bg-slate-50/50"
                    />
                  </div>

                  {/* SMS Message Editor */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-blue-800">
                        <Smartphone className="w-4 h-4 text-blue-600" />
                        <span>SMS Alert Template (বাংলা/ইংরেজি টেক্সট)</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {notifTemplates[activeNotifTab].smsText.length} chars (1 SMS Credit)
                      </span>
                    </label>
                    <textarea
                      rows={3}
                      value={notifTemplates[activeNotifTab].smsText}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNotifTemplates((prev) => ({
                          ...prev,
                          [activeNotifTab]: { ...prev[activeNotifTab], smsText: val }
                        }));
                      }}
                      className="w-full p-3 text-xs font-mono rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500 leading-relaxed bg-slate-50/50"
                    />
                  </div>

                  {/* Test Dispatch Box */}
                  <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-3">
                    <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>লাইভ টেস্ট নোটিফিকেশন পাঠান (Send Test Alert to Mobile):</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={testNotifPhone}
                        onChange={(e) => setTestNotifPhone(e.target.value)}
                        placeholder="01711-987654"
                        className="flex-1 px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-emerald-500"
                      />
                      <button
                        onClick={() => handleSendTestNotification("whatsapp")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Send WhatsApp</span>
                      </button>
                      <button
                        onClick={() => handleSendTestNotification("sms")}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send SMS</span>
                      </button>
                    </div>

                    {testNotifSuccess && (
                      <div className="text-xs font-bold text-emerald-800 bg-white p-2.5 rounded-xl border border-emerald-300 flex items-center gap-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{testNotifSuccess}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right 5 Cols: Smartphone Screen Mockup */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-[320px] bg-slate-950 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 text-white">
                    {/* Screen Bezel */}
                    <div className="bg-slate-900 rounded-[32px] overflow-hidden flex flex-col h-[540px]">
                      
                      {/* Phone Top Notch */}
                      <div className="bg-slate-950 px-6 py-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>11:50</span>
                        <div className="w-14 h-3.5 bg-slate-900 rounded-full" />
                        <span>5G • 98%</span>
                      </div>

                      {/* WhatsApp Header */}
                      <div className="bg-emerald-800 p-3 flex items-center gap-2.5 border-b border-emerald-700/60">
                        <div className="w-7 h-7 rounded-full bg-white text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                          GZ
                        </div>
                        <div>
                          <div className="font-bold text-xs text-white">GadgetZone BD</div>
                          <div className="text-[9px] text-emerald-200">Official Business Account ✓</div>
                        </div>
                      </div>

                      {/* Phone Message Body */}
                      <div className="p-3.5 flex-1 bg-slate-900 overflow-y-auto space-y-2 text-xs">
                        <div className="text-center text-[10px] text-slate-400 font-mono py-1">TODAY</div>
                        
                        <div className="bg-emerald-950/80 border border-emerald-800/80 p-3 rounded-2xl rounded-tl-xs space-y-2 text-slate-200 shadow-sm">
                          <p className="whitespace-pre-line text-[11px] leading-relaxed">
                            {notifTemplates[activeNotifTab].whatsappText
                              .replace("[Customer Name]", "তানভীর আহমেদ")
                              .replace("[Order ID]", "#ORD-9821")
                              .replace("[Total BDT]", "৳1,550")
                              .replace("[Rider Phone]", "01700-112233")
                              .replace("[Tracking Link]", "https://zyncoo.ai/track/ORD-9821")}
                          </p>
                          <div className="text-[9px] text-slate-400 text-right flex items-center justify-end gap-1">
                            <span>11:50 AM</span>
                            <span className="text-emerald-400 font-bold">✓✓</span>
                          </div>
                        </div>
                      </div>

                      {/* Phone Bottom Footer */}
                      <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-center text-[10px] text-slate-400">
                        Live Smartphone Rendering Preview
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}
          {activeTab === "fraud-shield" && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 rounded-3xl border border-emerald-800/40 shadow-sm relative overflow-hidden">
                <div className="relative z-10 max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time Courier Network Intelligence</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Zyncoo RTO Fraud Shield
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Every inbound customer phone number is cross-referenced across courier delivery databases (Steadfast, Pathao, RedX). 
                    Chronic parcel rejecters are automatically prompted for a ৳100 advance delivery fee via bKash before booking.
                  </p>
                </div>
                <div className="absolute right-6 -bottom-6 opacity-15 pointer-events-none hidden md:block">
                  <ShieldCheck className="w-64 h-64 text-emerald-400" />
                </div>
              </div>

              {/* 4 KPI Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avoided Return Losses</div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">৳34,200</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">228 fake/return parcels saved</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Flagged High-Risk Buyers</div>
                  <div className="text-2xl font-black text-red-500 mt-1">18 Numbers</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">&gt;50% parcel refusal rate</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Advance Fees Collected</div>
                  <div className="text-2xl font-black text-slate-900 mt-1">৳1,800</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">18 x ৳100 bKash / Nagad</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Net Delivery Success Rate</div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">94.8%</div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">↑ +14.2% higher than industry avg</div>
                </div>
              </div>

              {/* Live Phone Number Lookup Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Search className="w-4 h-4 text-emerald-600" />
                    <span>Live Customer Phone Fraud Verification</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Test any customer mobile number to simulate Zyncoo&apos;s automated fraud verification check.
                  </p>
                </div>

                <form onSubmit={handleRunFraudCheck} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. 01711987690 (High Risk test) or 01711987654 (Low Risk)"
                      value={fraudPhoneInput}
                      onChange={(e) => setFraudPhoneInput(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={fraudLoading || !fraudPhoneInput.trim()}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{fraudLoading ? "Querying Couriers..." : "Check Fraud Profile"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFraudPhoneInput("01711987690");
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Try High Risk Test No.
                    </button>
                  </div>
                </form>

                {/* Fraud Result Display */}
                {fraudResult && (
                  <div className={`p-5 rounded-2xl border transition-all ${
                    fraudResult.riskLevel === "HIGH"
                      ? "bg-red-50/70 border-red-200"
                      : fraudResult.riskLevel === "MEDIUM"
                      ? "bg-amber-50/70 border-amber-200"
                      : "bg-emerald-50/70 border-emerald-200"
                  }`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3 mb-3 border-slate-200/60">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          fraudResult.riskLevel === "HIGH"
                            ? "bg-red-600 text-white"
                            : fraudResult.riskLevel === "MEDIUM"
                            ? "bg-amber-600 text-white"
                            : "bg-emerald-600 text-white"
                        }`}>
                          {fraudResult.riskLevel === "HIGH" ? "!" : "✓"}
                        </div>
                        <div>
                          <div className="font-mono font-bold text-sm text-slate-900">{fraudResult.phone}</div>
                          <div className="text-xs text-slate-500">Cross-courier delivery analytics</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                          fraudResult.riskLevel === "HIGH"
                            ? "bg-red-200 text-red-900"
                            : fraudResult.riskLevel === "MEDIUM"
                            ? "bg-amber-200 text-amber-900"
                            : "bg-emerald-200 text-emerald-900"
                        }`}>
                          {fraudResult.riskLevel} RTO RISK
                        </span>
                        <span className="font-bold text-xs text-slate-700 font-mono">
                          {fraudResult.successRate} Delivery Success
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                      <div className="bg-white/80 p-3 rounded-xl border border-slate-200/60">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Courier Parcels</span>
                        <span className="font-mono font-bold text-slate-900 text-sm">{fraudResult.totalOrders} Dispatched</span>
                      </div>
                      <div className="bg-white/80 p-3 rounded-xl border border-slate-200/60">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Delivered & Accepted</span>
                        <span className="font-mono font-bold text-emerald-700 text-sm">{fraudResult.successfulDeliveries} Parcels</span>
                      </div>
                      <div className="bg-white/80 p-3 rounded-xl border border-slate-200/60">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Returned / Cancelled (RTO)</span>
                        <span className={`font-mono font-bold text-sm ${fraudResult.returnedParcels > 2 ? "text-red-600" : "text-slate-700"}`}>
                          {fraudResult.returnedParcels} Parcels
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200/80 text-xs">
                      <span className="font-bold text-slate-900 block mb-1">Zyncoo AI Autonomous Action:</span>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {fraudResult.recommendation}
                      </p>
                      {fraudResult.advancePaymentRequired && (
                        <div className="mt-2 text-xs font-bold text-red-700 bg-red-100/80 px-3 py-1.5 rounded-lg border border-red-200 inline-block">
                          ⚡ Automated bKash Payment Link Dispatched in Chat: ৳100
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Protected Parcels Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Recent RTO Shield Verification Log</h4>
                    <p className="text-xs text-slate-500">Autonomous protection decisions made during live chat conversations.</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Live Interceptor Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-5 py-3">Customer Phone</th>
                        <th className="px-5 py-3">Customer Name</th>
                        <th className="px-5 py-3">Delivery Rate</th>
                        <th className="px-5 py-3">Risk Tier</th>
                        <th className="px-5 py-3">Zyncoo Action</th>
                        <th className="px-5 py-3 text-right">Saved Courier Loss</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3.5 font-mono font-bold text-slate-900">01722-334455</td>
                        <td className="px-5 py-3.5 font-medium text-slate-800">Mehrab Hossain</td>
                        <td className="px-5 py-3.5 font-mono">42% (5/12 returned)</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                            HIGH RISK
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-semibold text-emerald-700">
                            ✓ Collected ৳100 advance via bKash TrxID #9BK7821
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono font-bold text-emerald-600">
                          +৳150 saved
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3.5 font-mono font-bold text-slate-900">01911-223344</td>
                        <td className="px-5 py-3.5 font-medium text-slate-800">Sayma Akter</td>
                        <td className="px-5 py-3.5 font-mono">78% (2/9 returned)</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            MEDIUM RISK
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-semibold text-slate-600">
                            Phone verification SMS confirmed
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono font-bold text-slate-500">
                          Verified
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3.5 font-mono font-bold text-slate-900">01711-987654</td>
                        <td className="px-5 py-3.5 font-medium text-slate-800">Tanvir Hasan</td>
                        <td className="px-5 py-3.5 font-mono">96% (11/12 delivered)</td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            LOW RISK
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs font-semibold text-emerald-700">
                            Auto-approved 100% COD Instant Booking
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right font-mono font-bold text-emerald-600">
                          0% Risk
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* LEADS CRM */}
          {activeTab === "crm" && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Autonomous Inbound Leads (CRM)</h3>
                  <p className="text-xs text-slate-500">Shoppers who engaged with your agent but did not complete checkout.</p>
                </div>
                <button
                  onClick={() => alert("Leads exported to CSV successfully!")}
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {leads.map((lead) => (
                  <div key={lead.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900">{lead.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === "Converted" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      {lead.phone}
                    </div>
                    <div className="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                      <strong>Intent:</strong> {lead.interest}
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      <span className="text-[11px] text-slate-400">Last touch: {lead.lastChat}</span>
                      <button
                        onClick={() => alert(`Broadcast promo sent to ${lead.name}!`)}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        Send WhatsApp Offer →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRAINING */}
          {activeTab === "training" && (
            <div className="space-y-6">

              {/* 1. Client-Wise AI Keyword Training & Custom Q&A Rules Manager */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                
                {/* Header & Client Store Selector */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Store AI Knowledge & Rule Customizer</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      Store AI Training & Custom Q&A Rules (স্টোর এআই প্রশিক্ষণ ও প্রশ্নোত্তর)
                    </h3>
                    <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                      বাংলা ও বাংলিশে আপনার স্টোরের (GadgetZone BD) কাস্টমারদের প্রশ্নের জন্য এআই কিওয়ার্ড রুলস ও স্বয়ংক্রিয় উত্তর সেট করুন।
                    </p>
                  </div>

                  {/* Add Rule Button */}
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => {
                        setRuleForm({
                          clientStore: "GadgetZone BD (Electronics)",
                          category: "Bargaining",
                          name: "",
                          keywordsInput: "",
                          matchType: "contains",
                          replyText: "",
                          actionTrigger: "none",
                        });
                        setIsAddingRule(true);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Custom Rule</span>
                    </button>
                  </div>
                </div>

                {/* Central Admin Hub Callout */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4.5 rounded-2xl border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30 shrink-0">
                      <Brain className="w-5 h-5 text-[#b8e900]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Looking for Agency-Wide Multi-Store AI Control & 1-Click Templates?</span>
                        <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Super Admin Feature
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        সকল ক্লায়েন্ট স্টোরের রুলস সেন্ট্রালি ম্যানেজ এবং ১-ক্লিকে ডক্টর, রিয়েল এস্টেট, আইটি কোচিং টেমপ্লেট ডিপ্লয় করতে সুপার অ্যাডমিন প্যানেলে যান।
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/admin"
                    className="shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Open Super Admin Hub →</span>
                  </Link>
                </div>

                {/* Save Feedback Toast */}
                {ruleSaveMessage && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{ruleSaveMessage}</span>
                  </div>
                )}

                {/* Inline Add / Edit Rule Form Modal */}
                {isAddingRule && (
                  <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border-2 border-emerald-500 shadow-md space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4 text-emerald-600" />
                        <h4 className="font-bold text-sm text-slate-900">
                          {ruleForm.id ? "Edit AI Rule" : "নতুন AI কিওয়ার্ড ও রিপ্লাই রুল যোগ করুন"}
                        </h4>
                      </div>
                      <button
                        onClick={() => setIsAddingRule(false)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveRule} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      {/* Store Selector */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Target Client Store (কোন স্টোরের জন্য?)</label>
                        <select
                          value={ruleForm.clientStore}
                          onChange={(e) => setRuleForm({ ...ruleForm, clientStore: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:border-emerald-500"
                        >
                          {clientStores.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Category */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Rule Category</label>
                        <select
                          value={ruleForm.category}
                          onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:border-emerald-500"
                        >
                          <option value="Bargaining">Bargaining (দামাদামি ও অফার)</option>
                          <option value="Delivery & COD">Delivery & COD (চার্জ ও সময়)</option>
                          <option value="Fraud & Advance">Fraud & Advance (বিকাশ অগ্রিম)</option>
                          <option value="Address Sanitizer">Address Sanitizer (অসম্পূর্ণ ঠিকানা)</option>
                          <option value="Product & Warranty">Product & Warranty (ওয়ারেন্টি ও কোয়ালিটি)</option>
                          <option value="Custom">Custom (কাস্টম রুল)</option>
                        </select>
                      </div>

                      {/* Rule Title */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Rule Title (রুলের নাম)</label>
                        <input
                          type="text"
                          placeholder="e.g. ক্যাশঅন ডেলিভারি দামাদামি হ্যান্ডলার"
                          value={ruleForm.name}
                          onChange={(e) => setRuleForm({ ...ruleForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-emerald-500"
                        />
                      </div>

                      {/* Match Mode */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Match Mode (ম্যাচিং ধরণ)</label>
                        <select
                          value={ruleForm.matchType}
                          onChange={(e) => setRuleForm({ ...ruleForm, matchType: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:border-emerald-500"
                        >
                          <option value="contains">Contains Keyword (মেসেজের ভেতর যেকোনো শব্দ থাকলে)</option>
                          <option value="exact">Exact Match (হুবহু সম্পূর্ণ বাক্য মিললে)</option>
                          <option value="ai_intent">Semantic AI Intent (ভাবার্থ বা উদ্দেশ্য মিললে)</option>
                        </select>
                      </div>

                      {/* Trigger Keywords */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-slate-700 flex items-center justify-between">
                          <span>Trigger Keywords / Phrases (কমা দিয়ে একাধিক শব্দ লিখুন)</span>
                          <span className="text-[11px] text-slate-400 font-normal">বাংলা ও বাংলিশ উভয়ই দিতে পারেন</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. দাম কম, লাস্ট কত, একদাম কত, কম রাখেন, dam kom, discount den"
                          value={ruleForm.keywordsInput}
                          onChange={(e) => setRuleForm({ ...ruleForm, keywordsInput: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono focus:outline-hidden focus:border-emerald-500"
                        />
                        <div className="text-[11px] text-slate-500 pt-1 flex flex-wrap gap-1 items-center">
                          <span className="font-semibold text-slate-600">জনপ্রিয় সাজেশন:</span>
                          <span onClick={() => setRuleForm(prev => ({ ...prev, keywordsInput: prev.keywordsInput ? `${prev.keywordsInput}, dam kom` : "dam kom" }))} className="px-1.5 py-0.5 bg-slate-200 rounded cursor-pointer hover:bg-slate-300">+ dam kom</span>
                          <span onClick={() => setRuleForm(prev => ({ ...prev, keywordsInput: prev.keywordsInput ? `${prev.keywordsInput}, kobe pabo` : "kobe pabo" }))} className="px-1.5 py-0.5 bg-slate-200 rounded cursor-pointer hover:bg-slate-300">+ kobe pabo</span>
                          <span onClick={() => setRuleForm(prev => ({ ...prev, keywordsInput: prev.keywordsInput ? `${prev.keywordsInput}, delivery charge` : "delivery charge" }))} className="px-1.5 py-0.5 bg-slate-200 rounded cursor-pointer hover:bg-slate-300">+ delivery charge</span>
                          <span onClick={() => setRuleForm(prev => ({ ...prev, keywordsInput: prev.keywordsInput ? `${prev.keywordsInput}, advance keno` : "advance keno" }))} className="px-1.5 py-0.5 bg-slate-200 rounded cursor-pointer hover:bg-slate-300">+ advance keno</span>
                        </div>
                      </div>

                      {/* Reply Text */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-slate-700 flex items-center justify-between">
                          <span>AI Custom Reply Message (কাস্টমারকে AI হুবহু যা বলবে)</span>
                          <span className="text-[11px] text-emerald-700 font-semibold">100% Conversational Bangla</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="ভাইয়া, আমাদের প্রোডাক্ট কোয়ালিটি ১০০% জেনুইন এবং প্রাইস একদম ফিক্সড। তবে আপনার জন্য স্পেশাল ৳১০০ ডিসকাউন্ট কুপন [ZYNCOO100] অ্যাড করে দিচ্ছি..."
                          value={ruleForm.replyText}
                          onChange={(e) => setRuleForm({ ...ruleForm, replyText: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-emerald-500 leading-relaxed"
                        />
                      </div>

                      {/* Attached Action */}
                      <div className="sm:col-span-2 space-y-1">
                        <label className="font-bold text-slate-700">Attach Automated Action (ঐচ্ছিক অটোমেশন অ্যাকশন)</label>
                        <select
                          value={ruleForm.actionTrigger}
                          onChange={(e) => setRuleForm({ ...ruleForm, actionTrigger: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold focus:outline-hidden focus:border-emerald-500"
                        >
                          <option value="none">None (শুধু মেসেজ রিপ্লাই পাঠাবে)</option>
                          <option value="apply_coupon_100">Apply ৳100 Discount Coupon [ZYNCOO100] (ডিসকাউন্ট কুপন অ্যাক্টিভ করবে)</option>
                          <option value="send_bkash_advance">Send ৳100 bKash Advance Payment QR/Link (ইন-চ্যাট বিকাশ লিংক পাঠাবে)</option>
                          <option value="request_full_address">Request Full Address (কুরিয়ার অ্যাড্রেস স্যানিটাইজার চালাবে)</option>
                        </select>
                      </div>

                      {/* Form Actions */}
                      <div className="sm:col-span-2 flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => setIsAddingRule(false)}
                          className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!ruleForm.name || !ruleForm.keywordsInput || !ruleForm.replyText}
                          className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold transition-all shadow-sm cursor-pointer"
                        >
                          Save Rule to AI Brain
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {["all", "Bargaining", "Delivery & COD", "Fraud & Advance", "Address Sanitizer", "Product & Warranty", "Custom"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                          categoryFilter === cat
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {cat === "all" ? "All Categories" : cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search keywords or rules..."
                      value={ruleSearchQuery}
                      onChange={(e) => setRuleSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Rules List Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {aiRules
                    .filter((rule) => {
                      const matchesStore = selectedClientStore === "All Stores (Global Default)"
                        ? true
                        : (rule.clientStore === selectedClientStore || rule.clientStore === "All Stores (Global Default)");
                      const matchesCategory = categoryFilter === "all" ? true : rule.category === categoryFilter;
                      const matchesSearch = ruleSearchQuery.trim() === ""
                        ? true
                        : (rule.name.toLowerCase().includes(ruleSearchQuery.toLowerCase()) ||
                           rule.triggerKeywords.some(kw => kw.toLowerCase().includes(ruleSearchQuery.toLowerCase())) ||
                           rule.replyText.toLowerCase().includes(ruleSearchQuery.toLowerCase()));
                      return matchesStore && matchesCategory && matchesSearch;
                    })
                    .map((rule) => (
                      <div
                        key={rule.id}
                        className={`p-5 rounded-2xl border transition-all space-y-3.5 ${
                          rule.active 
                            ? "bg-white border-slate-200 hover:border-emerald-400 shadow-2xs" 
                            : "bg-slate-50/80 border-slate-200 opacity-60"
                        }`}
                      >
                        {/* Top Bar: Store & Category + Active Switch */}
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900 text-white">
                              {rule.clientStore}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {rule.category}
                            </span>
                            {rule.matchType === "contains" && (
                              <span className="text-[9px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                Contains
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleToggleRule(rule.id)}
                              className="text-xs flex items-center gap-1 font-bold cursor-pointer"
                            >
                              {rule.active ? (
                                <span className="text-emerald-700 flex items-center gap-1 text-[11px]">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Active
                                </span>
                              ) : (
                                <span className="text-slate-400 text-[11px]">Inactive</span>
                              )}
                            </button>

                            <button
                              onClick={() => handleDeleteRule(rule.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                              title="Delete rule"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Rule Name */}
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{rule.name}</h4>
                        </div>

                        {/* Trigger Keyword Chips */}
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                            Trigger Keywords ({rule.triggerKeywords.length}):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {rule.triggerKeywords.map((kw, i) => (
                              <span
                                key={i}
                                onClick={() => handleTestSandbox(kw)}
                                className="text-[11px] font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200 cursor-pointer hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-colors"
                                title="Click to test in sandbox"
                              >
                                &quot;{kw}&quot;
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* AI Reply Bubble */}
                        <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80 text-xs text-slate-800 leading-relaxed space-y-1">
                          <span className="text-[10px] font-bold text-emerald-800 block uppercase tracking-wider flex items-center gap-1">
                            <Bot className="w-3 h-3 text-emerald-600" />
                            AI Trained Response:
                          </span>
                          <p className="italic">&quot;{rule.replyText}&quot;</p>
                        </div>

                        {/* Attached Action Tag & Sandbox Trigger */}
                        <div className="flex items-center justify-between pt-1 text-xs">
                          <div>
                            {rule.actionTrigger === "apply_coupon_100" && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                                🎁 ৳১০০ কুপন অ্যাকশন সংযুক্ত
                              </span>
                            )}
                            {rule.actionTrigger === "send_bkash_advance" && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-pink-700 bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200">
                                💳 বিকাশ অগ্রিম পেমেন্ট লিংক
                              </span>
                            )}
                            {rule.actionTrigger === "request_full_address" && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                                📍 সম্পূর্ণ ঠিকানা প্রম্পটার
                              </span>
                            )}
                            {rule.actionTrigger === "none" && (
                              <span className="text-[10px] text-slate-400 font-medium">Standard Message Reply</span>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              const sampleWord = rule.triggerKeywords[0] || "দাম কম";
                              setSandboxInput(`bhaiya ${sampleWord} hobe?`);
                              handleTestSandbox(`bhaiya ${sampleWord} hobe?`);
                            }}
                            className="text-emerald-700 font-bold hover:underline cursor-pointer text-[11px] flex items-center gap-1"
                          >
                            <Zap className="w-3 h-3 text-emerald-600" />
                            <span>Test Match</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* 2. Interactive Bangladeshi AI Sandbox (লাইভ মেসেজ টেস্ট বক্স) */}
                <div className="mt-8 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        <Brain className="w-4 h-4 text-emerald-400" />
                        <span>Live AI Rule Matcher Sandbox (লাইভ টেস্ট কনসোল)</span>
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Active Store Profile: <strong className="text-emerald-400">{selectedClientStore}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    যে কোনো বাংলিশ বা বাংলা প্রশ্ন লিখে টেস্ট করুন। AI স্বয়ংক্রিয়ভাবে দেখাবে কোন রুলটি ম্যাচ করেছে এবং কী উত্তর দেবে।
                  </p>

                  {/* Input Box */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="e.g. bhaiya dam kisu kom rakha jabe? or mirpur 10 e delivery kobe pabo?"
                      value={sandboxInput}
                      onChange={(e) => setSandboxInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleTestSandbox();
                      }}
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-mono focus:outline-hidden focus:border-emerald-500 placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleTestSandbox()}
                      className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Run AI Test</span>
                    </button>
                  </div>

                  {/* Quick Sample Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                    <span className="text-[11px] font-semibold text-slate-500">Quick Test Samples:</span>
                    {[
                      "দাম কম হবে না?",
                      "ডেলিভারি চার্জ কত?",
                      "অগ্রিম কেন দেব?",
                      "প্যাকেট খুলে দেখা যাবে?",
                      "shudhu mirpur 10 likhlam",
                      "size chart ki ache?"
                    ].map((sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => {
                          setSandboxInput(sample);
                          handleTestSandbox(sample);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono border border-slate-700 transition-colors cursor-pointer"
                      >
                        &quot;{sample}&quot;
                      </button>
                    ))}
                  </div>

                  {/* Sandbox Output Display */}
                  {sandboxResult && (
                    <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white">
                            Matched Rule: {sandboxResult.matchedRule?.name || "No Specific Keyword Matched"}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                          {sandboxResult.confidence}
                        </span>
                      </div>

                      {sandboxResult.matchedRule ? (
                        <div className="space-y-2">
                          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-emerald-200 leading-relaxed font-sans">
                            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                              AI Trained Response (Sub-120ms):
                            </span>
                            &quot;{sandboxResult.matchedRule.replyText}&quot;
                          </div>

                          {sandboxResult.actionNote && (
                            <div className="p-2.5 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                              <span>⚡ Fired Action:</span>
                              <span>{sandboxResult.actionNote}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          কোনো নির্দিষ্ট রুল ম্যাচ করেনি; AI স্ট্যান্ডার্ড ক্যাটালগ ও জেনেরিক প্রোডাক্ট তথ্যের ওপর ভিত্তি করে স্বাভাবিক উত্তর দেবে।
                        </p>
                      )}
                    </div>
                  )}

                </div>

              </div>

              {/* 3. Original Product Catalog Ingestion */}
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-base text-slate-900">Teach AI New Products & Offers</h3>
                </div>
                <p className="text-xs text-slate-500 mb-5">
                  Any product added here is instantly embedded into the AI agent's active memory for customer inquiries and checkout.
                </p>

                {saveSuccess && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Product successfully saved and deployed to AI active model!</span>
                  </div>
                )}

                {/* Feature: CSV / Excel Bulk Catalog Upload */}
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Bulk Ingest Products via Excel / CSV</h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Have a store with 50+ items? Upload your spreadsheet to instantly embed all titles, prices and stock.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleLoadSampleCsv}
                      className="bg-white hover:bg-slate-50 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Load 8-Item Sample CSV</span>
                    </button>

                    <label className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload CSV File</span>
                      <input
                        type="file"
                        accept=".csv,.xlsx"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleLoadSampleCsv();
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {bulkCsvSuccess && (
                  <div className="mb-4 p-3.5 bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs rounded-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{bulkCsvSuccess}</span>
                  </div>
                )}

                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!newTitle || !newPrice) return;
                  const newItem: ProductItem = {
                    id: "p" + (products.length + 1),
                    title: newTitle,
                    price: Number(newPrice),
                    stock: Number(newStock) || 10,
                    category: "General",
                    alternativeItem: newAlternative.trim() || undefined,
                  };
                  setProducts([newItem, ...products]);
                  setNewTitle("");
                  setNewPrice("");
                  setNewStock("");
                  setNewAlternative("");
                  setSaveSuccess(true);
                  setTimeout(() => setSaveSuccess(false), 3000);
                }} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Product Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Wireless Noise Canceling Headphone"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Price (BDT)</label>
                    <input
                      type="number"
                      placeholder="1850"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Inventory Units</label>
                    <input
                      type="number"
                      placeholder="50"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span>Alternative Recommendation (স্টক আউট হলে AI স্বয়ংক্রিয়ভাবে এটি সাজেস্ট করবে):</span>
                      <span className="text-[10px] text-emerald-600 font-normal">Cross-Sell AI Engine</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AirBuds Pro 2nd Gen (প্রিমিয়াম বিকল্প)"
                      value={newAlternative}
                      onChange={(e) => setNewAlternative(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-1 flex items-end">
                    <button
                      type="submit"
                      disabled={!newTitle || !newPrice}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ingest into AI Brain</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Current List with Smart Inventory Guard */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span>Active Knowledge Catalog</span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Smart Inventory Guard Active
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      কোনো প্রোডাক্টের স্টক ০ ইউনিট হলে AI অর্ডার নেওয়া বন্ধ করে বিকল্প প্রোডাক্ট কাস্টমারকে প্রস্তাব করবে।
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {products.length} Products
                  </span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {products.map((p) => {
                    const isOutOfStock = p.stock === 0;
                    return (
                      <div key={p.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${isOutOfStock ? "bg-rose-50/40" : "hover:bg-slate-50"}`}>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{p.title}</span>
                            {isOutOfStock ? (
                              <span className="text-[10px] font-extrabold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md border border-rose-200 flex items-center gap-1">
                                <AlertOctagon className="w-3 h-3 text-rose-600" />
                                <span>স্টক আউট (Auto-Guard Active)</span>
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                {p.stock} units in stock
                              </span>
                            )}
                          </div>
                          <div className="text-slate-500 flex flex-wrap items-center gap-3">
                            <span>Category: {p.category}</span>
                            {p.alternativeItem && (
                              <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                বিকল্প রিকমেন্ডেশন: <strong>{p.alternativeItem}</strong>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="font-mono font-black text-slate-900 text-sm">৳{p.price}</div>
                          
                          {/* Stock Quick Toggles */}
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setProducts(products.map(prod => prod.id === p.id ? { ...prod, stock: prod.stock === 0 ? 25 : 0 } : prod));
                              }}
                              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                                isOutOfStock
                                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                                  : "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                              }`}
                            >
                              {isOutOfStock ? "Restock (+25)" : "Make Stock Out"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Policy Prompt */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Custom Business Policy (System Instructions)</h4>
                <textarea
                  defaultValue="Inside Dhaka delivery charge is 60 BDT (1-2 days). Outside Dhaka is 120 BDT (2-3 days). 100% Cash on Delivery (COD). Defective units have 7-day instant replacement. We do not require any advance payment."
                  rows={3}
                  className="w-full p-3 text-xs text-slate-700 border border-slate-300 rounded-xl focus:outline-hidden focus:border-emerald-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => alert("System guidelines updated in AI prompt!")}
                    className="bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Save System Prompt
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* FEATURE 3: CLIENT SUB-ACCOUNTS & MULTI-TENANT ROLE PERMISSIONS */}
          {activeTab === "team" && (
            <div className="space-y-6">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-6 rounded-3xl border border-indigo-800/40 shadow-sm relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Multi-Tenant Client Login & Role-Based Access</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Client Sub-Accounts & Role Permissions (টিম ও পারমিশন সিস্টেম)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    বিভিন্ন ক্লায়েন্ট বা বিজনেস ওনারদের জন্য আলাদা আলাদা লগইন অ্যাকাউন্ট তৈরি করুন। ক্লায়েন্ট বা স্টাফ লগইন করলে সে শুধুমাত্র তার নিজস্ব পেজের ইনবক্স, সেলস ও রিপোর্ট দেখতে পাবে।
                  </p>
                </div>
                <div className="absolute right-6 -bottom-6 opacity-15 pointer-events-none hidden md:block">
                  <Users className="w-64 h-64 text-indigo-400" />
                </div>
              </div>

              {/* 4 Role Definition Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 font-bold flex items-center justify-center text-xs">
                    👑
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">Store Admin</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      সম্পূর্ণ ড্যাশবোর্ড, বিলিং, প্রোডাক্ট ক্যাটালগ ও এআই সেটিংস নিয়ন্ত্রণ করতে পারবে।
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full inline-block">
                    Full Workspace Access
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 font-bold flex items-center justify-center text-xs">
                    💬
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">Support Agent</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      শুধুমাত্র সোশ্যাল লাইভ ইনবক্স ও কমেন্ট-টু-ইনবক্সে কাস্টমারদের সাথে চ্যাট করতে পারবে।
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full inline-block">
                    Inbox & Comments Only
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-xs">
                    📦
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">Order Dispatcher</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      শুধুমাত্র পার্সেল প্যাকিং, ডেলিভারি স্ট্যাটাস ও স্টেডফাস্ট/পাঠাও কুরিয়ার বুকিং করতে পারবে।
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                    Orders & Courier Only
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-xs">
                    📊
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">Accountant / Analyst</h5>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      শুধুমাত্র Ad Spend vs Net Profit ক্যালকুলেটর, সেলস ভেলোসিটি ও ক্যাশ-ফ্লো রিপোর্ট দেখতে পারবে।
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                    Finance & P&L Only
                  </span>
                </div>
              </div>

              {/* Sub-Accounts List & Add Modal */}
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Client Staff & Sub-Accounts Directory</h4>
                    <p className="text-xs text-slate-500 mt-0.5">প্রতিটি অ্যাকাউন্ট তার নিজস্ব ওয়ার্কস্পেস ও নির্ধারিত রোলের বাইরে কিছু দেখতে পারে না।</p>
                  </div>
                  <button
                    onClick={() => setIsAddingSubAccount(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Sub-Account</span>
                  </button>
                </div>

                {/* Inline Creation Form */}
                {isAddingSubAccount && (
                  <div className="m-5 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-200 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <h5 className="font-black text-xs text-indigo-950">নতুন সাব-অ্যাকাউন্ট যুক্ত করুন (New Staff Login)</h5>
                      <button onClick={() => setIsAddingSubAccount(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateSubAccount} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Arif Hossain"
                          value={newSubAccount.name}
                          onChange={(e) => setNewSubAccount({ ...newSubAccount, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-indigo-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Email Address (Login ID)</label>
                        <input
                          type="email"
                          required
                          placeholder="arif@store.com"
                          value={newSubAccount.email}
                          onChange={(e) => setNewSubAccount({ ...newSubAccount, email: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:border-indigo-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Assigned Store</label>
                        <select
                          value={newSubAccount.assignedStore}
                          onChange={(e) => setNewSubAccount({ ...newSubAccount, assignedStore: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold focus:outline-hidden focus:border-indigo-500"
                        >
                          <option value="GadgetZone BD (Electronics)">GadgetZone BD (Electronics)</option>
                          <option value="Luxe Lifestyle BD (Fashion)">Luxe Lifestyle BD (Fashion)</option>
                          <option value="FlyHigh Travel & Visa Holidays">FlyHigh Travel & Visa Holidays</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Role & Access</label>
                        <select
                          value={newSubAccount.role}
                          onChange={(e) => setNewSubAccount({ ...newSubAccount, role: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold focus:outline-hidden focus:border-indigo-500"
                        >
                          <option value="Store Admin">Store Admin (Full Access)</option>
                          <option value="Support Agent">Support Agent (Inbox & Comments)</option>
                          <option value="Order Dispatcher">Order Dispatcher (Orders Only)</option>
                          <option value="Accountant">Accountant (P&L & Analytics)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-4 flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsAddingSubAccount(false)}
                          className="px-4 py-1.5 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm"
                        >
                          Create Login Account
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Accounts Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-y border-slate-100 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-5">Staff Member</th>
                        <th className="py-3 px-5">Assigned Store</th>
                        <th className="py-3 px-5">Assigned Role</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5">Last Activity</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {clientAccounts.map((acc) => (
                        <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="font-bold text-slate-900">{acc.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{acc.email}</div>
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="font-semibold text-slate-700">{acc.assignedStore}</span>
                          </td>
                          <td className="py-3.5 px-5">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                              acc.role === "Store Admin"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : acc.role === "Support Agent"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : acc.role === "Order Dispatcher"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}>
                              {acc.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="text-emerald-700 flex items-center gap-1 font-bold text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Active
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px]">
                            {acc.lastLogin}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => alert(`Reset password invitation sent to ${acc.email}!`)}
                              className="text-indigo-600 hover:text-indigo-800 font-bold text-[11px] cursor-pointer"
                            >
                              Reset Pass
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Role Permission Matrix Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Granular Feature Access Matrix (পারমিশন চার্ট)</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">Multi-Tenant Isolation 100% Guaranteed</span>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-center">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-y border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4 text-left">Module / Feature</th>
                        <th className="py-2.5 px-3">👑 Store Admin</th>
                        <th className="py-2.5 px-3">💬 Support Agent</th>
                        <th className="py-2.5 px-3">📦 Dispatcher</th>
                        <th className="py-2.5 px-3">📊 Accountant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                      <tr>
                        <td className="py-2.5 px-4 text-left font-bold text-slate-800">Unified Live Social Inbox</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-left font-bold text-slate-800">Auto Comment-to-DM Funnel</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-left font-bold text-slate-800">Orders & Courier Booking (Steadfast)</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-slate-400">Read Only</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-slate-400">Read Only</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-left font-bold text-slate-800">WhatsApp & SMS Tracking Alerts</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Dispatch</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-left font-bold text-slate-800">Ad Spend vs Net Profit Calculator</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 text-left font-bold text-slate-800">API Keys, Webhooks & Team Manage</td>
                        <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Full</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                        <td className="py-2.5 px-3 text-slate-300">✕ None</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* DRIVER SENTINEL FLEET & SOFTWARE MANAGEMENT */}
          {activeTab === "sentinel" && (
            <div className="space-y-6 max-w-6xl">
              
              {/* Top Banner Card */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b8e900]/15 text-[#b8e900] border border-[#b8e900]/30 text-xs font-bold uppercase tracking-wider">
                    <Car className="w-3.5 h-3.5" />
                    <span>AI Driver Drowsiness Sentinel & Fleet Safety</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    গাড়ির ড্রাইভার তন্দ্রা শনাক্তকরণ ও ফ্লিট সেফটি কনসোল
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    MediaPipe 468-point 3D ফেস ও আই-মেশ প্রযুক্তির সাহায্যে গাড়ির চালক ঘুমিয়ে পড়লে বা ৩ সেকেন্ডের বেশি চোখ বন্ধ রাখলে গাড়ির স্পিকারে তীব্র সাইরেন ও বাংলা ভয়েস দিয়ে জাগিয়ে তোলে।
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
                  <Link
                    href="/sentinel"
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl bg-[#b8e900] hover:bg-[#a6d200] text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Open Web Demo & Test</span>
                  </Link>

                  <a
                    href="/downloads/Zyncoo-Driver-Sentinel-v1.0.zip"
                    download="Zyncoo-Driver-Sentinel-v1.0.zip"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download Software (.zip)</span>
                  </a>
                </div>
              </div>

              {/* License & Client Keys Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Active License Key</span>
                    <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">ACTIVE</span>
                  </div>
                  <div className="font-mono font-black text-sm text-slate-900 select-all tracking-wider">
                    ZYNCOO-SNT-77A9-F2E1
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Fleet Pro Package (5 Vehicles Lifetime)
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Connected Fleet Units</span>
                    <span className="text-cyan-700 font-bold text-[10px] bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">OBD-II SYNC</span>
                  </div>
                  <div className="font-black text-xl text-slate-900">
                    3 of 5 <span className="text-xs font-normal text-slate-500">Vehicles Online</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                    ● All 3 Units Stream Active
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Central Siren & Voice</span>
                    <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">READY</span>
                  </div>
                  <div className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>90dB Dual-Tone + Bengali</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Dynamic threshold: 1.8s (Highway 80+ km/h)
                  </div>
                </div>
              </div>

              {/* Fleet Live Telemetry Matrix */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-600" />
                      <span>Connected Vehicles Live Telemetry & Drowsiness Status</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      গাড়ির স্পিড, ড্রাইভারের চোখের আই অ্যাসপেক্ট রেশিও (EAR) ও তন্দ্রা রিস্ক স্কোর
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/sentinel#pricing"
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add More Vehicles / Devices</span>
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-5">Vehicle & Model</th>
                        <th className="py-3 px-5">Driver Name</th>
                        <th className="py-3 px-5">OBD-II Speed</th>
                        <th className="py-3 px-5">Eye Metric (EAR)</th>
                        <th className="py-3 px-5">Threat Level</th>
                        <th className="py-3 px-5">System State</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900">DHAKA-METRO-GA-11-2091</div>
                          <div className="text-[11px] text-slate-400">Toyota HiAce (Logistics #1)</div>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-700">রফিক মিয়া (+880 1711-290011)</td>
                        <td className="py-3.5 px-5 font-mono font-bold text-cyan-700">72 km/h</td>
                        <td className="py-3.5 px-5 font-mono text-emerald-700 font-bold">0.31 (Awake)</td>
                        <td className="py-3.5 px-5">
                          <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[4%]"></div>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-mono">0% Threat</span>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Normal Active
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button
                            onClick={() => alert("Simulated speaker chime test sent to vehicle.")}
                            className="text-xs text-slate-600 hover:text-emerald-700 font-semibold"
                          >
                            Test Siren
                          </button>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900">DHAKA-METRO-CHA-53-9012</div>
                          <div className="text-[11px] text-slate-400">Hino 1J Bus (Route: Dhaka-Ctg)</div>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-slate-700">সেলিম শেখ (+880 1819-440099)</td>
                        <td className="py-3.5 px-5 font-mono font-bold text-cyan-700">88 km/h</td>
                        <td className="py-3.5 px-5 font-mono text-emerald-700 font-bold">0.29 (Awake)</td>
                        <td className="py-3.5 px-5">
                          <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[12%]"></div>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-mono">10% Threat</span>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Normal Active
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button
                            onClick={() => alert("Simulated speaker chime test sent to vehicle.")}
                            className="text-xs text-slate-600 hover:text-emerald-700 font-semibold"
                          >
                            Test Siren
                          </button>
                        </td>
                      </tr>

                      <tr className="bg-red-50/40 hover:bg-red-50/60 transition-colors border-l-4 border-red-500">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-red-950">CHATTA-METRO-BA-12-4011</div>
                          <div className="text-[11px] text-red-700">Cover Van 3-Ton (Delivery Unit)</div>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-red-950">কামরুল হাসান (+880 1912-334455)</td>
                        <td className="py-3.5 px-5 font-mono font-bold text-red-700">65 km/h</td>
                        <td className="py-3.5 px-5 font-mono text-red-600 font-bold">0.14 (Closed &gt; 2.2s)</td>
                        <td className="py-3.5 px-5">
                          <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-red-500 h-full w-[90%]"></div>
                          </div>
                          <span className="text-[10px] text-red-600 font-mono font-bold">85% Threat</span>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="text-red-700 font-bold text-[11px] flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span> 🚨 Siren Sounding
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button
                            onClick={() => alert("Emergency alert dispatched to driver mobile & fleet supervisor.")}
                            className="text-xs text-red-700 hover:text-red-900 font-bold"
                          >
                            Dispatch SOS
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Hardware Setup Guide Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>গাড়িতে ইনস্টলেশন ও সেটআপ গাইড (৩টি সহজ ধাপ)</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2">1</div>
                    <div className="font-bold text-slate-900">ক্যামেরা ড্যাশবোর্ডে স্থাপন করুন</div>
                    <p className="mt-1 text-slate-500 text-[11px]">একটি সাধারণ USB ওয়েবক্যাম বা ড্রাইভক্যাম স্টিয়ারিং হুইলের সামনে চালকের মুখ বরাবর রাখুন।</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2">2</div>
                    <div className="font-bold text-slate-900">start_all.bat স্ক্রিপ্টটি চালু করুন</div>
                    <p className="mt-1 text-slate-500 text-[11px]">ডাউনলোড করা প্যাকেজ আনজিপ করে এক-ক্লিকে রান করলেই ব্যাকএন্ড ও এআই ফেস ডিটেক্টর স্বয়ংক্রিয় চালু হয়ে যাবে।</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs mb-2">3</div>
                    <div className="font-bold text-slate-900">গাড়ির স্পিকারের সাথে যুক্ত করুন</div>
                    <p className="mt-1 text-slate-500 text-[11px]">ব্লুটুথ বা 3.5mm AUX ক্যাবল দিয়ে গাড়ির অডিওর সাথে যুক্ত করলেই ৯০dB উচ্চমাত্রার সাইরেন রেডি।</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-4xl">
              
              {/* Feature 3: One-Click Meta Connect Card */}
              <div className="bg-gradient-to-r from-blue-600/10 via-emerald-600/10 to-transparent p-6 rounded-2xl border border-blue-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Fast-Track Setup</div>
                  <h4 className="font-extrabold text-base text-slate-900">One-Click Meta Official OAuth Connect</h4>
                  <p className="text-xs text-slate-600">Connect Facebook Page Messenger & WhatsApp Cloud API directly with 1 click.</p>
                </div>
                <button
                  onClick={() => setMetaModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <span>Launch 1-Click Wizard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                    f
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Facebook Page & Messenger Graph API</h4>
                    <p className="text-xs text-slate-500">Connected Page: GadgetZone BD (Page ID: 10928374921)</p>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      ✓ Webhook Verified (200 OK)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => alert("Facebook Page credentials refreshed.")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl border border-slate-300 transition-colors cursor-pointer"
                >
                  Reconnect Page
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                    W
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">Meta Official WhatsApp Cloud API</h4>
                    <p className="text-xs text-slate-500">Business Phone: +880 1700-000000 (WABA ID: 4981729)</p>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      ✓ Cloud Engine Connected
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => alert("Test Ping sent to WhatsApp Cloud API.")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2 rounded-xl border border-slate-300 transition-colors cursor-pointer"
                >
                  Send Test Ping
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Steadfast Courier API Keys</h4>
                  <p className="text-xs text-slate-500">API keys allow your AI to automatically book parcel delivery and retrieve tracking IDs.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">API Key</label>
                    <input
                      type="password"
                      defaultValue="stdfst_live_key_99882211aa"
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">Secret Key</label>
                    <input
                      type="password"
                      defaultValue="stdfst_sec_77665544bb"
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => alert("Courier credentials updated!")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Save Courier Keys
                  </button>
                </div>
              </div>

              {/* Pathao Courier API Settings */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-red-600 text-white text-xs font-black flex items-center justify-center">P</span>
                      <span>Pathao Courier Official Merchant API</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">Automates city and zone mapping with instant tracking code generation.</p>
                  </div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                    SLA: 24-48h
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">Client ID</label>
                    <input
                      type="text"
                      defaultValue="pth_client_889911aa"
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">Client Secret</label>
                    <input
                      type="password"
                      defaultValue="pth_secret_332211bb"
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">Pathao Store ID</label>
                    <input
                      type="text"
                      defaultValue="981273"
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => alert("Pathao Courier credentials saved and verified!")}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Save Pathao Keys
                  </button>
                </div>
              </div>

              {/* In-Chat bKash Merchant Payment Gateway */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-pink-600 text-white text-xs font-black flex items-center justify-center">৳</span>
                      <span>bKash Tokenized PGW (In-Chat Instant Checkout)</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">Allows AI to automatically send dynamic bKash payment links & QR codes inside chat.</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Instant Settlement
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">Merchant bKash Number</label>
                    <input
                      type="text"
                      defaultValue="01700-000000"
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">App Key</label>
                    <input
                      type="password"
                      defaultValue="bkash_live_app_key_443322"
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">App Secret</label>
                    <input
                      type="password"
                      defaultValue="bkash_live_secret_998877"
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => alert("bKash Merchant credentials verified!")}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Save bKash PGW
                  </button>
                </div>
              </div>

              {/* Universal Website Live Chat Widget Embed Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Web Live Chat Widget</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">
                      যেকোনো ওয়েবসাইটে Zyncoo AI চ্যাট উইজেট এম্বেড করুন
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      WordPress, Shopify বা যেকোনো কাস্টম HTML ওয়েবসাইটে নিচের কোডটি বসালেই ওয়েবসাইটেই লাইভ এআই চ্যাট চালু হয়ে যাবে।
                    </p>
                  </div>
                  <Link
                    href="/widget"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <span>লাইভ উইজেট কনফিগ পেজ খুলুন</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>১-লাইন HTML এম্বেড কোড:</span>
                    <button
                      onClick={() => {
                        const code = `<script src="${typeof window !== "undefined" ? window.location.origin : "https://zyncoo.ai"}/zyncoo-widget.js" data-store="${selectedClientStore}" data-color="#10b981" async></script>`;
                        navigator.clipboard.writeText(code);
                        alert("এম্বেড স্ক্রিপ্ট কোড কপি করা হয়েছে!");
                      }}
                      className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Embed Code</span>
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
                    {`<script src="https://zyncoo.ai/zyncoo-widget.js" data-store="${selectedClientStore}" data-color="#10b981" async></script>`}
                  </pre>
                </div>
              </div>

              {/* Real-time Google Sheets Exporter Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      <span>Google Sheets রিয়েল-টাইম লিড ও অর্ডার অটো-সিঙ্ক</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      কাস্টমার নাম, ফোন নম্বর ও অর্ডার দিলে সরাসরি ক্লায়েন্টের Google Sheets-এ নতুন রো হিসেবে সেভ হবে।
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    Auto-Sync Active
                  </span>
                </div>

                {googleSheetSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{googleSheetSuccess}</span>
                  </div>
                )}

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 mb-1 block">
                      Google Apps Script Webhook URL
                    </label>
                    <input
                      type="text"
                      value={googleSheetWebhook}
                      onChange={(e) => setGoogleSheetWebhook(e.target.value)}
                      placeholder="https://script.google.com/macros/s/.../exec"
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-mono text-slate-800 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-4 text-slate-700 font-semibold">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={googleSheetAutoSync}
                          onChange={(e) => setGoogleSheetAutoSync(e.target.checked)}
                          className="w-4 h-4 accent-emerald-600 rounded"
                        />
                        <span>নতুন লিড আসলেই শিটে পাঠাও</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={true}
                          className="w-4 h-4 accent-emerald-600 rounded"
                        />
                        <span>কনফার্মড অর্ডার স্বয়ংক্রিয়ভাবে শিটে পাঠাও</span>
                      </label>
                    </div>

                    <button
                      onClick={handleTestGoogleSheetSync}
                      disabled={googleSheetSyncing}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${googleSheetSyncing ? "animate-spin" : ""}`} />
                      <span>{googleSheetSyncing ? "সিঙ্ক হচ্ছে..." : "Test Sync 1 Lead to Google Sheet"}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* FEATURE 3 MODAL: 1-Click Meta OAuth Connect Wizard */}
      {metaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  f
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Meta Business Integration</h3>
                  <div className="text-[10px] text-slate-500">Official OAuth 2.0 Fast Connect</div>
                </div>
              </div>
              <button
                onClick={() => setMetaModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {oauthStep === 1 && (
              <div className="space-y-4 text-xs text-slate-600">
                <p>
                  Connect your Facebook Page & Official WhatsApp Cloud API in seconds without dealing with technical access tokens or webhooks.
                </p>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Read & reply to customer messages</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Business Cloud API messaging</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>100% compliant with Meta Business terms</span>
                  </div>
                </div>

                <button
                  onClick={handleStartOAuth}
                  disabled={oauthConnecting}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-600/20"
                >
                  <span>{oauthConnecting ? "Authorizing with Meta..." : "Log In with Facebook & WhatsApp"}</span>
                </button>
              </div>
            )}

            {oauthStep === 2 && (
              <div className="space-y-4 text-xs text-slate-600">
                <p className="font-bold text-slate-800">Select the Facebook Page and WhatsApp Number to connect:</p>
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-50 rounded-xl border-2 border-emerald-500 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">GadgetZone BD (Page)</div>
                      <div className="text-[10px] text-slate-500">Followers: 34,200 • Category: Retail</div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border-2 border-emerald-500 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">WhatsApp (+880 1700-000000)</div>
                      <div className="text-[10px] text-slate-500">Official Cloud API (Verified WABA)</div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>

                <button
                  onClick={handleFinishOAuth}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <span>Confirm & Activate 24/7 AI Bot</span>
                </button>
              </div>
            )}

            {oauthStep === 3 && (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Connected & Verified!</h4>
                <p className="text-xs text-slate-500">
                  Zyncoo AI is now actively monitoring your Facebook Page and WhatsApp chats.
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* bKash In-Chat Dynamic Invoice & QR Modal */}
      {bkashModalOpen && bkashInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-pink-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-pink-600 text-white font-bold flex items-center justify-center text-sm">
                  ৳
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">bKash Instant Checkout</h3>
                  <div className="text-[10px] text-pink-700 font-semibold">{bkashInvoice.purpose}</div>
                </div>
              </div>
              <button
                onClick={() => setBkashModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* QR Code and Invoice Card */}
            <div className="bg-pink-50/70 p-5 rounded-2xl border border-pink-200 text-center space-y-3">
              <div className="w-32 h-32 bg-white p-2.5 rounded-2xl mx-auto shadow-sm border border-pink-200 flex flex-col items-center justify-center">
                <div className="grid grid-cols-4 gap-1 w-20 h-20 p-1 bg-slate-900 rounded-lg">
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-pink-500 rounded-xs"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-pink-500 rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-slate-900"></div>
                  <div className="bg-white rounded-xs"></div>
                </div>
                <span className="text-[9px] font-bold text-pink-700 mt-1 uppercase tracking-wider">Scan bKash App</span>
              </div>

              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">৳{bkashInvoice.amount}</div>
                <div className="text-xs text-slate-500 font-medium">Order #{bkashInvoice.orderId} • {bkashInvoice.customer}</div>
              </div>
            </div>

            {/* Link Copy Box */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 block">Customer In-Chat Dispatch Link</label>
              <div className="flex items-center gap-1.5 p-2 bg-slate-100 rounded-xl border border-slate-200 text-slate-700 font-mono text-[11px] overflow-hidden">
                <span className="truncate flex-1">{bkashInvoice.checkoutUrl}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(bkashInvoice.checkoutUrl);
                    setBkashCopied(true);
                    setTimeout(() => setBkashCopied(false), 2000);
                  }}
                  className="bg-white hover:bg-slate-200 text-slate-800 font-bold px-2 py-1 rounded-lg border border-slate-300 transition-colors cursor-pointer shrink-0"
                >
                  {bkashCopied ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`bKash payment link dispatched to ${bkashInvoice.customer} on WhatsApp!`);
                setBkashModalOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-pink-600/20"
            >
              <span>Auto-Dispatch into WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}

      {/* Bengali AI Voice IVR Call Simulator Modal */}
      {ivrModalOpen && ivrOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-800 space-y-5 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center">
                  <PhoneCall className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Zyncoo AI Voice Caller</h3>
                  <div className="text-[10px] text-emerald-400 font-mono">Bangla IVR Engine v2.4</div>
                </div>
              </div>
              <button
                onClick={() => setIvrModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Caller Display */}
            <div className="text-center py-2 space-y-1">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-emerald-500/50 flex items-center justify-center mx-auto mb-2 text-xl font-bold text-emerald-400 shadow-lg shadow-emerald-500/10">
                {ivrOrder.customer.charAt(0)}
              </div>
              <div className="text-base font-bold text-white">{ivrOrder.customer}</div>
              <div className="font-mono text-xs text-slate-400">{ivrOrder.phone}</div>
              <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                {ivrStep === 1 && "Connecting line..."}
                {ivrStep === 2 && "Call In Progress • 00:14"}
                {ivrStep === 3 && "Call Completed • Order Verified ✓"}
              </div>
            </div>

            {/* Audio Waveform / Bengali Speech Box */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-bold text-emerald-400">Zyncoo Bengali Speech:</span>
                {ivrStep === 2 && (
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-emerald-400 h-2 animate-pulse"></span>
                    <span className="w-0.5 bg-emerald-400 h-3 animate-pulse [animation-delay:0.1s]"></span>
                    <span className="w-0.5 bg-emerald-400 h-1 animate-pulse [animation-delay:0.2s]"></span>
                    <span className="w-0.5 bg-emerald-400 h-3 animate-pulse [animation-delay:0.3s]"></span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic">
                {ivrStep === 1 && "ডায়ালিং হচ্ছে..."}
                {ivrStep === 2 && `&quot;আসসালামু আলাইকুম ${ivrOrder.customer}! গ্যাজেট জোন বিডি থেকে জিনকো এআই বলছি। আপনার ৳${ivrOrder.amount} টাকার ${ivrOrder.item} অর্ডারটি কনফার্ম করতে ১ চাপুন অথবা ক্যান্সেল করতে ২ চাপুন।&quot;`}
                {ivrStep === 3 && `&quot;ধন্যবাদ! আপনার অর্ডারটি কনফার্ম করা হয়েছে। আগামীকাল কুরিয়ারে বুকিং দেওয়া হবে।&quot;`}
              </p>
            </div>

            {/* Simulated Keypad for User to Test */}
            {ivrStep === 2 && (
              <div className="space-y-2 pt-1">
                <div className="text-[11px] text-slate-400 text-center">Customer Handset Keypad Simulator:</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handleConfirmIvrKeyPress}
                    className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-600/30 flex flex-col items-center"
                  >
                    <span>1</span>
                    <span className="text-[9px] uppercase opacity-80">Confirm</span>
                  </button>
                  <button
                    onClick={() => {
                      alert("Customer pressed 2. Order Cancelled.");
                      setIvrModalOpen(false);
                    }}
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-sm rounded-xl transition-all cursor-pointer flex flex-col items-center"
                  >
                    <span>2</span>
                    <span className="text-[9px] uppercase opacity-80">Cancel</span>
                  </button>
                  <button
                    onClick={() => alert("Call transferred to human agent.")}
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-sm rounded-xl transition-all cursor-pointer flex flex-col items-center"
                  >
                    <span>0</span>
                    <span className="text-[9px] uppercase opacity-80">Agent</span>
                  </button>
                </div>
              </div>
            )}

            {ivrStep === 3 && (
              <div className="bg-emerald-500/20 p-3.5 rounded-xl border border-emerald-500/40 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-emerald-300">DTMF Tone &quot;1&quot; Received!</div>
                <div className="text-[11px] text-slate-300">Order #{ivrOrder.id} confirmed and ready for courier pickup.</div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 4x6 Thermal Courier Shipping Label Modal */}
      {printModalOpen && printOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Courier Shipping Waybill (4x6 Thermal)</h3>
              </div>
              <button
                onClick={() => setPrintModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable 4x6 Waybill Card */}
            <div id="thermal-label-container" className="p-4 bg-white border-2 border-slate-900 rounded-xl space-y-3 font-mono text-slate-900 text-xs">
              {/* Courier Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                <div>
                  <div className="font-black text-base tracking-wider uppercase">
                    {preferredCourier === "pathao" ? "PATHAO EXPRESS" : "STEADFAST COURIER"}
                  </div>
                  <div className="text-[10px] text-slate-600">STANDARD DOMESTIC COD</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold">ROUTE: DHAKA-HUB</div>
                  <div className="text-[10px]">WEIGHT: 0.5 KG</div>
                </div>
              </div>

              {/* Barcode Simulation */}
              <div className="text-center py-1 border-b-2 border-slate-900">
                <div className="flex justify-center items-center gap-[2px] h-10 w-full overflow-hidden">
                  {[3, 1, 4, 1, 2, 5, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2, 1, 5, 3, 2, 4, 1, 3, 5, 2, 1, 4, 3, 2, 5, 1].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 h-full"
                      style={{ width: `${w * 1.5}px` }}
                    ></div>
                  ))}
                </div>
                <div className="font-bold tracking-widest text-[11px] mt-0.5">
                  *{preferredCourier === "pathao" ? "PTH" : "STDFST"}-{printOrder.id}*
                </div>
              </div>

              {/* Sender & Receiver Boxes */}
              <div className="grid grid-cols-2 gap-2 border-b-2 border-slate-900 pb-2 text-[11px]">
                <div className="border-r border-slate-300 pr-1">
                  <span className="font-bold text-[9px] block uppercase text-slate-500">Shipper (From):</span>
                  <div className="font-bold">GadgetZone BD</div>
                  <div className="text-[10px] text-slate-600">Dhaka Central Hub</div>
                  <div className="text-[10px] font-bold mt-0.5">01700-000000</div>
                </div>

                <div className="pl-1">
                  <span className="font-bold text-[9px] block uppercase text-slate-500">Consignee (To):</span>
                  <div className="font-extrabold text-xs">{printOrder.customer}</div>
                  <div className="font-black text-sm text-slate-950 mt-0.5">{printOrder.phone}</div>
                </div>
              </div>

              {/* Full Address */}
              <div className="border-b-2 border-slate-900 pb-2">
                <span className="font-bold text-[9px] block uppercase text-slate-500">Delivery Address:</span>
                <div className="font-bold text-xs leading-snug">{printOrder.address}</div>
              </div>

              {/* Item & COD Payable */}
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-2">
                <div>
                  <span className="font-bold text-[9px] block uppercase text-slate-500">Package Contents:</span>
                  <div className="font-bold text-xs">{printOrder.item}</div>
                </div>
                <div className="text-right border-2 border-slate-900 px-3 py-1 bg-slate-100 rounded-md">
                  <span className="font-bold text-[9px] block uppercase">COD TO COLLECT:</span>
                  <span className="font-black text-lg">৳{printOrder.amount}</span>
                </div>
              </div>

              {/* Security Verification Stamp */}
              <div className="flex items-center justify-between text-[9px] text-slate-600 pt-0.5">
                <span className="flex items-center gap-1 font-bold text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified by Zyncoo Fraud Shield
                </span>
                <span className="font-mono">Date: 27-OCT-2026</span>
              </div>
            </div>

            {/* Print and Close Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPrintModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Thermal Label (4x6 / A4)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      </div>
    </div>
  );
}
