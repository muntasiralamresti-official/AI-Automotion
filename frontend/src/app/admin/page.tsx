"use client";

import { useState } from "react";
import Link from "next/link";
import ZyncooLogo from "@/components/ZyncooLogo";
import {
  ShieldAlert,
  Users,
  DollarSign,
  Activity,
  Cpu,
  Server,
  CreditCard,
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  ExternalLink,
  PauseCircle,
  PlayCircle,
  TrendingUp,
  Bot,
  AlertTriangle,
  ArrowUpRight,
  Database,
  Radio,
  FileText,
  Key,
  LayoutDashboard,
  Download,
  Send,
  Building,
  Ban,
  LogIn,
  Sparkles,
  Phone,
  Check,
  Globe,
  RefreshCw,
  Package,
  Brain,
  Plus,
  Trash2,
  Edit3,
  Filter,
  Tag,
  X,
  CheckSquare,
  Stethoscope,
  GraduationCap,
  Plane,
  Coffee,
  ShieldCheck,
  Car,
  Copy,
  Smartphone,
  Zap
} from "lucide-react";

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

interface ClientStore {
  id: string;
  name: string;
  owner: string;
  phone: string;
  plan: "Starter" | "Growth Pro" | "Enterprise";
  status: "Active" | "Trial" | "Overdue" | "Suspended";
  channels: string[];
  conversationsThisMonth: number;
  apiCostUSD: number;
  revenueBDT: number;
  joinedDate: string;
}

interface PaymentRecord {
  id: string;
  storeName: string;
  customerPhone?: string;
  serviceType: "Subscription Plan" | "Driver Sentinel Kit" | "Leads Pack";
  method: "bKash" | "Nagad" | "bKash Merchant" | "Rocket" | "Stripe" | "Bank";
  trxId: string;
  amountBDT: number;
  status: "Verified" | "Pending Approval" | "Auto Verified (SMS)" | "Rejected";
  verifiedVia?: "Manual 1-Click" | "Auto SMS Webhook" | "bKash PGW API";
  date: string;
}

interface LeadOrder {
  id: string;
  buyerName: string;
  phone: string;
  packTitle: string;
  category: string;
  leadsCount: number;
  method: "bKash" | "Nagad";
  trxId: string;
  amountBDT: number;
  status: "Payment Verified" | "Awaiting Payment" | "Dispatched";
  date: string;
  leadsCsvName: string;
}

interface AgencyPartner {
  id: string;
  agencyName: string;
  founderName: string;
  phone: string;
  customDomain: string;
  clientsCount: number;
  wholesaleRatePerClient: number;
  retailClientPrice: number;
  totalWholesaleBDT: number;
  agencyProfitBDT: number;
  affiliateCommissionBDT: number;
  cnameStatus: "Verified" | "Pending DNS";
  status: "Active" | "Pending Approval";
  joinedDate: string;
}

interface FraudEntry {
  phone: string;
  customerName: string;
  fakeDeliveryAttempts: number;
  blockedSavingBDT: number;
  reportedByStores: string[];
  riskScore: number;
  lastAttempt: string;
  reason: string;
}

export default function SuperAdminPage() {
  const [adminTab, setAdminTab] = useState<
    "overview" | "clients" | "leads" | "agencies" | "sentinel" | "fraud-blacklist" | "billing" | "llm" | "features" | "training"
  >("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [blacklistSearch, setBlacklistSearch] = useState("");
  const [newFraudPhone, setNewFraudPhone] = useState("");
  const [newFraudName, setNewFraudName] = useState("");
  const [newFraudReason, setNewFraudReason] = useState("");
  const [primaryModel, setPrimaryModel] = useState<"gemini-flash" | "claude-sonnet" | "gpt-4o-mini">("gemini-flash");

  // Sample Client Stores
  const [clients, setClients] = useState<ClientStore[]>([
    {
      id: "CLI-101",
      name: "GadgetZone BD",
      owner: "Zubair Rahman",
      phone: "+880 1711-223344",
      plan: "Growth Pro",
      status: "Active",
      channels: ["WhatsApp", "Messenger"],
      conversationsThisMonth: 4820,
      apiCostUSD: 14.5,
      revenueBDT: 4990,
      joinedDate: "12 Oct 2026",
    },
    {
      id: "CLI-102",
      name: "FashionHub Dhaka",
      owner: "Farhana Mehnaz",
      phone: "+880 1819-998877",
      plan: "Growth Pro",
      status: "Active",
      channels: ["Messenger", "Instagram"],
      conversationsThisMonth: 3910,
      apiCostUSD: 11.8,
      revenueBDT: 4990,
      joinedDate: "18 Oct 2026",
    },
    {
      id: "CLI-103",
      name: "Organic Honey & Foods",
      owner: "Rafiqul Islam",
      phone: "+880 1912-334455",
      plan: "Starter",
      status: "Trial",
      channels: ["WhatsApp"],
      conversationsThisMonth: 620,
      apiCostUSD: 2.1,
      revenueBDT: 0,
      joinedDate: "21 Oct 2026",
    },
    {
      id: "CLI-104",
      name: "Aura Skincare Essentials",
      owner: "Tanzeem Ahmed",
      phone: "+880 1611-445566",
      plan: "Enterprise",
      status: "Active",
      channels: ["WhatsApp", "Messenger", "Instagram"],
      conversationsThisMonth: 12450,
      apiCostUSD: 38.2,
      revenueBDT: 9990,
      joinedDate: "05 Oct 2026",
    },
    {
      id: "CLI-105",
      name: "SneakerBox Bangladesh",
      owner: "Shahriar Kabir",
      phone: "+880 1722-887766",
      plan: "Starter",
      status: "Overdue",
      channels: ["Messenger"],
      conversationsThisMonth: 1140,
      apiCostUSD: 3.4,
      revenueBDT: 2490,
      joinedDate: "28 Sep 2026",
    },
  ]);

  // Payment receipts
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: "PAY-501",
      storeName: "GadgetZone BD",
      customerPhone: "+880 1711-223344",
      serviceType: "Subscription Plan",
      method: "bKash Merchant",
      trxId: "BKH982716382",
      amountBDT: 4990,
      status: "Verified",
      verifiedVia: "bKash PGW API",
      date: "Today, 09:30 AM",
    },
    {
      id: "PAY-502",
      storeName: "Organic Honey & Foods",
      customerPhone: "+880 1912-334455",
      serviceType: "Subscription Plan",
      method: "Nagad",
      trxId: "NGD882736152",
      amountBDT: 2490,
      status: "Pending Approval",
      date: "Today, 02:15 AM",
    },
    {
      id: "PAY-503",
      storeName: "Tanvir Logistics (Private Car)",
      customerPhone: "+880 1819-331122",
      serviceType: "Driver Sentinel Kit",
      method: "bKash",
      trxId: "BK99120485",
      amountBDT: 4490,
      status: "Pending Approval",
      date: "Today, 03:10 AM",
    },
    {
      id: "PAY-504",
      storeName: "Dhaka Gadget Hub",
      customerPhone: "+880 1712-345678",
      serviceType: "Leads Pack",
      method: "bKash",
      trxId: "BK771029110",
      amountBDT: 2490,
      status: "Auto Verified (SMS)",
      verifiedVia: "Auto SMS Webhook",
      date: "Yesterday",
    },
    {
      id: "PAY-505",
      storeName: "Aura Skincare Essentials",
      customerPhone: "+880 1611-445566",
      serviceType: "Subscription Plan",
      method: "Stripe",
      trxId: "ch_3Pz81729381",
      amountBDT: 9990,
      status: "Verified",
      verifiedVia: "Manual 1-Click",
      date: "Oct 28",
    },
  ]);

  // Feature flags
  const [featureFlags, setFeatureFlags] = useState({
    voiceNotes: true,
    imageOcr: true,
    courierAutoSync: true,
    newRegistration: true,
  });

  const handleToggleStoreStatus = (id: string) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === "Active" ? "Suspended" : "Active";
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  // Onboard New Client State & Handlers
  const [isOnboardingClient, setIsOnboardingClient] = useState(false);
  const [newClientForm, setNewClientForm] = useState<{
    storeName: string;
    ownerName: string;
    phone: string;
    plan: "Starter" | "Growth Pro" | "Enterprise";
    status: "Active" | "Trial";
    channels: string[];
    industry: string;
    loginEmail: string;
    loginPassword: string;
  }>({
    storeName: "",
    ownerName: "",
    phone: "+880 1",
    plan: "Growth Pro",
    status: "Active",
    channels: ["WhatsApp", "Messenger"],
    industry: "E-Commerce & Gadget Shop",
    loginEmail: "",
    loginPassword: "",
  });
  const [clientOnboardSuccess, setClientOnboardSuccess] = useState<{
    storeName: string;
    ownerName: string;
    phone: string;
    id: string;
    plan: string;
    email: string;
    pass: string;
  } | null>(null);

  const handleCreateNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientForm.storeName.trim() || !newClientForm.ownerName.trim()) return;

    const newId = `CLI-${100 + clients.length + 1}`;
    const cleanPhone = newClientForm.phone.trim() || "+880 1711-000000";
    const rev = newClientForm.status === "Trial" ? 0 : (newClientForm.plan === "Starter" ? 2490 : newClientForm.plan === "Enterprise" ? 9990 : 4990);
    const storeSlug = newClientForm.storeName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    const generatedEmail = newClientForm.loginEmail.trim() || `${storeSlug}@store.zyncoo.ai`;
    const generatedPassword = newClientForm.loginPassword.trim() || `Zyncoo@${Math.floor(1000 + Math.random() * 9000)}`;

    const newStore: ClientStore = {
      id: newId,
      name: newClientForm.storeName.trim(),
      owner: newClientForm.ownerName.trim(),
      phone: cleanPhone,
      plan: newClientForm.plan,
      status: newClientForm.status,
      channels: newClientForm.channels.length > 0 ? newClientForm.channels : ["WhatsApp"],
      conversationsThisMonth: 0,
      apiCostUSD: 0,
      revenueBDT: rev,
      joinedDate: "Today",
    };

    setClients([newStore, ...clients]);

    // Register into AI training store selector
    if (!clientStores.includes(newStore.name)) {
      setClientStores((prev) => [...prev, newStore.name]);
    }

    setClientOnboardSuccess({
      storeName: newStore.name,
      ownerName: newStore.owner,
      phone: newStore.phone,
      id: newId,
      plan: newStore.plan,
      email: generatedEmail,
      pass: generatedPassword,
    });

    setIsOnboardingClient(false);
    setNewClientForm({
      storeName: "",
      ownerName: "",
      phone: "+880 1",
      plan: "Growth Pro",
      status: "Active",
      channels: ["WhatsApp", "Messenger"],
      industry: "E-Commerce & Gadget Shop",
      loginEmail: "",
      loginPassword: "",
    });
  };

  const handleApprovePayment = (id: string, via: "Manual 1-Click" | "Auto SMS Webhook" = "Manual 1-Click") => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Verified", verifiedVia: via } : p))
    );
  };

  const handleRejectPayment = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p))
    );
  };

  // State for Billing Mode & SMS Webhook Simulator
  const [billingSubTab, setBillingSubTab] = useState<"queue" | "webhook">("queue");
  const [smsTestInput, setSmsTestInput] = useState(
    "You have received Tk 4,490.00 from 01819331122. Ref: ZYNCOO. Fee Tk 0.00. Balance Tk 62,700.35. TrxID BK99120485 at 30/10/2026 03:20"
  );
  const [smsSimulationResult, setSmsSimulationResult] = useState<any>(null);
  const [isSimulatingSms, setIsSimulatingSms] = useState(false);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  const handleRunSmsSimulation = async () => {
    setIsSimulatingSms(true);
    try {
      const res = await fetch("/api/payment/sms-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sms: smsTestInput }),
      });
      const data = await res.json();
      setSmsSimulationResult(data);

      if (data.success && data.parsed && data.parsed.trxId) {
        const foundTrx = data.parsed.trxId;
        // Auto-match and approve in payments list
        setPayments((prev) =>
          prev.map((p) =>
            p.trxId.toUpperCase() === foundTrx.toUpperCase()
              ? { ...p, status: "Auto Verified (SMS)", verifiedVia: "Auto SMS Webhook" }
              : p
          )
        );
      }
    } catch (e) {
      alert("Error sending test SMS to webhook.");
    } finally {
      setIsSimulatingSms(false);
    }
  };

  // Lead Orders Queue
  const [leadOrders, setLeadOrders] = useState<LeadOrder[]>([
    {
      id: "LD-801",
      buyerName: "Tanvir Hasan (Dhaka Gadgets)",
      phone: "+880 1712-345678",
      packTitle: "500 Niche Buyer Leads",
      category: "Tech & Gadgets",
      leadsCount: 500,
      method: "bKash",
      trxId: "BK99120485",
      amountBDT: 2490,
      status: "Payment Verified",
      date: "Today, 11:20 AM",
      leadsCsvName: "500_tech_gadget_verified_leads.csv"
    },
    {
      id: "LD-802",
      buyerName: "Mahinur Begum (Modest Wear BD)",
      phone: "+880 1819-223344",
      packTitle: "1,500 VIP Buyer Leads",
      category: "Fashion & Clothing",
      leadsCount: 1500,
      method: "Nagad",
      trxId: "NG77812903",
      amountBDT: 5990,
      status: "Awaiting Payment",
      date: "Today, 09:45 AM",
      leadsCsvName: "1500_fashion_clothing_vip_leads.csv"
    },
    {
      id: "LD-803",
      buyerName: "Saiful Alam (NexGen Media)",
      phone: "+880 1911-889900",
      packTitle: "1,000+ B2B Merchant Leads",
      category: "B2B Wholesalers & Importers",
      leadsCount: 1000,
      method: "bKash",
      trxId: "BK88371940",
      amountBDT: 8990,
      status: "Dispatched",
      date: "Yesterday",
      leadsCsvName: "1000_b2b_merchant_importers.csv"
    }
  ]);

  // Agency White-Label Partners
  const [agencies, setAgencies] = useState<AgencyPartner[]>([
    {
      id: "AG-01",
      agencyName: "ScaleUp BD Digital",
      founderName: "Farhan Chowdhury",
      phone: "+880 1715-443322",
      customDomain: "ai.scaleupbd.com",
      clientsCount: 18,
      wholesaleRatePerClient: 4990,
      retailClientPrice: 8000,
      totalWholesaleBDT: 89820,
      agencyProfitBDT: 54180,
      affiliateCommissionBDT: 17964,
      cnameStatus: "Verified",
      status: "Active",
      joinedDate: "15 Sep 2026"
    },
    {
      id: "AG-02",
      agencyName: "GrowFunnel Agency",
      founderName: "Zubair Siddique",
      phone: "+880 1822-998811",
      customDomain: "bot.growfunnel.net",
      clientsCount: 9,
      wholesaleRatePerClient: 4990,
      retailClientPrice: 7500,
      totalWholesaleBDT: 44910,
      agencyProfitBDT: 22590,
      affiliateCommissionBDT: 8982,
      cnameStatus: "Verified",
      status: "Active",
      joinedDate: "02 Oct 2026"
    },
    {
      id: "AG-03",
      agencyName: "EcomGrowth Studio",
      founderName: "Nabila Nawar",
      phone: "+880 1618-332211",
      customDomain: "ai.ecomgrowth.xyz",
      clientsCount: 4,
      wholesaleRatePerClient: 4990,
      retailClientPrice: 8500,
      totalWholesaleBDT: 19960,
      agencyProfitBDT: 14040,
      affiliateCommissionBDT: 3992,
      cnameStatus: "Pending DNS",
      status: "Pending Approval",
      joinedDate: "20 Oct 2026"
    }
  ]);

  // Central Threat Blacklist
  const [fraudBlacklist, setFraudBlacklist] = useState<FraudEntry[]>([
    {
      phone: "+880 1788-990011",
      customerName: "Ashiqur Rahman (Fraud Ring)",
      fakeDeliveryAttempts: 7,
      blockedSavingBDT: 10500,
      reportedByStores: ["GadgetZone BD", "SneakerBox BD", "StyleHub"],
      riskScore: 99,
      lastAttempt: "2 hours ago",
      reason: "Repeated Fake Address & courier doorstep refusal in Chittagong"
    },
    {
      phone: "+880 1912-445588",
      customerName: "Kamrul Hasan",
      fakeDeliveryAttempts: 5,
      blockedSavingBDT: 7500,
      reportedByStores: ["Aura Skincare", "FashionHub Dhaka"],
      riskScore: 94,
      lastAttempt: "Yesterday",
      reason: "Number switched off when courier delivery boy arrives"
    },
    {
      phone: "+880 1622-331122",
      customerName: "Unknown / Competitor Bot",
      fakeDeliveryAttempts: 8,
      blockedSavingBDT: 12000,
      reportedByStores: ["GadgetZone BD", "Organic Honey"],
      riskScore: 98,
      lastAttempt: "3 days ago",
      reason: "Mass auto-order high value items without answering OTP call"
    }
  ]);

  // Handlers for Leads
  const handleVerifyLeadOrder = (id: string) => {
    setLeadOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: "Payment Verified" } : order
      )
    );
  };

  const handleDownloadSampleCsv = (order: LeadOrder) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(
        `Full Name,Phone Number,City,Delivery Reliability Rate,Niche Category,Estimated Monthly Spend\n` +
          `Rafiqul Islam,01712349001,Dhaka Dhanmondi,98%,${order.category},৳12500\n` +
          `Tamanna Afreen,01819283746,Chattogram GEC,95%,${order.category},৳8900\n` +
          `Sabbir Ahmed,01912837465,Sylhet Zindabazar,92%,${order.category},৳14200\n` +
          `Kazi Farzana,01611928374,Dhaka Uttara,96%,${order.category},৳6800\n` +
          `Nayeem Chowdhury,01755839201,Rajshahi Shaheb Bazar,94%,${order.category},৳9500\n`
      );
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", order.leadsCsvName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDispatchLead = (order: LeadOrder) => {
    setLeadOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "Dispatched" } : o))
    );
    const cleanPhone = order.phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `Hello ${order.buyerName}! Your verified Zyncoo AI Lead Pack [${order.packTitle}] (${order.leadsCount} leads) is ready for download. Trx ID: ${order.trxId}. Download link: https://zyncoo.ai/vault/leads/${order.id}. Thank you for scaling with Zyncoo AI!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  // Handlers for Agencies
  const handleDisburseAffiliate = (agency: AgencyPartner) => {
    alert(
      `✅ bKash Payout of ৳${agency.affiliateCommissionBDT.toLocaleString()} successfully queued to ${agency.founderName} (${agency.phone}) for Agency [${agency.agencyName}]!`
    );
  };

  // Handlers for Fraud Blacklist
  const handleAddFraud = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFraudPhone.trim()) return;
    const entry: FraudEntry = {
      phone: newFraudPhone.trim(),
      customerName: newFraudName.trim() || "Flagged Suspicious Customer",
      fakeDeliveryAttempts: 3,
      blockedSavingBDT: 4500,
      reportedByStores: ["HQ Global Admin"],
      riskScore: 95,
      lastAttempt: "Just now",
      reason: newFraudReason.trim() || "Manual Super Admin Blacklist"
    };
    setFraudBlacklist([entry, ...fraudBlacklist]);
    setNewFraudPhone("");
    setNewFraudName("");
    setNewFraudReason("");
    alert(`🚨 Number ${entry.phone} added to platform-wide Fraud Blacklist!`);
  };

  const handleRemoveFraud = (phone: string) => {
    setFraudBlacklist((prev) => prev.filter((f) => f.phone !== phone));
  };

  // Client-Wise AI Keyword Training & Custom Q&A Rules State
  const [clientStores, setClientStores] = useState<string[]>([
    "All Stores (Global Default)",
    "GadgetZone BD",
    "FashionHub Dhaka",
    "Organic Honey & Foods",
    "Apex Dental & Medical Care",
    "Skyline Luxury Properties BD",
    "ByteCraft IT Academy",
    "FlyHigh Travel & Visa",
  ]);
  const [selectedClientStore, setSelectedClientStore] = useState<string>("All Stores (Global Default)");
  const [ruleSearchQuery, setRuleSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddingRule, setIsAddingRule] = useState<boolean>(false);
  const [ruleSaveMessage, setRuleSaveMessage] = useState<string | null>(null);

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
      targetClient: "ByteCraft IT Academy",
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
      targetClient: "FlyHigh Travel & Visa",
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
      targetClient: "GadgetZone BD",
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
      clientStore: "FashionHub Dhaka",
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
      clientStore: "GadgetZone BD",
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

  const handleTestSandbox = (testText?: string) => {
    const query = (testText ?? sandboxInput).trim().toLowerCase();
    if (!query) return;

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

  const filteredBlacklist = fraudBlacklist.filter(
    (f) =>
      f.phone.includes(blacklistSearch) ||
      f.customerName.toLowerCase().includes(blacklistSearch.toLowerCase()) ||
      f.reason.toLowerCase().includes(blacklistSearch.toLowerCase())
  );

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      
      {/* Super Admin Dark Sidebar */}
      <aside className="w-full md:w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-1 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-sm shrink-0">
                <ZyncooLogo className="w-9 h-9 rounded-lg" />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-base text-white tracking-wide flex items-center gap-1.5 whitespace-nowrap">
                  <span>zyncoo</span>
                  <span className="text-[#b8e900]">.ai</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#b8e900]/15 text-[#b8e900] border border-[#b8e900]/30 rounded font-bold uppercase shrink-0">HQ</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1 mt-0.5 whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Super Admin Panel</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick System Badge */}
          <div className="mx-3.5 my-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800/80 backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Platform Status</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Operational
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono flex items-center justify-between border-t border-slate-800/80 pt-2">
              <span>Server Load: <strong className="text-slate-200">18%</strong></span>
              <span className="text-emerald-400 font-medium">0 Errors</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1 text-xs">
            <button
              onClick={() => setAdminTab("overview")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "overview"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Activity className={`w-4 h-4 shrink-0 ${adminTab === "overview" ? "text-emerald-400" : "text-slate-400"}`} />
                <span className="truncate whitespace-nowrap">Platform Analytics</span>
              </div>
            </button>

            <button
              onClick={() => setAdminTab("clients")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "clients"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Users className={`w-4 h-4 shrink-0 ${adminTab === "clients" ? "text-emerald-400" : "text-slate-400"}`} />
                <span className="truncate whitespace-nowrap">Client Businesses</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 whitespace-nowrap ${
                adminTab === "clients"
                  ? "bg-emerald-500/25 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-800 text-slate-400 border-slate-700/60"
              }`}>
                {clients.length}
              </span>
            </button>

            <button
              onClick={() => setAdminTab("training")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "training"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Brain className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate whitespace-nowrap">AI Rules & Training</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0 whitespace-nowrap">
                {aiRules.length} Rules
              </span>
            </button>

            <button
              onClick={() => setAdminTab("leads")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "leads"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Package className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate whitespace-nowrap">Lead Store Orders</span>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 shrink-0 whitespace-nowrap">
                2 Pending
              </span>
            </button>

            <button
              onClick={() => setAdminTab("agencies")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "agencies"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Building className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate whitespace-nowrap">Agency White-Label</span>
              </div>
              <span className="text-[10px] font-mono bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 shrink-0 whitespace-nowrap">
                {agencies.length}
              </span>
            </button>

            <button
              onClick={() => setAdminTab("sentinel")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "sentinel"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Car className="w-4 h-4 text-[#b8e900] shrink-0" />
                <span className="truncate whitespace-nowrap">Driver Sentinel IoT</span>
              </div>
              <span className="text-[10px] font-mono bg-[#b8e900]/15 text-[#b8e900] border border-[#b8e900]/30 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                3 Orders
              </span>
            </button>

            <button
              onClick={() => setAdminTab("fraud-blacklist")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "fraud-blacklist"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Ban className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate whitespace-nowrap">Central Fraud Defense</span>
              </div>
              <span className="text-[10px] font-mono bg-red-500/15 text-red-300 px-2 py-0.5 rounded-full border border-red-500/30 shrink-0 whitespace-nowrap">
                {fraudBlacklist.length} Blocked
              </span>
            </button>

            <button
              onClick={() => setAdminTab("billing")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "billing"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <CreditCard className={`w-4 h-4 shrink-0 ${adminTab === "billing" ? "text-emerald-400" : "text-slate-400"}`} />
                <span className="truncate whitespace-nowrap">Payments & Billing</span>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 shrink-0 whitespace-nowrap">
                1 Pending
              </span>
            </button>

            <button
              onClick={() => setAdminTab("llm")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "llm"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Cpu className={`w-4 h-4 shrink-0 ${adminTab === "llm" ? "text-emerald-400" : "text-indigo-400"}`} />
                <span className="truncate whitespace-nowrap">LLM & Meta API Gateway</span>
              </div>
            </button>

            <button
              onClick={() => setAdminTab("features")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                adminTab === "features"
                  ? "bg-emerald-500/15 text-white border border-emerald-500/40 font-semibold shadow-xs"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-200 border border-transparent font-medium"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Sliders className={`w-4 h-4 shrink-0 ${adminTab === "features" ? "text-emerald-400" : "text-slate-400"}`} />
                <span className="truncate whitespace-nowrap">Global Engine Config</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Footer shortcuts */}
        <div className="p-3.5 border-t border-slate-800 space-y-2">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold transition-all group shadow-xs"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
            <span>Open Client Portal View</span>
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            <span>Public Website</span>
            <span className="text-[#b8e900]">→</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Bar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold text-white">
              {adminTab === "overview" && "Platform Operations & Financial Health"}
              {adminTab === "clients" && "Onboarded Client Stores & Bots"}
              {adminTab === "leads" && "Lead Orders & Delivery Fulfillment"}
              {adminTab === "agencies" && "Agency White-Label Ecosystem & Partner Payouts"}
              {adminTab === "sentinel" && "Zyncoo Driver Sentinel (AI Driver Drowsiness & Fleet Safety IoT Orders)"}
              {adminTab === "fraud-blacklist" && "Platform Central Fraud Blacklist & Threat Defense"}
              {adminTab === "billing" && "Subscription Invoices & Payment Approvals"}
              {adminTab === "llm" && "LLM Tokens, Latency & API Infrastructure"}
              {adminTab === "features" && "Global Feature Flags & Master Prompts"}
              {adminTab === "training" && "Client & Store-Wise AI Keyword Rules & Industry Templates"}
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">Environment:</span>
            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
              PRODUCTION_LIVE
            </span>
          </div>
        </header>

        {/* Admin Tab View */}
        <div className="p-6 flex-1 space-y-6">

          {/* TAB 1: OVERVIEW */}
          {adminTab === "overview" && (
            <div className="space-y-6">
              
              {/* Financial & Scale KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Total Monthly Revenue (MRR)</div>
                    <div className="text-2xl font-black text-white font-mono mt-1">৳184,500</div>
                    <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>$1,540 USD / mo</span>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Total AI Messages Today</div>
                    <div className="text-2xl font-black text-white font-mono mt-1">84,210</div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-1">
                      Avg Speed: 1.4s
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">LLM Server & Token Costs</div>
                    <div className="text-2xl font-black text-amber-400 font-mono mt-1">$142.80</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-1">
                      Gross Margin: <strong className="text-emerald-400">90.7%</strong>
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">Active Client Subscriptions</div>
                    <div className="text-2xl font-black text-white font-mono mt-1">58 Stores</div>
                    <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                      4 Trials ending soon
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

              </div>

              {/* Infrastructure Status Banner */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Live Cluster Gateways & Webhooks</h3>
                    <p className="text-xs text-slate-400">Meta Graph Webhook: <span className="text-emerald-400 font-mono">200 OK (8ms)</span> • WhatsApp Cloud API: <span className="text-emerald-400 font-mono">Connected</span> • Gemini 2.0 Flash: <span className="text-emerald-400 font-mono">Healthy</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Cluster diagnostic complete: All 4 webhooks responded in < 20ms.")}
                    className="bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700"
                  >
                    Run Health Ping
                  </button>
                </div>
              </div>

              {/* Recent Stores Table Preview */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white">Top Active Client Bots</h3>
                  <button
                    onClick={() => setAdminTab("clients")}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    Manage All Clients →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/60 text-slate-400 uppercase font-bold border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-3">Store Name</th>
                        <th className="px-5 py-3">Owner Contact</th>
                        <th className="px-5 py-3">Plan</th>
                        <th className="px-5 py-3">Monthly Messages</th>
                        <th className="px-5 py-3">API Cost</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/70">
                      {clients.slice(0, 4).map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-white">{c.name}</td>
                          <td className="px-5 py-3.5">
                            <div>{c.owner}</div>
                            <div className="text-slate-500 font-mono">{c.phone}</div>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                              {c.plan}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-mono">{c.conversationsThisMonth.toLocaleString()}</td>
                          <td className="px-5 py-3.5 font-mono text-amber-400">${c.apiCostUSD}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              c.status === "Active"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : c.status === "Trial"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CLIENT STORES */}
          {adminTab === "clients" && (
            <div className="space-y-5">
              
              {/* Search & Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
                <div className="relative flex-1 sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search client by store, owner, or phone..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    {filteredClients.length} of {clients.length} Stores
                  </span>
                  <button
                    onClick={() => setIsOnboardingClient(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Onboard New Store</span>
                  </button>
                </div>
              </div>

              {/* Success Notification Banner */}
              {clientOnboardSuccess && (
                <div className="p-5 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-white space-y-3 animate-in fade-in duration-200 shadow-lg">
                  <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="font-extrabold text-sm text-emerald-300">
                        নতুন ক্লায়েন্ট &quot;{clientOnboardSuccess.storeName}&quot; সফলভাবে অনবোর্ড হয়েছে!
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                        ID: {clientOnboardSuccess.id}
                      </span>
                    </div>
                    <button
                      onClick={() => setClientOnboardSuccess(null)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Owner & Phone:</span>
                      <strong className="text-white">{clientOnboardSuccess.ownerName}</strong>
                      <div className="text-emerald-400 font-mono">{clientOnboardSuccess.phone}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[11px]">Login Credentials:</span>
                      <div className="text-slate-200 font-mono text-[11px]">Email: {clientOnboardSuccess.email}</div>
                      <div className="text-slate-200 font-mono text-[11px]">Pass: {clientOnboardSuccess.pass}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <span className="text-slate-400 block text-[11px]">Plan Status:</span>
                      <strong className="text-emerald-400">{clientOnboardSuccess.plan} Tier</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
                    <button
                      onClick={() => {
                        const cleanPhone = clientOnboardSuccess.phone.replace(/[^0-9]/g, "");
                        const msg = encodeURIComponent(
                          `আসসালামু আলাইকুম ${clientOnboardSuccess.ownerName} ভাই! Zyncoo AI-তে আপনার স্টোর [${clientOnboardSuccess.storeName}] সফলভাবে অ্যাক্টিভ করা হয়েছে।\n\n🔗 পোর্টাল লগইন: https://zyncoo.ai/dashboard\n📧 ইমেইল: ${clientOnboardSuccess.email}\n🔑 পাসওয়ার্ড: ${clientOnboardSuccess.pass}\n\nযেকোনো প্রয়োজনে আমাদের সাপোর্ট টিম সবসময় প্রস্তুত রয়েছে!`
                        );
                        window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
                      }}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp-এ লগইন তথ্য পাঠান 📲</span>
                    </button>

                    <Link
                      href={`/dashboard?impersonate=${clientOnboardSuccess.id}&store=${encodeURIComponent(clientOnboardSuccess.storeName)}`}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-2 rounded-xl transition-all border border-slate-700 flex items-center gap-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Login as Store Now 🔑</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Onboard New Store Modal Form */}
              {isOnboardingClient && (
                <div className="bg-slate-900 p-6 rounded-2xl border-2 border-emerald-500 shadow-2xl space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <Building className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white">
                          অনবোর্ড নতুন ক্লায়েন্ট বিজনেস (Onboard New Client Store)
                        </h4>
                        <p className="text-xs text-slate-400">
                          ক্লায়েন্টের স্টোরের নাম, প্যাকেজ ও চ্যানেল সেট করুন। সাথে সাথে এআই অ্যাকাউন্ট তৈরি হবে।
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOnboardingClient(false)}
                      className="text-slate-400 hover:text-white cursor-pointer p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateNewClient} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Store Name */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">
                          Store / Business Name <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dhaka Gadgets Pro or Luxe BD"
                          value={newClientForm.storeName}
                          onChange={(e) => setNewClientForm({ ...newClientForm, storeName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:border-emerald-500"
                        />
                      </div>

                      {/* Owner Name */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">
                          Owner / Contact Person <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. তানভীর হাসান বা নাফিস ফুয়াদ"
                          value={newClientForm.ownerName}
                          onChange={(e) => setNewClientForm({ ...newClientForm, ownerName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:border-emerald-500"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">
                          WhatsApp / Mobile Phone <span className="text-emerald-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="+880 1711-223344"
                          value={newClientForm.phone}
                          onChange={(e) => setNewClientForm({ ...newClientForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono focus:outline-hidden focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Plan Tier */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Subscription Plan Tier</label>
                        <select
                          value={newClientForm.plan}
                          onChange={(e) => setNewClientForm({ ...newClientForm, plan: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                        >
                          <option value="Growth Pro">Growth Pro (৳4,990 / mo)</option>
                          <option value="Starter">Starter (৳2,490 / mo)</option>
                          <option value="Enterprise">Enterprise (৳9,990 / mo)</option>
                        </select>
                      </div>

                      {/* Initial Status */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Initial Account Status</label>
                        <select
                          value={newClientForm.status}
                          onChange={(e) => setNewClientForm({ ...newClientForm, status: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                        >
                          <option value="Active">Active (Paid Subscription)</option>
                          <option value="Trial">Trial (14-Day Free Trial)</option>
                        </select>
                      </div>

                      {/* Industry Template */}
                      <div className="space-y-1">
                        <label className="font-bold text-slate-300">Initial AI Industry Persona</label>
                        <select
                          value={newClientForm.industry}
                          onChange={(e) => setNewClientForm({ ...newClientForm, industry: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-semibold focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                        >
                          <option value="E-Commerce & Gadget Shop">ই-কমার্স ও গ্যাজেট শপ</option>
                          <option value="Fashion & Clothing">ফ্যাশন ও ক্লোথিং</option>
                          <option value="Healthcare & Doctor Chamber">ডাক্তার ও চেম্বার ক্লিনিক</option>
                          <option value="Real Estate & Developers">রিয়েল এস্টেট ও প্রোপার্টি</option>
                          <option value="IT Academy & Coaching">কোচিং ও আইটি একাডেমি</option>
                          <option value="Travel & Visa Holidays">ভ্রমণ ও ট্যুরিজম এজেন্সি</option>
                        </select>
                      </div>
                    </div>

                    {/* Channel Toggles */}
                    <div className="space-y-1.5 pt-1">
                      <label className="font-bold text-slate-300 block">Active Automation Channels:</label>
                      <div className="flex flex-wrap items-center gap-3">
                        {["WhatsApp", "Messenger", "Instagram"].map((ch) => {
                          const isSelected = newClientForm.channels.includes(ch);
                          return (
                            <button
                              key={ch}
                              type="button"
                              onClick={() => {
                                setNewClientForm({
                                  ...newClientForm,
                                  channels: isSelected
                                    ? newClientForm.channels.filter((c) => c !== ch)
                                    : [...newClientForm.channels, ch],
                                });
                              }}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                                isSelected
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "bg-slate-950 text-slate-400 border border-slate-800"
                              }`}
                            >
                              <span>{isSelected ? "✓" : "+"}</span>
                              <span>{ch}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Auto Credentials Preview Box */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Auto-Generated Client Login Credentials:</span>
                        <span className="text-emerald-400 font-mono">Secured</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="text-slate-300">
                          Portal URL: <span className="text-emerald-400 font-bold">https://zyncoo.ai/dashboard</span>
                        </div>
                        <div className="text-slate-300">
                          Login ID: <span className="text-emerald-400">
                            {newClientForm.storeName ? `${newClientForm.storeName.toLowerCase().replace(/[^a-z0-9]/g, "")}@store.zyncoo.ai` : "client@store.zyncoo.ai"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Form Submit Footer */}
                    <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsOnboardingClient(false)}
                        className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!newClientForm.storeName.trim() || !newClientForm.ownerName.trim()}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Deploy & Onboard Client 🚀</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Clients Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800 text-[11px] tracking-wider">
                      <tr>
                        <th className="px-5 py-3.5">Store ID</th>
                        <th className="px-5 py-3.5">Store & Owner</th>
                        <th className="px-5 py-3.5">Channels</th>
                        <th className="px-5 py-3.5">Plan</th>
                        <th className="px-5 py-3.5">MRR</th>
                        <th className="px-5 py-3.5">Bot Status</th>
                        <th className="px-5 py-3.5 text-right">Owner Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-medium">
                      {filteredClients.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-4 font-mono font-bold text-slate-400 whitespace-nowrap">{c.id}</td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-white text-sm">{c.name}</div>
                            <div className="text-slate-400 text-xs font-mono mt-0.5">{c.owner} ({c.phone})</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex gap-1.5 flex-wrap">
                              {c.channels.map((ch, i) => (
                                <span key={i} className="bg-slate-950 border border-slate-800 text-[10px] px-2 py-0.5 rounded-md text-emerald-300 font-mono">
                                  {ch}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4 font-mono font-bold text-slate-200 whitespace-nowrap">
                            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 inline-block">
                              {c.plan}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono text-emerald-400 font-black whitespace-nowrap">
                            {c.revenueBDT > 0 ? `৳${c.revenueBDT.toLocaleString()}` : "Trial Free"}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                              c.status === "Active"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : c.status === "Trial"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                                : "bg-red-500/20 text-red-300 border border-red-500/40"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${c.status === "Active" ? "bg-emerald-400" : c.status === "Trial" ? "bg-blue-400" : "bg-red-400"}`} />
                              <span>{c.status}</span>
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                              <Link
                                href={`/dashboard?impersonate=${c.id}&store=${encodeURIComponent(c.name)}`}
                                className="text-xs bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-500/40 inline-flex items-center gap-1 font-bold transition-all shadow-sm"
                                title={`Impersonate and login as ${c.name}`}
                              >
                                <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Login as Store 🔑</span>
                              </Link>
                              
                              <button
                                onClick={() => handleToggleStoreStatus(c.id)}
                                className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                                  c.status === "Active"
                                    ? "bg-slate-800 text-amber-300 border-amber-500/30 hover:bg-slate-700"
                                    : "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500 shadow-sm"
                                }`}
                              >
                                {c.status === "Active" ? "Pause Bot" : "Activate"}
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${c.name}?`)) {
                                    setClients(clients.filter((client) => client.id !== c.id));
                                  }
                                }}
                                className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                                title="Delete client"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
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

          {/* TAB: LEAD ORDERS & FULFILLMENT MANAGER */}
          {adminTab === "leads" && (
            <div className="space-y-6">
              
              {/* KPI Header Cards with Sleek Badges & Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-medium">Marketplace Revenue</div>
                    <div className="text-2xl font-black text-white font-mono tracking-tight mt-0.5">
                      ৳17,470
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <TrendingUp className="w-3 h-3" />
                      <span>100% Net Profit Margin</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#b8e900]/15 flex items-center justify-center border border-[#b8e900]/30 shrink-0">
                    <DollarSign className="w-5 h-5 text-[#b8e900]" />
                  </div>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-medium">Pending Lead Orders</div>
                    <div className="text-2xl font-black text-amber-400 font-mono tracking-tight mt-0.5">
                      {leadOrders.filter((o) => o.status !== "Dispatched").length} Orders
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <Clock className="w-3 h-3" />
                      <span>Awaiting Trx / Dispatch</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center border border-amber-500/30 shrink-0">
                    <Package className="w-5 h-5 text-amber-400" />
                  </div>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-medium">Verified Clean Leads</div>
                    <div className="text-2xl font-black text-white font-mono tracking-tight mt-0.5">
                      3,000+
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] text-blue-300 font-mono bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                      <span>Steadfast & Pathao Clean</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center border border-blue-500/30 shrink-0">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-sm flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-400 font-medium">Automated Dispatcher</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight mt-0.5">
                      WhatsApp Cloud
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <Radio className="w-3 h-3 text-emerald-400" />
                      <span>Instant Secure Link Delivery</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30 shrink-0">
                    <Send className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Lead Orders Table Card */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <span>Merchant Lead Purchase Queue</span>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {leadOrders.length} Total Orders
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Verify bKash / Nagad Trx and 1-Click dispatch verified buyer CSV directly to merchant WhatsApp.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Auto-Verification: bKash Webhook Active</span>
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/70 text-slate-400 uppercase font-bold border-b border-slate-800 text-[11px] tracking-wider">
                      <tr>
                        <th className="px-5 py-3.5 min-w-[100px]">Order ID</th>
                        <th className="px-5 py-3.5 min-w-[180px]">Buyer & Store</th>
                        <th className="px-5 py-3.5 min-w-[200px]">Package & Category</th>
                        <th className="px-5 py-3.5 min-w-[160px]">Trx ID & Method</th>
                        <th className="px-5 py-3.5 min-w-[110px]">Amount</th>
                        <th className="px-5 py-3.5 min-w-[140px]">Payment Status</th>
                        <th className="px-5 py-3.5 text-right min-w-[300px]">Fulfillment Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-medium">
                      {leadOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-4 font-mono font-bold text-slate-300 whitespace-nowrap">
                            <div className="text-white font-extrabold">{order.id}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{order.date}</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-white text-sm">{order.buyerName}</div>
                            <div className="text-slate-400 font-mono text-xs flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-slate-500" />
                              <span>{order.phone}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-200">{order.packTitle}</div>
                            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                              {order.category} • {order.leadsCount} leads
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="font-mono text-xs text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 inline-block">
                              <strong className="text-slate-400">{order.method}:</strong> {order.trxId}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono text-emerald-400 font-black text-sm whitespace-nowrap">
                            ৳{order.amountBDT.toLocaleString()}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span
                              className={`whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide ${
                                order.status === "Dispatched"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                  : order.status === "Payment Verified"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                                  : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                order.status === "Dispatched"
                                  ? "bg-emerald-400"
                                  : order.status === "Payment Verified"
                                  ? "bg-blue-400"
                                  : "bg-amber-400"
                              }`} />
                              <span>{order.status}</span>
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                              {order.status === "Awaiting Payment" && (
                                <button
                                  onClick={() => handleVerifyLeadOrder(order.id)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Verify bKash Trx</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleDownloadSampleCsv(order)}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-3 py-1.5 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                                title="Download sample leads CSV"
                              >
                                <Download className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Download CSV</span>
                              </button>

                              <button
                                onClick={() => handleDispatchLead(order)}
                                className={`text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                                  order.status === "Dispatched"
                                    ? "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                                    : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white"
                                }`}
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>{order.status === "Dispatched" ? "Re-Dispatch WhatsApp" : "Dispatch WhatsApp 🚀"}</span>
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

          {/* TAB: AGENCY WHITE-LABEL & PARTNER ECOSYSTEM */}
          {adminTab === "agencies" && (
            <div className="space-y-6">
              {/* Agency KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Total Agency Wholesale MRR</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">৳154,690</div>
                  <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>31 White-Label Stores Active</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Agency Partners' Net Profit Margin</div>
                  <div className="text-2xl font-black text-purple-400 font-mono mt-1">৳90,810 / mo</div>
                  <div className="text-[11px] text-slate-400 mt-1">Retained by marketing agencies</div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">20% Recurring Affiliate Pool</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">৳30,938</div>
                  <div className="text-[11px] text-slate-400 mt-1">Paid monthly via bKash</div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Custom CNAME DNS Health</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">2 Live / 1 Pending</div>
                  <div className="text-[11px] text-emerald-400 mt-1">SSL Auto-Provisioned</div>
                </div>
              </div>

              {/* Agencies Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
                <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-white">White-Label Agency Partner Roster</h3>
                    <p className="text-xs text-slate-400">
                      Agencies resell Zyncoo AI at ৳7,500 - ৳8,500 under their own branding, while paying Zyncoo wholesale ৳4,990/store.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      alert(
                        "Agency White-Label Invite Link generated: https://zyncoo.ai/partner/signup?invite=WL-AGENCY-2026"
                      )
                    }
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    + Invite New White-Label Agency
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-3">Agency & Founder</th>
                        <th className="px-5 py-3">Custom White-Label Domain</th>
                        <th className="px-5 py-3">Client Stores</th>
                        <th className="px-5 py-3">Zyncoo Wholesale (৳4,990/st)</th>
                        <th className="px-5 py-3">Agency Resale Margin</th>
                        <th className="px-5 py-3">CNAME DNS</th>
                        <th className="px-5 py-3 text-right">Affiliate Commission</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {agencies.map((agency) => (
                        <tr key={agency.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-4">
                            <div className="font-bold text-white text-sm">{agency.agencyName}</div>
                            <div className="text-slate-400 text-xs">
                              {agency.founderName} ({agency.phone})
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Joined: {agency.joinedDate}</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1.5 font-mono text-purple-300 font-semibold">
                              <Globe className="w-3.5 h-3.5 text-purple-400" />
                              <span>{agency.customDomain}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">CNAME: cname.zyncoo.ai</div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs font-bold bg-slate-800 text-white px-2 py-0.5 rounded border border-slate-700">
                              {agency.clientsCount} Active Stores
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono text-emerald-400 font-bold text-sm">
                            ৳{agency.totalWholesaleBDT.toLocaleString()}
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-mono text-purple-300 font-bold">
                              ৳{agency.agencyProfitBDT.toLocaleString()} / mo
                            </div>
                            <div className="text-[10px] text-slate-400">
                              (Retail: ৳{agency.retailClientPrice.toLocaleString()})
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                agency.cnameStatus === "Verified"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              }`}
                            >
                              {agency.cnameStatus}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <div className="font-mono text-xs text-emerald-400 font-bold mb-1">
                              ৳{agency.affiliateCommissionBDT.toLocaleString()} BDT
                            </div>
                            <button
                              onClick={() => handleDisburseAffiliate(agency)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1 rounded-lg transition-colors inline-flex items-center gap-1"
                            >
                              <DollarSign className="w-3 h-3" />
                              <span>Disburse via bKash</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DRIVER SENTINEL IOT FLEET & LICENSES */}
          {adminTab === "sentinel" && (
            <div className="space-y-6">
              
              {/* Sentinel Revenue & Fleet Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Sentinel IoT Revenue</span>
                    <span className="text-[#b8e900] text-[10px] font-mono font-bold bg-[#b8e900]/10 px-2 py-0.5 rounded border border-[#b8e900]/30">
                      100% MARGIN
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white mt-1 font-mono">
                    ৳47,470
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    ↑ 3 Direct Commercial Packages Sold
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Active Vehicle Units</span>
                    <span className="text-cyan-400 text-[10px] font-mono">OBD-II SYNC</span>
                  </div>
                  <div className="text-2xl font-black text-cyan-400 mt-1 font-mono">
                    26 Vehicles
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Fleet Pro & Enterprise Node Licenses
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Active Drowsiness Alarms</span>
                    <span className="text-emerald-400 text-[10px] font-mono">SYSTEM OK</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                    0 Critical
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    All 26 Drivers Alert & Awake
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Hardware / Software Package</span>
                    <span className="text-purple-400 text-[10px] font-mono">v1.0.4</span>
                  </div>
                  <div className="text-base font-bold text-white mt-1">
                    FastAPI + MediaPipe
                  </div>
                  <div className="mt-1">
                    <Link
                      href="/sentinel"
                      target="_blank"
                      className="text-[11px] text-[#b8e900] hover:underline font-bold inline-flex items-center gap-1"
                    >
                      <span>Public Product Page & Demo</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sentinel Customer Orders Queue Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#b8e900]" />
                      <span>Commercial Sentinel Customer Orders & Issued Licenses</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ওয়েবসাইট থেকে ক্রেতাদের কেনা ড্রাইভার স্লিপ সেন্টিনেল প্যাকেজ ও লাইসেন্স কি তালিকা
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/sentinel#pricing"
                      target="_blank"
                      className="px-3.5 py-1.5 rounded-xl bg-[#b8e900] hover:bg-[#a6d200] text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <span>+ Open Buy Page</span>
                    </Link>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Order ID & Date</th>
                        <th className="py-3 px-4">Customer & Transport Fleet</th>
                        <th className="py-3 px-4">Purchased Package</th>
                        <th className="py-3 px-4">Amount & TrxID</th>
                        <th className="py-3 px-4">Generated License Key</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      
                      <tr className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-white">SNT-9082</div>
                          <div className="text-[10px] text-slate-500">Today, 01:14 AM</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">Shohagh Paribahan Network</div>
                          <div className="text-[11px] text-slate-400 font-mono">+880 1712-449900 (Dhaka)</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                            Enterprise (20 Vehicles)
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#b8e900] font-mono">৳29,990</div>
                          <div className="text-[10px] text-slate-400 font-mono">Nagad: NG991204</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold select-all">
                          ZYNCOO-SNT-99B2-K811
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            PAID & ACTIVE
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <a
                            href="https://wa.me/8801712449900?text=Hello%20Shohagh%20Paribahan,%20your%20Zyncoo%20Driver%20Sentinel%20license%20is%20ZYNCOO-SNT-99B2-K811"
                            target="_blank"
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] transition-colors font-semibold"
                          >
                            WhatsApp Link
                          </a>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-white">SNT-9081</div>
                          <div className="text-[10px] text-slate-500">Yesterday</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">Tanvir Logistics & Cargo</div>
                          <div className="text-[11px] text-slate-400 font-mono">+880 1819-331122 (Chittagong)</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Fleet Pro (5 Vehicles)
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#b8e900] font-mono">৳12,990</div>
                          <div className="text-[10px] text-slate-400 font-mono">bKash: BK883912</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold select-all">
                          ZYNCOO-SNT-77A9-F2E1
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                            PAID & ACTIVE
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <a
                            href="https://wa.me/8801819331122?text=Hello%20Tanvir,%20your%20Zyncoo%20Driver%20Sentinel%20license%20is%20ZYNCOO-SNT-77A9-F2E1"
                            target="_blank"
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] transition-colors font-semibold"
                          >
                            WhatsApp Link
                          </a>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-white">SNT-9083</div>
                          <div className="text-[10px] text-slate-500">Oct 28</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white">Dr. Mahbub Alam</div>
                          <div className="text-[11px] text-slate-400 font-mono">+880 1911-002233 (Dhaka)</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                            Personal Car Starter Kit
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#b8e900] font-mono">৳4,490</div>
                          <div className="text-[10px] text-amber-400 font-mono">Cash on Delivery</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold select-all">
                          ZYNCOO-SNT-11C4-M402
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                            COD DISPATCHED
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => alert("Marked paid")}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] transition-colors font-semibold"
                          >
                            Verify & Complete
                          </button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB: CENTRAL FRAUD BLACKLIST & THREAT DEFENSE */}
          {adminTab === "fraud-blacklist" && (
            <div className="space-y-6">
              {/* Radar Overview Banner */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-red-900/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <span>Cross-Store Threat Intelligence & Fake Order Defense</span>
                      <span className="bg-red-500/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-500/30 font-mono">
                        LIVE RADAR
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      When one merchant reports a fake COD order or phone switch-off, all 58 Zyncoo client stores instantly block parcel dispatch to this number.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total Courier Loss Prevented</div>
                    <div className="text-2xl font-black text-red-400 font-mono">৳234,000 BDT</div>
                  </div>
                  <div className="h-8 w-px bg-slate-800"></div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Threats Prevented</div>
                    <div className="text-2xl font-black text-white font-mono">38 This Week</div>
                  </div>
                </div>
              </div>

              {/* Add to Blacklist Form */}
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <h4 className="font-bold text-xs uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                  <Ban className="w-4 h-4 text-red-400" />
                  <span>Manual Threat Escalation (+ Add Fraud Number to Platform DB)</span>
                </h4>
                <form onSubmit={handleAddFraud} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newFraudPhone}
                    onChange={(e) => setNewFraudPhone(e.target.value)}
                    placeholder="Phone number (+880 1...)"
                    className="px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white font-mono focus:outline-hidden focus:border-red-500"
                    required
                  />
                  <input
                    type="text"
                    value={newFraudName}
                    onChange={(e) => setNewFraudName(e.target.value)}
                    placeholder="Customer Name / Flag alias"
                    className="px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-red-500"
                  />
                  <input
                    type="text"
                    value={newFraudReason}
                    onChange={(e) => setNewFraudReason(e.target.value)}
                    placeholder="Reason (e.g. Courier refusal, switch off)"
                    className="px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Block Across All Stores</span>
                  </button>
                </form>
              </div>

              {/* Search & Blacklist Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
                <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={blacklistSearch}
                      onChange={(e) => setBlacklistSearch(e.target.value)}
                      placeholder="Lookup phone number or reason..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-red-500"
                    />
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Showing <strong className="text-red-400">{filteredBlacklist.length}</strong> flagged profiles
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-3">Flagged Phone & Profile</th>
                        <th className="px-5 py-3">Fake Delivery Attempts</th>
                        <th className="px-5 py-3">Courier Loss Blocked</th>
                        <th className="px-5 py-3">Reporting Stores</th>
                        <th className="px-5 py-3">Threat Score</th>
                        <th className="px-5 py-3">Incident Reason</th>
                        <th className="px-5 py-3 text-right">Defense Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredBlacklist.map((entry) => (
                        <tr key={entry.phone} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-4">
                            <div className="font-mono text-red-400 font-bold text-sm flex items-center gap-1.5">
                              <Ban className="w-3.5 h-3.5 text-red-500" />
                              <span>{entry.phone}</span>
                            </div>
                            <div className="text-xs text-slate-300 font-semibold mt-0.5">{entry.customerName}</div>
                            <div className="text-[10px] text-slate-500">Last activity: {entry.lastAttempt}</div>
                          </td>
                          <td className="px-5 py-4 font-mono font-bold text-slate-200">
                            {entry.fakeDeliveryAttempts} Parcels Refused
                          </td>
                          <td className="px-5 py-4 font-mono text-emerald-400 font-bold text-sm">
                            ৳{entry.blockedSavingBDT.toLocaleString()} BDT
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex flex-wrap gap-1">
                              {entry.reportedByStores.map((store, i) => (
                                <span
                                  key={i}
                                  className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] border border-slate-700"
                                >
                                  {store}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-mono text-[11px] font-bold border border-red-500/30">
                              {entry.riskScore}% FRAUD
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-300 max-w-xs">{entry.reason}</td>
                          <td className="px-5 py-4 text-right">
                            <button
                              onClick={() => handleRemoveFraud(entry.phone)}
                              className="text-slate-500 hover:text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                            >
                              Pardon / Unblock
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BILLING & PAYMENT VERIFICATION (DUAL METHOD) */}
          {adminTab === "billing" && (
            <div className="space-y-6">
              
              {/* Header & Metrics Strip */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Total Payments Collected</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">
                    ৳{payments.filter(p => p.status === "Verified" || p.status === "Auto Verified (SMS)").reduce((acc, p) => acc + p.amountBDT, 0).toLocaleString()} BDT
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Across all stores & Sentinel IoT</div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Pending Manual Review</div>
                  <div className="text-2xl font-black text-amber-400 mt-1 font-mono">
                    {payments.filter(p => p.status === "Pending Approval").length} Payments
                  </div>
                  <div className="text-[11px] text-amber-300 mt-1">Awaiting bKash/Nagad match</div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Auto-Verified via SMS</div>
                  <div className="text-2xl font-black text-[#b8e900] mt-1 font-mono">
                    {payments.filter(p => p.status === "Auto Verified (SMS)").length} Instant
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">0-touch automated match</div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">SMS Webhook Listener</div>
                  <div className="text-base font-bold text-white mt-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Active & Listening</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">Port: /api/payment/sms-webhook</div>
                </div>
              </div>

              {/* Sub-Tab Navigation (Method 1 vs Method 2) */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBillingSubTab("queue")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      billingSubTab === "queue"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span>📋 পদ্ধতি ১: ম্যানুয়াল Trx ভেরিফিকেশন কিউ</span>
                    <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded-full font-mono">
                      {payments.filter(p => p.status === "Pending Approval").length} Pending
                    </span>
                  </button>

                  <button
                    onClick={() => setBillingSubTab("webhook")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      billingSubTab === "webhook"
                        ? "bg-[#b8e900] text-slate-950 shadow-sm"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>⚡ পদ্ধতি ২: bKash/Nagad SMS অটো-ডিটেকশন লিসেনার</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                      LIVE
                    </span>
                  </button>
                </div>
              </div>

              {/* METHOD 1: MANUAL REVIEW QUEUE */}
              {billingSubTab === "queue" && (
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden space-y-4">
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">Manual bKash, Nagad & Bank Payment Verification</h4>
                      <p className="text-xs text-slate-400">Review customer-submitted TrxIDs against your statement and approve with 1 click.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                        <tr>
                          <th className="px-5 py-3">Invoice & Date</th>
                          <th className="px-5 py-3">Store / Customer & Phone</th>
                          <th className="px-5 py-3">Service / Package</th>
                          <th className="px-5 py-3">Payment Method</th>
                          <th className="px-5 py-3">Submitted TrxID</th>
                          <th className="px-5 py-3">Amount</th>
                          <th className="px-5 py-3">Status & Method</th>
                          <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-medium">
                        {payments.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="px-5 py-3.5 font-mono">
                              <div className="font-bold text-slate-200">{p.id}</div>
                              <div className="text-[10px] text-slate-500">{p.date}</div>
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="font-bold text-white">{p.storeName}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{p.customerPhone || "N/A"}</div>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                                {p.serviceType}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                p.method === "Nagad" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                              }`}>
                                {p.method}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 font-mono text-emerald-400 font-bold select-all">
                              {p.trxId}
                            </td>
                            <td className="px-5 py-3.5 font-mono text-white font-black text-sm">
                              ৳{p.amountBDT.toLocaleString()}
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="space-y-0.5">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  p.status === "Verified"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : p.status === "Auto Verified (SMS)"
                                    ? "bg-[#b8e900]/20 text-[#b8e900] border border-[#b8e900]/30"
                                    : p.status === "Rejected"
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                                }`}>
                                  {p.status}
                                </span>
                                {p.verifiedVia && (
                                  <div className="text-[9px] text-slate-400 font-mono">
                                    Via: {p.verifiedVia}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                              {p.status === "Pending Approval" ? (
                                <>
                                  <button
                                    onClick={() => handleApprovePayment(p.id, "Manual 1-Click")}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                                  >
                                    Approve Trx ✓
                                  </button>
                                  <button
                                    onClick={() => handleRejectPayment(p.id)}
                                    className="bg-slate-800 hover:bg-red-900/60 text-slate-400 hover:text-red-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <a
                                  href={`https://wa.me/${p.customerPhone?.replace(/[^0-9]/g, "") || "8801700000000"}?text=Hello%20${encodeURIComponent(p.storeName)},%20your%20payment%20of%20Tk%20${p.amountBDT}%20(TrxID:%20${p.trxId})%20has%20been%20successfully%20verified!%20Your%20Zyncoo%20service%20is%20now%20active.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
                                >
                                  <span>WhatsApp Msg</span>
                                  <span>→</span>
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* METHOD 2: AUTOMATED SMS WEBHOOK LISTENER & TESTER */}
              {billingSubTab === "webhook" && (
                <div className="space-y-6">
                  
                  {/* Webhook Configuration Strip */}
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                          <Radio className="w-4 h-4 text-[#b8e900]" />
                          <span>Automated bKash & Nagad SMS Webhook Listener</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          আপনার bKash/Nagad সিমে এসএমএস আসা মাত্রই সিস্টেম স্বয়ংক্রিয়ভাবে TrxID ও এমাউন্ট ম্যাচ করে কোনো মানুষের স্পর্শ ছাড়াই ০-সেকেন্ডে অর্ডার অ্যাপ্রুভ করবে।
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">READY TO RECEIVE</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="font-semibold">Webhook URL (Post Endpoint):</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/api/payment/sms-webhook`);
                              setCopiedWebhook(true);
                              setTimeout(() => setCopiedWebhook(false), 2000);
                            }}
                            className="text-[#b8e900] hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedWebhook ? "Copied!" : "Copy URL"}</span>
                          </button>
                        </div>
                        <div className="font-mono text-xs text-slate-200 select-all bg-slate-900 p-2 rounded-lg border border-slate-800 overflow-x-auto">
                          https://zyncoo.ai/api/payment/sms-webhook
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="text-xs text-slate-400 font-semibold">
                          Supported Mobile SMS Senders:
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-pink-500/15 text-pink-300 border border-pink-500/30">bKash (16247)</span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">NAGAD (16167)</span>
                          <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">Rocket (16216)</span>
                        </div>
                      </div>
                    </div>

                    {/* 3 Step Android Setup */}
                    <div className="pt-3 border-t border-slate-800/80">
                      <div className="text-xs font-bold text-slate-300 mb-2">
                        📱 ৩-মিনিটে আপনার ফোনে অটোমেশন সেটআপ করার নিয়ম:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-400">
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <strong className="text-white block mb-1">১. ফ্রি অ্যাপ ইনস্টল:</strong>
                          Google Play থেকে "SMS Forwarder" অথবা "Tasker" ইনস্টল করুন যে ফোনে bKash সিম আছে।
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <strong className="text-white block mb-1">২. ফিল্টার সেট:</strong>
                          Forwarder এ Sender হিসেবে <code>bKash, NAGAD, 16247</code> দিন।
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <strong className="text-white block mb-1">৩. Webhook পেস্ট:</strong>
                          Target URL হিসেবে উপরের <code>/api/payment/sms-webhook</code> লিঙ্কটি দিয়ে সেভ করুন।
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Live SMS Simulator */}
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#b8e900]" />
                        <span>লাইভ এসএমএস সিমুলেটর ও অটো-ডিটেকশন টেস্ট (Live Tester)</span>
                      </h4>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSmsTestInput("You have received Tk 4,490.00 from 01819331122. Ref: ZYNCOO. Fee Tk 0.00. Balance Tk 62,700.35. TrxID BK99120485 at 30/10/2026 03:20")}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-pink-300 border border-pink-500/30 cursor-pointer"
                        >
                          Preset: bKash ৳4,490 (Sentinel)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSmsTestInput("You have received Tk 2,490.00 from 01912334455. TxnID: NGD882736152. Balance: Tk 32,150.00.")}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 cursor-pointer"
                        >
                          Preset: Nagad ৳2,490 (Honey Store)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-slate-400">
                        মোবাইলে আসা বিকাশ বা নগদের রিসিভড এসএমএস টেক্সট নিচে দিন:
                      </label>
                      <textarea
                        rows={3}
                        value={smsTestInput}
                        onChange={(e) => setSmsTestInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-hidden focus:border-[#b8e900]"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleRunSmsSimulation}
                        disabled={isSimulatingSms}
                        className="px-5 py-2.5 rounded-xl bg-[#b8e900] hover:bg-[#a6d200] text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#b8e900]/20"
                      >
                        {isSimulatingSms ? (
                          <span>অটো-ডিটেক্ট হচ্ছে...</span>
                        ) : (
                          <>
                            <Zap className="w-4 h-4" />
                            <span>Run Webhook Auto-Detection & Match TrxID</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Simulation Result Box */}
                    {smsSimulationResult && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{smsSimulationResult.message}</span>
                          </span>
                          <span className="text-[10px] bg-[#b8e900] text-slate-950 font-bold px-2 py-0.5 rounded">
                            MATCHED & AUTO-VERIFIED
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-300 border-t border-slate-900">
                          <div>Gateway: <strong className="text-white">{smsSimulationResult.parsed?.gateway}</strong></div>
                          <div>TrxID: <strong className="text-[#b8e900] select-all">{smsSimulationResult.parsed?.trxId}</strong></div>
                          <div>Amount: <strong className="text-white">৳{smsSimulationResult.parsed?.amount}</strong></div>
                          <div>Sender: <strong className="text-slate-400">{smsSimulationResult.parsed?.senderPhone || "Extracted"}</strong></div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 4: LLM & API GATEWAY */}
          {adminTab === "llm" && (
            <div className="space-y-6">
              {/* Multi-LLM Selector & Token Economics Card */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                      <span>Multi-LLM Dispatcher & Automated Failover Gateway</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Switch active inference engine dynamically across all 58 bot nodes without zero-downtime restarts.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">Active Provider:</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30 uppercase">
                      {primaryModel}
                    </span>
                  </div>
                </div>

                {/* Model Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div
                    onClick={() => setPrimaryModel("gemini-flash")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      primaryModel === "gemini-flash"
                        ? "bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-white">Gemini 2.0 Flash</div>
                      {primaryModel === "gemini-flash" && (
                        <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Google TPU v5e cluster. Ultra-fast Bengali and Banglish tokenizer.
                    </p>
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">420ms</span>
                      <span className="text-slate-400">৳0.04 / order</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setPrimaryModel("claude-sonnet")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      primaryModel === "claude-sonnet"
                        ? "bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-white">Claude 3.5 Sonnet</div>
                      {primaryModel === "claude-sonnet" && (
                        <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Anthropic AWS Bedrock. Superior persuasion in high-ticket objection handling.
                    </p>
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-purple-400 font-bold">890ms</span>
                      <span className="text-slate-400">৳0.35 / order</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setPrimaryModel("gpt-4o-mini")}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      primaryModel === "gpt-4o-mini"
                        ? "bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-white">GPT-4o-mini</div>
                      {primaryModel === "gpt-4o-mini" && (
                        <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      OpenAI Azure cluster. Standby cold failover for zero API disruption.
                    </p>
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-400 font-bold">510ms</span>
                      <span className="text-slate-400">৳0.08 / order</span>
                    </div>
                  </div>
                </div>

                {/* Gross Margin & Token Economics Breakdown */}
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400">Platform SaaS Gross Margin:</span>
                    <div className="text-xl font-black text-emerald-400 font-mono">
                      90.7% Pure Software Gross Margin
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 space-y-0.5">
                    <div>Gross Client ARR: <span className="text-white font-bold">৳184,500 / mo</span></div>
                    <div>Total LLM Invoicing: <span className="text-amber-400 font-bold">$142.80 (~৳17,136)</span></div>
                  </div>
                  <div>
                    <button
                      onClick={() => alert(`Active LLM engine updated to: ${primaryModel.toUpperCase()}!`)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                    >
                      Save Primary Engine Config
                    </button>
                  </div>
                </div>
              </div>

              {/* Gateway Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Primary LLM Engine</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <div className="text-lg font-bold text-white">Google Gemini 2.0 Flash</div>
                  <p className="text-xs text-slate-400">Low-latency model tuned for Bengali and English conversational order extraction.</p>
                  <div className="pt-2 text-xs font-mono text-emerald-400 border-t border-slate-800">
                    Latency: 420ms avg
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Fallback LLM</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-lg font-bold text-white">OpenAI GPT-4o-mini</div>
                  <p className="text-xs text-slate-400">Automated failover if Google Cloud experiences throttling or high load.</p>
                  <div className="pt-2 text-xs font-mono text-slate-400 border-t border-slate-800">
                    Standby Ready
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">Meta Cloud Webhook</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                  <div className="text-lg font-bold text-white">Meta Graph API v21.0</div>
                  <p className="text-xs text-slate-400">Bi-directional WhatsApp Cloud API and Facebook Page Messenger connector.</p>
                  <div className="pt-2 text-xs font-mono text-emerald-400 border-t border-slate-800">
                    Uptime: 99.98%
                  </div>
                </div>
              </div>

              {/* Master System Prompt Configuration */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-bold text-sm text-white">Global Super-Prompt Template (Base Instructions for all Bots)</h4>
                </div>
                <textarea
                  defaultValue="You are an autonomous social commerce assistant representing the store. Greet customers warmly. Answer in the same language the customer uses (English, formal Bengali, or colloquial Banglish). Extract customer Name, Phone, and Address politely when they show intent to order. Never hallucinate stock or unauthorized discounts. When an order is complete, trigger the 'record_order' function call."
                  rows={4}
                  className="w-full p-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono focus:outline-hidden focus:border-emerald-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => alert("Global Super-Prompt saved across all active agent instances!")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    Deploy to All Bots
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: GLOBAL FEATURES */}
          {adminTab === "features" && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 max-w-3xl">
              <div>
                <h3 className="font-bold text-sm text-white">Platform Feature Flags & Toggles</h3>
                <p className="text-xs text-slate-400">Enable or disable cutting-edge features across all client workspaces.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <h5 className="font-bold text-xs text-white">WhatsApp Voice Note Transcription (Audio AI)</h5>
                    <p className="text-[11px] text-slate-400">Allows customer voice messages in Bengali to be transcribed by Whisper and answered by AI.</p>
                  </div>
                  <button
                    onClick={() => setFeatureFlags({ ...featureFlags, voiceNotes: !featureFlags.voiceNotes })}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${featureFlags.voiceNotes ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"}`}
                  >
                    {featureFlags.voiceNotes ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <h5 className="font-bold text-xs text-white">Image & Product Screenshot Vision (Multimodal OCR)</h5>
                    <p className="text-[11px] text-slate-400">Enables AI to recognize product photos sent by customers in messenger chats.</p>
                  </div>
                  <button
                    onClick={() => setFeatureFlags({ ...featureFlags, imageOcr: !featureFlags.imageOcr })}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${featureFlags.imageOcr ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"}`}
                  >
                    {featureFlags.imageOcr ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <h5 className="font-bold text-xs text-white">Steadfast & RedX Courier Auto-Consignment API</h5>
                    <p className="text-[11px] text-slate-400">Enables automatic consignment booking upon order confirmation.</p>
                  </div>
                  <button
                    onClick={() => setFeatureFlags({ ...featureFlags, courierAutoSync: !featureFlags.courierAutoSync })}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${featureFlags.courierAutoSync ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"}`}
                  >
                    {featureFlags.courierAutoSync ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <h5 className="font-bold text-xs text-white">Allow Public Self-Service Registration</h5>
                    <p className="text-[11px] text-slate-400">Permit new merchants to register and connect bots without manual admin invite.</p>
                  </div>
                  <button
                    onClick={() => setFeatureFlags({ ...featureFlags, newRegistration: !featureFlags.newRegistration })}
                    className={`px-3 py-1 text-xs font-bold rounded-lg ${featureFlags.newRegistration ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"}`}
                  >
                    {featureFlags.newRegistration ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CLIENT & STORE-WISE AI RULES & INDUSTRY TEMPLATES */}
          {adminTab === "training" && (
            <div className="space-y-6">
              
              {/* Top Banner & Multi-Store Selector */}
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#b8e900]" />
                    <span>Bangladeshi NLP Engine & Client Customizer</span>
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>Client & Store-Wise AI Keyword Rules & Training</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Agency Hub
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    বাংলা ও বাংলিশ কাস্টমারের নির্দিষ্ট প্রশ্নের বিপরীতে কিওয়ার্ড ও ট্রিগার সেট করুন। প্রতিটি ক্লায়েন্ট/স্টোরের জন্য আলাদা বা গ্লোবাল রুল নির্ধারণ করতে পারবেন।
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <Building className="w-4 h-4 text-emerald-400 ml-1" />
                    <select
                      value={selectedClientStore}
                      onChange={(e) => setSelectedClientStore(e.target.value)}
                      className="bg-transparent text-xs font-bold text-white focus:outline-hidden pr-2 cursor-pointer"
                    >
                      {clientStores.map((store) => (
                        <option key={store} value={store} className="bg-slate-900 text-white">
                          {store}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      setRuleForm({
                        clientStore: selectedClientStore,
                        category: "Bargaining",
                        name: "",
                        keywordsInput: "",
                        matchType: "contains",
                        replyText: "",
                        actionTrigger: "none",
                      });
                      setIsAddingRule(true);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Rule</span>
                  </button>
                </div>
              </div>

              {/* 1-Click Multi-Industry Templates Carousel / Grid */}
              <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 p-6 rounded-2xl border border-emerald-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30">
                      <Sparkles className="w-4 h-4 text-[#b8e900]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                        <span>১-ক্লিকে ইন্ডাস্ট্রি টেমপ্লেট লোড করুন (1-Click Industry Templates)</span>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                          Instant Deploy
                        </span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        ডাক্তার, রিয়েল এস্টেট, আইটি কোচিং বা ট্রাভেলের মতো যেকোনো ইন্ডাস্ট্রির জন্য এআই পারসোনা ও ২০+ প্রশ্নোত্তর এক ক্লিকে ক্লায়েন্ট স্টোরে ডিপ্লয় করুন।
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {industryPresets.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => setSelectedIndustryPreset(preset)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                        selectedIndustryPreset?.id === preset.id
                          ? "bg-emerald-500/20 border-emerald-400 shadow-md shadow-emerald-500/20"
                          : "bg-slate-950/70 hover:bg-slate-800/80 border-slate-800 hover:border-emerald-500/40"
                      }`}
                    >
                      <div>
                        <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">{preset.emoji}</div>
                        <div className="font-bold text-xs text-white leading-tight">{preset.name}</div>
                        <div className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">{preset.description}</div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-400">
                          {preset.rules.length} রুলস
                        </span>
                        <span className="text-[10px] text-slate-400 group-hover:text-emerald-300 transition-colors">
                          প্রিভিউ →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preset Preview & Quick Apply Modal */}
                {selectedIndustryPreset && (
                  <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{selectedIndustryPreset.emoji}</span>
                        <div>
                          <div className="font-bold text-sm text-white">
                            {selectedIndustryPreset.name} — ইন্ডাস্ট্রি টেমপ্লেট প্রিভিউ
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            Target Client: {selectedIndustryPreset.targetClient} ({selectedIndustryPreset.category})
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedIndustryPreset(null)}
                        className="text-slate-400 hover:text-white cursor-pointer p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                      <span className="font-bold text-emerald-400 block text-[11px] uppercase tracking-wider">AI System Persona (পারসোনা):</span>
                      <p className="text-slate-300 leading-relaxed italic">&quot;{selectedIndustryPreset.systemPersona}&quot;</p>
                    </div>

                    <div className="space-y-2">
                      <span className="font-bold text-slate-300 text-xs block">
                        প্রি-বিল্ড প্রশ্নোত্তর ({selectedIndustryPreset.rules.length}টি রুল অন্তর্ভুক্ত):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                        {selectedIndustryPreset.rules.map((r, rIdx) => (
                          <div key={rIdx} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1.5">
                            <div className="font-bold text-white flex items-center justify-between">
                              <span>{r.name}</span>
                              <span className="text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-500/10">
                                {r.category}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 flex flex-wrap gap-1">
                              {r.triggerKeywords.map((kw, i) => (
                                <span key={i} className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-300 font-mono">
                                  &quot;{kw}&quot;
                                </span>
                              ))}
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed">&quot;{r.replyText}&quot;</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
                      <div className="text-xs text-slate-400">
                        টার্গেট ক্লায়েন্ট: <strong className="text-emerald-400">{selectedIndustryPreset.targetClient}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedIndustryPreset(null)}
                          className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                        >
                          বন্ধ করুন
                        </button>
                        <button
                          onClick={() => handleApplyIndustryPreset(selectedIndustryPreset)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-2 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>এই টেমপ্লেটটি ক্লায়েন্টে সক্রিয় করুন (Deploy Template)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Toast Message */}
              {ruleSaveMessage && (
                <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{ruleSaveMessage}</span>
                </div>
              )}

              {/* Inline Add / Edit Rule Form Modal */}
              {isAddingRule && (
                <div className="bg-slate-900 p-6 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-emerald-400" />
                      <h4 className="font-bold text-sm text-white">
                        {ruleForm.id ? "Edit AI Rule" : "নতুন AI কিওয়ার্ড ও প্রশ্নোত্তর রুল যুক্ত করুন"}
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsAddingRule(false)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveRule} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Store Selector */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Target Client Store (কোন ক্লায়েন্ট স্টোরে?)</label>
                      <select
                        value={ruleForm.clientStore}
                        onChange={(e) => setRuleForm({ ...ruleForm, clientStore: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-semibold focus:outline-hidden focus:border-emerald-500"
                      >
                        {clientStores.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Rule Category</label>
                      <select
                        value={ruleForm.category}
                        onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-semibold focus:outline-hidden focus:border-emerald-500"
                      >
                        <option value="Bargaining">Bargaining (দামাদামি ও অফার)</option>
                        <option value="Delivery & COD">Delivery & COD (ডেলিভারি ও চার্জ)</option>
                        <option value="Fraud & Advance">Fraud & Advance (অগ্রিম ১০০টাকা)</option>
                        <option value="Address Sanitizer">Address Sanitizer (অসম্পূর্ণ ঠিকানা)</option>
                        <option value="Product & Warranty">Product & Warranty (ওয়ারেন্টি ও রিপ্লেসমেন্ট)</option>
                        <option value="Appointment & Booking">Appointment & Booking (সিরিয়াল ও বুকিং)</option>
                        <option value="Custom">Custom (কাস্টম প্রশ্ন)</option>
                      </select>
                    </div>

                    {/* Rule Title */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Rule Title (রুল শিরোনাম)</label>
                      <input
                        type="text"
                        placeholder="e.g. ১০০ টাকা কুপন অফার ও বার্গেনিং ডিফেন্স"
                        value={ruleForm.name}
                        onChange={(e) => setRuleForm({ ...ruleForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>

                    {/* Match Mode */}
                    <div className="space-y-1">
                      <label className="font-bold text-slate-300">Match Mode (ম্যাচিং মোড)</label>
                      <select
                        value={ruleForm.matchType}
                        onChange={(e) => setRuleForm({ ...ruleForm, matchType: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-semibold focus:outline-hidden focus:border-emerald-500"
                      >
                        <option value="contains">Contains Keyword (মেসেজে যেকোনো একটি শব্দ থাকলে)</option>
                        <option value="exact">Exact Match (হুবহু নির্দিষ্ট বাক্য মিললে)</option>
                        <option value="ai_intent">Semantic AI Intent (ভাবার্থ বা কনটেক্সট মিললে)</option>
                      </select>
                    </div>

                    {/* Trigger Keywords */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-bold text-slate-300 flex items-center justify-between">
                        <span>Trigger Keywords / Phrases (যেসব বাক্য কাস্টমার লিখলে AI উত্তর দেবে)</span>
                        <span className="text-[11px] text-slate-400 font-normal">কমা দিয়ে একাধিক কিওয়ার্ড লিখুন</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. দাম কম, লাস্ট কত, একদাম কত, কম রাখেন, dam kom, discount den"
                        value={ruleForm.keywordsInput}
                        onChange={(e) => setRuleForm({ ...ruleForm, keywordsInput: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono focus:outline-hidden focus:border-emerald-500"
                      />
                      <div className="text-[11px] text-slate-400 pt-1 flex flex-wrap gap-1 items-center">
                        <span className="font-semibold text-slate-300">দ্রুত কিওয়ার্ড যুক্ত করুন:</span>
                        <span onClick={() => setRuleForm(prev => ({ ...prev, keywordsInput: prev.keywordsInput ? `${prev.keywordsInput}, dam kom` : "dam kom" }))} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded cursor-pointer hover:bg-slate-700">+ dam kom</span>
                        <span onClick={() => setRuleForm(prev => ({ ...prev, keywordsInput: prev.keywordsInput ? `${prev.keywordsInput}, kobe pabo` : "kobe pabo" }))} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded cursor-pointer hover:bg-slate-700">+ kobe pabo</span>
                        <span onClick={() => setRuleForm(prev => ({ ...prev, keywordsInput: prev.keywordsInput ? `${prev.keywordsInput}, delivery charge` : "delivery charge" }))} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded cursor-pointer hover:bg-slate-700">+ delivery charge</span>
                        <span onClick={() => setRuleForm(prev => ({ ...prev, keywordsInput: prev.keywordsInput ? `${prev.keywordsInput}, advance keno` : "advance keno" }))} className="px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded cursor-pointer hover:bg-slate-700">+ advance keno</span>
                      </div>
                    </div>

                    {/* Reply Text */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-bold text-slate-300 flex items-center justify-between">
                        <span>AI Custom Reply Message (কাস্টমারকে AI হুবহু যা বলবে)</span>
                        <span className="text-[11px] text-emerald-400 font-semibold">100% Conversational Bangla</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="ভাইয়া, আমাদের প্রোডাক্ট কোয়ালিটি ১০০% জেনুইন এবং প্রাইস একদম ফিক্সড। তবে আপনি যেহেতু আজকেই নিতে চাচ্ছেন..."
                        value={ruleForm.replyText}
                        onChange={(e) => setRuleForm({ ...ruleForm, replyText: e.target.value })}
                        className="w-full p-3 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-hidden focus:border-emerald-500 leading-relaxed"
                      />
                    </div>

                    {/* Attached Action */}
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-bold text-slate-300">Attach Automated Action (অটোমেটেড অ্যাকশন ট্রিগার)</label>
                      <select
                        value={ruleForm.actionTrigger}
                        onChange={(e) => setRuleForm({ ...ruleForm, actionTrigger: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-semibold focus:outline-hidden focus:border-emerald-500"
                      >
                        <option value="none">None (শুধুমাত্র লিখিত বার্তা দেবে)</option>
                        <option value="apply_coupon_100">Apply ৳100 Discount Coupon [ZYNCOO100] (ডিসকাউন্ট কুপন সক্রিয় করবে)</option>
                        <option value="send_bkash_advance">Send ৳100 bKash Advance Payment QR/Link (বিকাশ পেমেন্ট লিংক পাঠাবে)</option>
                        <option value="request_full_address">Request Full Address (কুরিয়ার অ্যাড্রেস স্যানিটাইজার চালাবে)</option>
                      </select>
                    </div>

                    {/* Form Actions */}
                    <div className="sm:col-span-2 flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsAddingRule(false)}
                        className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!ruleForm.name || !ruleForm.keywordsInput || !ruleForm.replyText}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold transition-all shadow-sm cursor-pointer"
                      >
                        Save Rule to AI Brain
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                <div className="flex flex-wrap items-center gap-1.5">
                  {["all", "Bargaining", "Delivery & COD", "Fraud & Advance", "Address Sanitizer", "Product & Warranty", "Appointment & Booking", "Custom"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                        categoryFilter === cat
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white"
                      }`}
                    >
                      {cat === "all" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search keywords or rules..."
                    value={ruleSearchQuery}
                    onChange={(e) => setRuleSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-950 text-white border border-slate-800 focus:outline-hidden focus:border-emerald-500"
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
                          ? "bg-slate-900 border-slate-800 hover:border-emerald-500/50 shadow-sm" 
                          : "bg-slate-950/60 border-slate-800/60 opacity-60"
                      }`}
                    >
                      {/* Top Bar: Store & Category + Active Switch */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-emerald-400 border border-slate-800">
                            {rule.clientStore}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                            {rule.category}
                          </span>
                          {rule.matchType === "contains" && (
                            <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
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
                              <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Active
                              </span>
                            ) : (
                              <span className="text-slate-500 text-[11px]">Inactive</span>
                            )}
                          </button>

                          <button
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                            title="Delete rule"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Rule Name */}
                      <div>
                        <h4 className="font-extrabold text-sm text-white">{rule.name}</h4>
                      </div>

                      {/* Trigger Keyword Chips */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                          Trigger Keywords ({rule.triggerKeywords.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {rule.triggerKeywords.map((kw, i) => (
                            <span
                              key={i}
                              onClick={() => handleTestSandbox(kw)}
                              className="text-[11px] font-mono bg-slate-950 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800 cursor-pointer hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
                              title="Click to test in sandbox"
                            >
                              &quot;{kw}&quot;
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI Reply Bubble */}
                      <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-1">
                        <span className="text-[10px] font-bold text-emerald-400 block uppercase tracking-wider flex items-center gap-1">
                          <Bot className="w-3 h-3 text-emerald-400" />
                          AI Trained Response:
                        </span>
                        <p className="italic">&quot;{rule.replyText}&quot;</p>
                      </div>

                      {/* Attached Action Tag */}
                      {rule.actionTrigger !== "none" && (
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                          <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>
                            {rule.actionTrigger === "apply_coupon_100" && "অটোমেটেড অ্যাকশন: ৳১০০ ডিসকাউন্ট ভাউচার সংযুক্ত হবে"}
                            {rule.actionTrigger === "send_bkash_advance" && "অটোমেটেড অ্যাকশন: বিকাশ ১০০ টাকা অগ্রিম পেমেন্ট লিংক তৈরি হবে"}
                            {rule.actionTrigger === "request_full_address" && "অটোমেটেড অ্যাকশন: কুরিয়ার অ্যাড্রেস স্যানিটাইজার পূর্ণ ঠিকানা চাইবে"}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Live Bangla NLP Match Sandbox Simulator */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <Bot className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                        <span>Live Bangladeshi NLP Rule-Match Sandbox Simulator</span>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                          Super Admin Testing Tool
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        যেকোনো ক্লায়েন্টের কাস্টমার মেসেজ লিখে সরাসরি পরীক্ষা করুন AI কিওয়ার্ড ম্যাচ করে সঠিক উত্তর ও অ্যাকশন ট্রিগার করছে কি না।
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Testing Store: <strong className="text-emerald-400">{selectedClientStore}</strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="e.g. bhaiya dam kisu kom rakha jabe? or সিরিয়াল বুকিং কখন?"
                      value={sandboxInput}
                      onChange={(e) => setSandboxInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleTestSandbox()}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                  <button
                    onClick={() => handleTestSandbox()}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 shrink-0"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Test AI Match</span>
                  </button>
                </div>

                {/* Sandbox Quick Test Suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Quick Test Samples:</span>
                  {[
                    "bhaiya dam kisu kom hobe?",
                    "kobe delivery pabo?",
                    "ডাক্তারের সিরিয়াল নিতে চাই",
                    "advance taka keno debo?",
                    "সাইট ভিজিট করতে চাই",
                    "টেবিল বুকিং আছে?",
                    "sajek tour package koto?"
                  ].map((sample) => (
                    <button
                      key={sample}
                      onClick={() => {
                        setSandboxInput(sample);
                        handleTestSandbox(sample);
                      }}
                      className="px-2 py-1 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 hover:text-emerald-300 hover:border-emerald-500/50 cursor-pointer transition-colors"
                    >
                      {sample}
                    </button>
                  ))}
                </div>

                {/* Sandbox Live Response Output */}
                {sandboxResult && (
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3 animate-in fade-in duration-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        {sandboxResult.matchedRule ? (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Rule Matched: {sandboxResult.matchedRule.name}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            Fallback: Default AI Persona Active
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        Confidence: {sandboxResult.confidence}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                        Simulated AI Output:
                      </span>
                      <p className="text-slate-100 bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
                        {sandboxResult.matchedRule
                          ? sandboxResult.matchedRule.replyText
                          : "আসসালামু আলাইকুম! Zyncoo AI এসিস্ট্যান্ট বলছি। আপনার প্রশ্নটির উত্তর দিতে পারছি না, তবে আমাদের সাপোর্ট টিম শীঘ্রই যোগাযোগ করবে।"}
                      </p>
                    </div>

                    {sandboxResult.actionNote && (
                      <div className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/30 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>অটোমেটেড অ্যাকশন ট্রিগার: {sandboxResult.actionNote}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </main>
    </div>
  );
}
