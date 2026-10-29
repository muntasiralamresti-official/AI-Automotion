import Image from "next/image";

export default function ZyncooLogo({
  className = "w-10 h-10",
  showText = false,
  textClassName = "text-xl font-black",
}: {
  className?: string;
  showText?: boolean;
  textClassName?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 shrink-0 select-none">
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
      {showText && (
        <span className={`tracking-tight text-white ${textClassName}`}>
          Zyncoo<span className="text-lime-400">.ai</span>
        </span>
      )}
    </div>
  );
}
