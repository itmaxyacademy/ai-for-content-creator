import React, { useState, useEffect } from "react";
import { APP_CONFIG } from "../data";

export default function StickyFooter() {
  const [timeLeftStr, setTimeLeftStr] = useState("--h --m");

  useEffect(() => {
    const getTargetTime = () => {
      const now = Date.now();
      const stored = localStorage.getItem("maxy_evergreen_timer_1h");
      if (stored) {
        const val = parseInt(stored, 10);
        if (val > now) {
          return val;
        }
      }
      const newTarget = now + 60 * 60 * 1000;
      localStorage.setItem("maxy_evergreen_timer_1h", String(newTarget));
      return newTarget;
    };

    const target = getTargetTime();

    const updateTimer = () => {
      const now = Date.now();
      let difference = target - now;

      if (difference <= 0) {
        difference = 0;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeftStr(`${hours}j ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}d`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000); // update every second for live ticking

    return () => clearInterval(interval);
  }, []);

  const handleScrollToDaftar = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("daftar");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1628]/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-2 items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
      <div className="flex-1 leading-tight text-left">
        <span className="text-[10px] font-mono uppercase text-cyan font-bold tracking-wider">
          Early Bird Diskon
        </span>
        <div className="text-xs text-white mt-0.5">
          Sisa Waktu: <strong className="text-amber font-mono font-black">{timeLeftStr}</strong>
        </div>
      </div>
      <a
        href="#daftar"
        onClick={handleScrollToDaftar}
        className="px-5 py-3 rounded-xl bg-gradient-to-r from-wa to-[#1aaa52] text-white font-black text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all flex-shrink-0"
      >
        Daftar Sekarang →
      </a>
    </div>
  );
}
