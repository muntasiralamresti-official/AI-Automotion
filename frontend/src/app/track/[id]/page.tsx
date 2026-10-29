"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Search,
  ExternalLink,
  ShoppingBag,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import ZyncooLogo from "@/components/ZyncooLogo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TrackingData {
  orderId: string;
  storeName: string;
  storePhone: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  item: string;
  amount: number;
  paymentMethod: "Cash on Delivery (COD)" | "Paid via bKash";
  courier: "Steadfast Courier" | "Pathao Express" | "RedX";
  consignmentId: string;
  status: "In Transit" | "Delivered" | "Out for Delivery" | "Confirmed";
  estimatedDelivery: string;
  riderName?: string;
  riderPhone?: string;
  timeline: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
    current?: boolean;
  }[];
}

const mockOrders: Record<string, TrackingData> = {
  "ORD-9821": {
    orderId: "ORD-9821",
    storeName: "GadgetZone BD",
    storePhone: "+880 1700-000000",
    customerName: "Tanvir Hasan",
    customerPhone: "01711-987654",
    deliveryAddress: "House 12, Road 5, Dhanmondi 27, Dhaka",
    item: "Ultra Watch 9 (Black Edition)",
    amount: 1550,
    paymentMethod: "Cash on Delivery (COD)",
    courier: "Steadfast Courier",
    consignmentId: "STDFST-881293",
    status: "Out for Delivery",
    estimatedDelivery: "Today by 6:00 PM",
    riderName: "Md. Shakil Ahmed (Dhanmondi Hub)",
    riderPhone: "01811-223344",
    timeline: [
      {
        title: "Order Placed & AI Verified",
        description: "Verified by Zyncoo AI on WhatsApp. Anti-fraud check passed (96% delivery profile).",
        time: "Yesterday, 02:14 AM",
        completed: true,
      },
      {
        title: "Package Quality Checked & Packed",
        description: "GadgetZone BD warehouse packed product with warranty seal.",
        time: "Yesterday, 10:30 AM",
        completed: true,
      },
      {
        title: "Handed over to Steadfast Courier",
        description: "Consignment #STDFST-881293 accepted at Central Dhaka Sorting Hub.",
        time: "Yesterday, 04:15 PM",
        completed: true,
      },
      {
        title: "Out for Delivery",
        description: "Rider Md. Shakil Ahmed is on the way to Dhanmondi 27.",
        time: "Today, 11:45 AM",
        completed: true,
        current: true,
      },
      {
        title: "Delivered & Cash Collected",
        description: "Recipient inspects parcel and pays ৳1,550 cash on delivery.",
        time: "Estimated by 6:00 PM",
        completed: false,
      },
    ],
  },
  "ORD-9820": {
    orderId: "ORD-9820",
    storeName: "GadgetZone BD",
    storePhone: "+880 1700-000000",
    customerName: "Rafsan Jamil",
    customerPhone: "01819-455667",
    deliveryAddress: "GEC Circle, Nasirabad, Chittagong",
    item: "Wireless ANC Earbuds Pro",
    amount: 2190,
    paymentMethod: "Cash on Delivery (COD)",
    courier: "Pathao Express",
    consignmentId: "PTH-992102",
    status: "In Transit",
    estimatedDelivery: "Tomorrow by 2:00 PM",
    timeline: [
      {
        title: "Order Placed & AI Verified",
        description: "Inbound Messenger inquiry captured and recorded automatically.",
        time: "Yesterday, 11:20 PM",
        completed: true,
      },
      {
        title: "Packed & Ingested into Pathao Hub",
        description: "Consignment generated with Pathao Express #PTH-992102.",
        time: "Today, 09:30 AM",
        completed: true,
      },
      {
        title: "In Transit to Chittagong Hub",
        description: "Inter-district highway transport in transit.",
        time: "Today, 02:00 PM",
        completed: true,
        current: true,
      },
      {
        title: "Out for Delivery",
        description: "Local Nasirabad delivery rider assignment.",
        time: "Tomorrow Morning",
        completed: false,
      },
      {
        title: "Delivered",
        description: "Parcel completed.",
        time: "Tomorrow, 2:00 PM",
        completed: false,
      },
    ],
  },
};

function TrackingContent() {
  const params = useParams();
  const rawId = (params?.id as string) || "ORD-9821";
  const requestedId = rawId.toUpperCase();

  const [searchQuery, setSearchQuery] = useState(requestedId);
  const activeOrder = mockOrders[searchQuery] || mockOrders[requestedId] || mockOrders["ORD-9821"];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
        
        {/* Search Bar for other orders */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-sm text-slate-900">Live Parcel Tracking</span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formatted = searchQuery.trim().toUpperCase();
              if (mockOrders[formatted]) {
                setSearchQuery(formatted);
              } else {
                alert(`Tracking for order "${searchQuery}" is active under simulated courier sync.`);
              }
            }}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ORD-9821)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              Track
            </button>
          </form>
        </div>

        {/* Main Tracking Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          
          {/* Top Info Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-slate-900">{activeOrder.storeName}</span>
                <span>•</span>
                <span>Order #{activeOrder.orderId}</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                <span>Status:</span>
                <span className="text-emerald-600">{activeOrder.status}</span>
              </h1>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Shipped via <strong>{activeOrder.courier}</strong> (Consignment #{activeOrder.consignmentId})</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-2xl text-left sm:text-right shrink-0">
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Estimated Delivery</div>
              <div className="text-sm font-extrabold text-emerald-950 mt-0.5">{activeOrder.estimatedDelivery}</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1 sm:justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live GPS Transit</span>
              </div>
            </div>
          </div>

          {/* Live Rider Capsule (if Out for Delivery) */}
          {activeOrder.riderName && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Assigned Delivery Rider</div>
                  <div className="font-bold text-sm text-slate-900">{activeOrder.riderName}</div>
                  <div className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Phone className="w-3 h-3 text-blue-600" />
                    <span>{activeOrder.riderPhone}</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${activeOrder.riderPhone}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Delivery Rider</span>
              </a>
            </div>
          )}

          {/* Stepper Timeline */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-sm text-slate-900">Shipment Timeline</h3>
            
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {activeOrder.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.current
                        ? "bg-emerald-600 text-white ring-4 ring-emerald-100 animate-pulse"
                        : step.completed
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step.completed ? "✓" : idx + 1}
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5">
                      <h4 className={`text-xs sm:text-sm font-bold ${step.completed ? "text-slate-900" : "text-slate-400"}`}>
                        {step.title}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">{step.time}</span>
                    </div>
                    <p className={`text-xs mt-0.5 leading-relaxed ${step.completed ? "text-slate-600" : "text-slate-400"}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Details & Summary Box */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                Delivery Address
              </span>
              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">{activeOrder.customerName}</div>
                  <div>{activeOrder.deliveryAddress}</div>
                  <div className="font-mono text-slate-500 mt-0.5">{activeOrder.customerPhone}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                Payment Summary
              </span>
              <div className="space-y-1 text-slate-700">
                <div className="flex justify-between">
                  <span>Item:</span>
                  <span className="font-semibold">{activeOrder.item}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Type:</span>
                  <span className="font-semibold text-emerald-700">{activeOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Payable Amount:</span>
                  <span className="font-mono text-emerald-600 font-black">৳{activeOrder.amount}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Merchant Support Help */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Questions about your delivery? Contact <strong>{activeOrder.storeName}</strong> on WhatsApp.</span>
            </div>
            <a
              href={`https://wa.me/8801700000000?text=Hi%20I%20have%20a%20question%20about%20order%20${activeOrder.orderId}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:text-emerald-900 font-bold underline shrink-0 cursor-pointer"
            >
              WhatsApp Merchant →
            </a>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Loading live courier tracking...</span>
          </div>
        </div>
      }
    >
      <TrackingContent />
    </Suspense>
  );
}

