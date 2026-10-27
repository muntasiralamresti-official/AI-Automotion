import { 
  Bot, 
  MessageSquare, 
  Zap, 
  Server, 
  ShoppingBag, 
  UserCheck, 
  TrendingUp, 
  Truck, 
  SlidersHorizontal,
  Globe2,
  Cpu,
  Layers
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: "Sub-3s Response Velocity",
      description: "Engage prospects instantly at 3 AM or during flash sales. Never let a qualified buyer bounce to a competitor while waiting for a reply.",
      badge: "Zero Latency",
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-emerald-600" />,
      title: "Autonomous Order Capture",
      description: "Intelligently extracts delivery addresses, valid 11-digit phone numbers, color/size variations, and creates verified orders automatically.",
      badge: "High Conversion",
    },
    {
      icon: <Server className="w-6 h-6 text-emerald-600" />,
      title: "100% Cloud-Native Execution",
      description: "No need to keep laptops or office PCs running. Our enterprise cloud workers run 24/7/365 with automated failover and 99.98% uptime.",
      badge: "Zero Hardware",
    },
    {
      icon: <Globe2 className="w-6 h-6 text-emerald-600" />,
      title: "Native Multilingual & Dialect Support",
      description: "Understands and responds naturally in English, formal Bengali, colloquial Banglish, and regional phrasing without sounding robotic.",
      badge: "Cultural Nuance",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
      title: "Omnichannel Social Commerce",
      description: "Connect your official WhatsApp Business Cloud API, Facebook Page, and Instagram DM in a single unified dashboard.",
      badge: "Unified Inbox",
    },
    {
      icon: <SlidersHorizontal className="w-6 h-6 text-emerald-600" />,
      title: "Zero-Code Knowledge Training",
      description: "Add new products, adjust pricing, or update delivery terms in seconds. Our agent ingests your updates and deploys instantly.",
      badge: "Live Sync",
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      title: "Automated Logistics & Courier APIs",
      description: "Built-in dispatch routing for Steadfast, RedX, Pathao, and global fulfillment webhooks to generate consignment IDs automatically.",
      badge: "Fulfillment Ready",
    },
    {
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
      title: "Smart Human-in-the-Loop Takeover",
      description: "Seamlessly step into any conversation with a single click whenever high-touch VIP handling or manual intervention is requested.",
      badge: "Full Control",
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>Enterprise-Grade Platform</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineered to Convert Every Inbound Social Lead
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Combine conversational AI with automated checkout logistics. Built for social sellers, Direct-to-Consumer brands, and modern e-commerce stores.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/5 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
