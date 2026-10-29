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
  Package
} from "lucide-react";

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
  method: "bKash Merchant" | "Nagad" | "Stripe" | "Bank";
  trxId: string;
  amountBDT: number;
  status: "Verified" | "Pending Approval";
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
    "overview" | "clients" | "leads" | "agencies" | "fraud-blacklist" | "billing" | "llm" | "features"
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
      method: "bKash Merchant",
      trxId: "BKH982716382",
      amountBDT: 4990,
      status: "Verified",
      date: "Today, 09:30 AM",
    },
    {
      id: "PAY-502",
      storeName: "Organic Honey & Foods",
      method: "Nagad",
      trxId: "NGD882736152",
      amountBDT: 2490,
      status: "Pending Approval",
      date: "Today, 02:15 AM",
    },
    {
      id: "PAY-503",
      storeName: "Aura Skincare Essentials",
      method: "Stripe",
      trxId: "ch_3Pz81729381",
      amountBDT: 9990,
      status: "Verified",
      date: "Yesterday",
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

  const handleApprovePayment = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Verified" } : p))
    );
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
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ZyncooLogo className="w-9.5 h-9.5" />
              <div>
                <div className="font-extrabold text-base text-white tracking-wide">
                  zyncoo<span className="text-[#b8e900]">.ai</span> HQ
                </div>
                <div className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
                  Super Admin Panel
                </div>
              </div>
            </div>
          </div>

          {/* Quick System Badge */}
          <div className="mx-4 my-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Platform Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Operational
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">
              Server Load: 18% • 0 Errs
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1 text-xs font-semibold">
            <button
              onClick={() => setAdminTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                adminTab === "overview"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Platform Analytics</span>
            </button>

            <button
              onClick={() => setAdminTab("clients")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                adminTab === "clients"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Client Businesses</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300">
                {clients.length}
              </span>
            </button>

            <button
              onClick={() => setAdminTab("leads")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                adminTab === "leads"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-emerald-400" />
                <span>Lead Store Orders</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                2 Pending
              </span>
            </button>

            <button
              onClick={() => setAdminTab("agencies")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                adminTab === "agencies"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-purple-400" />
                <span>Agency White-Label</span>
              </div>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">
                {agencies.length}
              </span>
            </button>

            <button
              onClick={() => setAdminTab("fraud-blacklist")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                adminTab === "fraud-blacklist"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Ban className="w-4 h-4 text-red-400" />
                <span>Central Fraud Defense</span>
              </div>
              <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded border border-red-500/30">
                {fraudBlacklist.length} Blocked
              </span>
            </button>

            <button
              onClick={() => setAdminTab("billing")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                adminTab === "billing"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Payments & Billing</span>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                1 Pending
              </span>
            </button>

            <button
              onClick={() => setAdminTab("llm")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                adminTab === "llm"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>LLM & Meta API Gateway</span>
            </button>

            <button
              onClick={() => setAdminTab("features")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                adminTab === "features"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Global Engine Config</span>
            </button>
          </nav>
        </div>

        {/* Footer shortcuts */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Client Portal View</span>
          </Link>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs transition-colors"
          >
            <span>Public Website →</span>
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
              {adminTab === "fraud-blacklist" && "Platform Central Fraud Blacklist & Threat Defense"}
              {adminTab === "billing" && "Subscription Invoices & Payment Approvals"}
              {adminTab === "llm" && "LLM Tokens, Latency & API Infrastructure"}
              {adminTab === "features" && "Global Feature Flags & Master Prompts"}
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search client by store, owner, or phone..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("New client onboarding link generated!")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    + Onboard New Store
                  </button>
                </div>
              </div>

              {/* Clients Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-3">Store ID</th>
                        <th className="px-5 py-3">Store & Owner</th>
                        <th className="px-5 py-3">Channels</th>
                        <th className="px-5 py-3">Plan</th>
                        <th className="px-5 py-3">MRR</th>
                        <th className="px-5 py-3">Bot Status</th>
                        <th className="px-5 py-3 text-right">Owner Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredClients.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-4 font-mono text-slate-400">{c.id}</td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-white text-sm">{c.name}</div>
                            <div className="text-slate-400 text-xs">{c.owner} ({c.phone})</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex gap-1 flex-wrap">
                              {c.channels.map((ch, i) => (
                                <span key={i} className="bg-slate-800 text-[10px] px-1.5 py-0.5 rounded text-slate-300">
                                  {ch}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4 font-mono font-bold text-slate-200">{c.plan}</td>
                          <td className="px-5 py-4 font-mono text-emerald-400 font-bold">
                            {c.revenueBDT > 0 ? `৳${c.revenueBDT}` : "Trial Free"}
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              c.status === "Active"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : c.status === "Trial"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right space-x-2">
                            <Link
                              href={`/dashboard?impersonate=${c.id}&store=${encodeURIComponent(c.name)}`}
                              className="text-xs bg-emerald-950/70 hover:bg-emerald-900 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/40 inline-flex items-center gap-1 font-semibold transition-colors"
                              title={`Impersonate and login as ${c.name}`}
                            >
                              <LogIn className="w-3 h-3 text-emerald-400" />
                              <span>Login as Store 🔑</span>
                            </Link>
                            <button
                              onClick={() => handleToggleStoreStatus(c.id)}
                              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors ${
                                c.status === "Active"
                                  ? "bg-slate-800 text-amber-400 border-amber-500/30 hover:bg-slate-700"
                                  : "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500"
                              }`}
                            >
                              {c.status === "Active" ? "Pause Bot" : "Activate"}
                            </button>
                            <Link
                              href="/dashboard"
                              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 inline-flex items-center gap-1"
                            >
                              <span>Inspect</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
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
              {/* KPI Header */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Total Lead Marketplace Revenue</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">৳17,470</div>
                  <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>100% Net Profit Margin</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Pending Lead Dispatches</div>
                  <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                    {leadOrders.filter((o) => o.status !== "Dispatched").length} Orders
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">Awaiting Trx or Dispatch</div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Total Verified Leads Delivered</div>
                  <div className="text-2xl font-black text-white font-mono mt-1">3,000+</div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-1">Courier Verified Clean</div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Automated Dispatch Channel</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono mt-1">WhatsApp API</div>
                  <div className="text-[11px] text-slate-400 mt-1">Instant .CSV Vault Link</div>
                </div>
              </div>

              {/* Lead Orders Table */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-md">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white">Merchant Lead Purchase Queue</h3>
                    <p className="text-xs text-slate-400">
                      Verify bKash / Nagad Trx and 1-Click dispatch verified buyer CSV directly to merchant WhatsApp.
                    </p>
                  </div>
                  <div className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300">
                    Auto-Verification: <span className="text-emerald-400 font-bold">bKash Webhook Active</span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                      <tr>
                        <th className="px-5 py-3">Order ID</th>
                        <th className="px-5 py-3">Buyer & Store</th>
                        <th className="px-5 py-3">Package & Category</th>
                        <th className="px-5 py-3">Trx ID & Method</th>
                        <th className="px-5 py-3">Amount</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3 text-right">Fulfillment Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {leadOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-4 font-mono font-bold text-slate-300">
                            <div>{order.id}</div>
                            <div className="text-[10px] text-slate-500 font-normal">{order.date}</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-bold text-white text-sm">{order.buyerName}</div>
                            <div className="text-slate-400 font-mono text-xs">{order.phone}</div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-200">{order.packTitle}</div>
                            <div className="text-[11px] text-emerald-400 font-mono">
                              {order.category} • {order.leadsCount} leads
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                              {order.method}: {order.trxId}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono text-emerald-400 font-bold text-sm">
                            ৳{order.amountBDT.toLocaleString()}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                order.status === "Dispatched"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : order.status === "Payment Verified"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right space-x-2">
                            {order.status === "Awaiting Payment" && (
                              <button
                                onClick={() => handleVerifyLeadOrder(order.id)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Verify bKash Trx</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleDownloadSampleCsv(order)}
                              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors inline-flex items-center gap-1.5"
                              title="Download Lead CSV file to inspect"
                            >
                              <Download className="w-3 h-3 text-emerald-400" />
                              <span>Download CSV</span>
                            </button>

                            <button
                              onClick={() => handleDispatchLead(order)}
                              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors inline-flex items-center gap-1.5 ${
                                order.status === "Dispatched"
                                  ? "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                              }`}
                            >
                              <Send className="w-3 h-3" />
                              <span>{order.status === "Dispatched" ? "Re-Dispatch WhatsApp" : "Dispatch WhatsApp 🚀"}</span>
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

          {/* TAB 3: BILLING & PAYMENT VERIFICATION */}
          {adminTab === "billing" && (
            <div className="space-y-6">
              
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">Manual Payment & bKash / Nagad Trx Approval</h3>
                  <p className="text-xs text-slate-400">Review client subscription renewal receipts and activate store licenses.</p>
                </div>
                <div className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                  Total Collected: <strong className="text-emerald-400">৳184,500 BDT</strong>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3">Invoice ID</th>
                      <th className="px-5 py-3">Store Name</th>
                      <th className="px-5 py-3">Payment Method</th>
                      <th className="px-5 py-3">Trx ID</th>
                      <th className="px-5 py-3">Amount</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-4 font-mono font-bold text-slate-300">{p.id}</td>
                        <td className="px-5 py-4 font-bold text-white">{p.storeName}</td>
                        <td className="px-5 py-4">{p.method}</td>
                        <td className="px-5 py-4 font-mono text-slate-300">{p.trxId}</td>
                        <td className="px-5 py-4 font-mono text-emerald-400 font-bold">৳{p.amountBDT}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.status === "Verified" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-300"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          {p.status === "Pending Approval" ? (
                            <button
                              onClick={() => handleApprovePayment(p.id)}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded-lg transition-colors"
                            >
                              Approve Trx ✓
                            </button>
                          ) : (
                            <span className="text-slate-500 text-xs">Approved</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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

        </div>

      </main>
    </div>
  );
}
