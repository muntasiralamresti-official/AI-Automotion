import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oddo AI | Autonomous Conversational Sales Agent for WhatsApp & Messenger",
  description: "Oddo AI turns social inquiries into confirmed orders 24/7. Official WhatsApp Cloud API & Meta Messenger integration with native Bengali & English LLMs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
