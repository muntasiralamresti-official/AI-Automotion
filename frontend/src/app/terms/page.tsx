import Link from "next/link";
import OddoLogo from "@/components/OddoLogo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
          
          <div className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
              <span>Service Terms</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Effective Date: October 27, 2026 • Oddo AI Automation Platform
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              By accessing or using Oddo (<span className="font-mono text-emerald-700">oddo.ai</span>), you agree to be bound by these Terms of Service and all applicable laws and regulations in the People&apos;s Republic of Bangladesh and international SaaS jurisdictions. If you do not agree, you are prohibited from using or accessing this service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Service Description & License</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Oddo provides cloud-based conversational artificial intelligence software allowing businesses to automate sales discussions, product inquiries, inventory tracking, courier booking, and order confirmation over WhatsApp Cloud API, Facebook Messenger, and Instagram DM.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Acceptable Use & Meta Policies</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Subscribers agree never to use Oddo for:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>Unsolicited spamming or scraping of personal user phone numbers.</li>
              <li>Selling restricted, prohibited, or counterfeit goods under Bangladeshi commerce regulations or Meta Commerce Policies (weapons, illegal substances, tobacco, fraudulent financial schemes).</li>
              <li>Sending deceptive broadcast messages without recipient opt-in consent.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Billing, Subscriptions & Refunds</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Oddo subscriptions are billed on a recurring monthly or annual basis via bKash Merchant, Nagad, or International Credit/Debit Cards. 
              We offer a <strong>7-Day Free Pilot</strong> for eligible stores. Merchants may cancel subscriptions at any time from their Client Portal without hidden cancellation penalties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              While Oddo employs strict guardrails and server-authoritative catalog pricing to prevent AI hallucinations, Oddo is not liable for indirect damages, courier transit delays caused by third-party delivery services (Steadfast, Pathao, RedX), or network downtime of Meta Graph APIs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">6. Governing Law</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              These terms are governed and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Disputes will be handled in the competent courts of Dhaka, Bangladesh.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
