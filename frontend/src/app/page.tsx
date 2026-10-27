import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MidnightCaseStudyPlayer from "@/components/MidnightCaseStudyPlayer";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import RtoAuditCalculator from "@/components/RtoAuditCalculator";
import LeadGenSection from "@/components/LeadGenSection";
import RoiCalculator from "@/components/RoiCalculator";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MidnightCaseStudyPlayer />
        <FeaturesSection />
        <HowItWorks />
        <RtoAuditCalculator />
        <LeadGenSection />
        <RoiCalculator />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
