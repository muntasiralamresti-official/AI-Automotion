import Link from "next/link";
import ZyncooLogo from "@/components/ZyncooLogo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
          
          <div className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3 border border-emerald-200">
              <span>Legal & Security Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Last Updated: October 27, 2026 • Compliant with Meta Platform Terms & WhatsApp Business Cloud API Guidelines
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Overview & Commitment</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Zyncoo (&quot;Zyncoo AI&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) provides autonomous conversational artificial intelligence software designed for social commerce merchants across WhatsApp Cloud API, Facebook Messenger, and Instagram Direct. We take data privacy, security, and compliance with Meta Platforms, Inc. policies with the utmost seriousness.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Data We Collect</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When merchants integrate Zyncoo with their Facebook Page, Instagram Account, or WhatsApp Business Account (WABA), and when shoppers message those business channels, we process the following data strictly to fulfill commerce interactions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li><strong>Merchant Profile Data:</strong> Store name, business email, authorized Facebook Page ID, and WhatsApp Business Account ID.</li>
              <li><strong>Inbound Chat Messages:</strong> Text, voice notes (processed via Whisper Speech-to-Text), and image attachments sent by prospective buyers to inquire about products or confirm orders.</li>
              <li><strong>Order Fulfillment Information:</strong> Customer recipient name, delivery address, and Bangladeshi mobile number (11-digit format) required for booking courier consignments (Steadfast, Pathao, RedX).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Meta Platform Terms & WhatsApp Cloud API Compliance</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Zyncoo strictly adheres to the Meta Developer Data Use Policy and WhatsApp Business Policy:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>We <strong>never sell, rent, or monetize</strong> customer personal data or chat records to third-party data brokers or advertising networks.</li>
              <li>Webhook payloads received from Meta are encrypted in transit via TLS 1.3 and validated using HMAC-SHA256 signature verification.</li>
              <li>Customer data is exclusively utilized to respond to customer inquiries and facilitate parcel shipment with authorized domestic couriers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Third-Party Integrations & Courier Dispatch</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When an order is confirmed, customer delivery information is securely dispatched to the merchant&apos;s configured courier partner (such as Steadfast Courier or Pathao Courier) exclusively to print shipping consignment waybills.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Data Retention & User Data Deletion Instructions</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In accordance with Meta Platform Policy, users and merchants have the right to request deletion of their data at any time:
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
              <p className="font-semibold text-slate-900">How to request data deletion:</p>
              <p>1. Merchants can delete their store account and wipe conversation history directly from their Zyncoo Client Portal under <strong>Settings &gt; Data Management</strong>.</p>
              <p>2. Alternatively, send an email to <span className="font-mono text-emerald-700 font-bold">privacy@zyncoo.ai</span> with your Facebook Page ID or WhatsApp Business Number.</p>
              <p>3. Automated callback endpoint: <Link href="/api/auth/data-deletion" className="text-emerald-600 font-mono underline">/api/auth/data-deletion</Link>.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">6. Contact Information</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you have any questions or security concerns regarding this Privacy Policy, please contact our Data Protection Team at <span className="font-mono text-emerald-700 font-bold">support@zyncoo.ai</span> or Dhaka, Bangladesh.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
