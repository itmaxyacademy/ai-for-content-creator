import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface TickerItem {
  name: string;
  city: string;
  pkg: string;
  mins: number;
}

const TICKER_ITEMS: TickerItem[] = [
  { name: "Rizky", city: "Bandung", pkg: "Onsite Promo", mins: 2 },
  { name: "Sari", city: "Jakarta Barat", pkg: "Online Class", mins: 7 },
  { name: "Dewi", city: "Surabaya", pkg: "Onsite Promo", mins: 12 },
  { name: "Andi", city: "Bekasi", pkg: "Online Class", mins: 18 },
  { name: "Maya", city: "Depok", pkg: "Onsite Promo", mins: 25 },
];

export default function LiveTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show ticker 4 seconds after page load
    const startTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Rotate item every 9 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      
      // Allow fade-out animation before changing text
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % TICKER_ITEMS.length);
        setIsVisible(true);
      }, 500);
      
    }, 9000);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, []);

  const currentItem = TICKER_ITEMS[currentIndex];

  if (!currentItem) return null;

  return (
    <div
      className={`fixed z-40 left-4 bottom-[72px] md:bottom-6 max-w-[280px] md:max-w-xs transition-all duration-500 transform ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl border border-slate-100 p-3 flex items-center gap-3 shadow-[0_8px_30px_rgba(11,22,40,0.12)]">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-4.5 h-4.5" />
        </div>
        <div className="leading-tight">
          <p className="text-xs font-bold text-navy">
            {currentItem.name} dari {currentItem.city}
          </p>
          <p className="text-[10px] text-slate-500 font-medium">
            baru daftar paket {currentItem.pkg} · {currentItem.mins}m lalu
          </p>
        </div>
      </div>
    </div>
  );
}
