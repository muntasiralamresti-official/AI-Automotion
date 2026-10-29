import Image from "next/image";

export default function OddoLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-sm bg-lime-400 p-0.5 border border-lime-500/30 ${className}`}
    >
      <Image
        src="/zyncoo-icon.jpg"
        alt="Zyncoo AI Logo"
        width={64}
        height={64}
        className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 rounded-xl"
        priority
      />
    </div>
  );
}
