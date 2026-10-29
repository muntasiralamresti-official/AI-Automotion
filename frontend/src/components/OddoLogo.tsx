import Image from "next/image";

export default function OddoLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-900/10 bg-[#b8e900] ${className}`}
    >
      <Image
        src="/zyncoo-icon.png"
        alt="Zyncoo AI Logo"
        fill
        sizes="64px"
        className="object-cover hover:scale-105 transition-transform duration-300"
        priority
      />
    </div>
  );
}
