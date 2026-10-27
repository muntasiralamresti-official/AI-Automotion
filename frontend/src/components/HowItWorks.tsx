import { CheckCircle, ArrowRight, PlugZap, BookOpen, Rocket } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <PlugZap className="w-6 h-6 text-emerald-600" />,
      title: "Connect Channels in 2 Clicks",
      desc: "Link your Facebook Page, Instagram Account, and official Meta WhatsApp Cloud API via our secure OAuth connector. No complex coding required.",
      highlight: "2 Minutes Setup",
    },
    {
      number: "02",
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      title: "Feed Product Knowledge",
      desc: "Upload product catalogs, prices, delivery rates, and FAQ responses through your intuitive dashboard. The AI synthesizes everything instantly.",
      highlight: "Self-Learning Engine",
    },
    {
      number: "03",
      icon: <Rocket className="w-6 h-6 text-emerald-600" />,
      title: "Activate Autonomous Sales",
      desc: "Sit back and watch inbound messages turn into verified orders. Orders land on your dashboard ready for 1-click courier dispatch.",
      highlight: "24/7 Hands-Free ROI",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-emerald-50/40 border-y border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-3.5 py-1.5 rounded-full">
            Effortless Onboarding
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3">
            Live in Under 10 Minutes
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Our streamlined onboarding guides you step-by-step, backed by our white-glove setup team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-md shadow-emerald-950/5 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-emerald-600 font-mono">
                    {step.number}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {step.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Fully managed cloud execution included</span>
              </div>
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-slate-900">
              Need Help With Custom Prompts or Courier Setup?
            </h4>
            <p className="text-sm text-slate-600">
              Our technical engineering team provides free 1-on-1 screen-share onboarding to test and verify your agent before launch.
            </p>
          </div>
          <a
            href="#pricing"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all"
          >
            <span>Book Onboarding Call</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
