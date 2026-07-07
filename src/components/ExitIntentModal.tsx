import React, { useState, useEffect } from "react";
import { X, Gift, ArrowRight } from "lucide-react";
import { APP_CONFIG } from "../data";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Only bind on desktop screens
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves out of top viewport
      if (!hasTriggered && e.clientY <= 0 && !e.relatedTarget) {
        setIsOpen(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClaim = () => {
    setIsOpen(false);
    const target = document.getElementById("daftar");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 text-center relative border border-slate-200 shadow-2xl animate-[slideUp_0.35s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-navy text-2xl leading-none transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto bg-amber/10 rounded-full flex items-center justify-center text-amber mb-4">
          <Gift className="w-8 h-8 animate-bounce" />
        </div>

        <h3 className="text-2xl font-black mb-2 text-navy leading-snug">
          Tunggu — jangan pergi dulu! ✋
        </h3>
        <p className="text-muted text-xs md:text-sm mb-5 leading-relaxed">
          Peluang kuasai AI dengan harga hemat masih di depan mata. Begitu batas waktu habis, harga naik <strong className="text-ember font-black">Rp 1.000.000</strong>. Yakin mau melewatkan diskon ini?
        </p>

        {/* Highlight Price */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
          <p className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider">
            Sisa Kuota Promo Hari Ini
          </p>
          <p className="text-2xl font-black text-blue mt-1 font-mono">
            {APP_CONFIG.prices.onsitePromoEarly}{" "}
            <span className="text-xs md:text-sm line-through text-slate-400 font-semibold font-mono">
              {APP_CONFIG.prices.onsiteNormal}
            </span>
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-wa to-[#1aaa52] text-white font-black py-4 rounded-xl text-xs md:text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5"
        >
          Oke, Amankan Harga Early Bird <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleClose}
          className="text-slate-400 hover:text-navy text-[11px] underline mt-3.5 block mx-auto"
        >
          Nggak, saya ingin bayar harga normal nanti
        </button>
      </div>
    </div>
  );
}
