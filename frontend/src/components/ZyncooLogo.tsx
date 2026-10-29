import Image from "next/image";

export default function ZyncooLogo({
  className = "w-9 h-9",
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
        className={`relative flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-sm bg-lime-400 p-1 border border-lime-500/30 ${className}`}
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
      {showText && (
        <span className={`tracking-tight text-white ${textClassName}`}>
          Zyncoo<span className="text-lime-400">.ai</span>
        </span>
      )}
    </div>
  );
}
