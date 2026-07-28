import React, { useState, useEffect } from "react";
import { X, Gift, ArrowRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function ExitIntentModal() {
  const { content } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
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
          className="absolute top-4 right-4 text-slate-400 hover:text-navy text-2xl leading-none transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto bg-amber/10 rounded-full flex items-center justify-center text-amber mb-4">
          <Gift className="w-8 h-8 animate-bounce" />
        </div>

        <h3 className="text-2xl font-black mb-2 text-navy leading-snug">
          {content.popupConfig.exitTitle || "Tunggu — jangan pergi dulu! ✋"}
        </h3>
        <p className="text-muted text-xs md:text-sm mb-5 leading-relaxed">
          {content.popupConfig.exitDesc || `Peluang kuasai AI dengan Harga Khusus Mitra Universitas (${content.appConfig.prices.mitraCurrent}) masih di depan mata!`}
        </p>

        {/* Highlight Price */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
          <p className="text-[10px] font-mono uppercase text-ember font-bold tracking-wider">
            {content.popupConfig.exitPriceTag || "🔥 Harga Khusus Mitra Universitas"}
          </p>
          <p className="text-2xl font-black text-blue mt-1 font-mono">
            {content.appConfig.prices.mitraCurrent || "Rp 1.800.000"}{" "}
            <span className="text-xs md:text-sm line-through text-slate-400 font-semibold font-mono">
              {content.appConfig.prices.mitraNormal || "Rp 2.500.000"}
            </span>
          </p>
        </div>

        <button
          onClick={handleClaim}
          className="w-full bg-gradient-to-r from-wa to-[#1aaa52] text-white font-black py-4 rounded-xl text-xs md:text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {content.popupConfig.exitCtaText || "Oke, Amankan Harga Diskon"} <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleClose}
          className="text-slate-400 hover:text-navy text-[11px] underline mt-3.5 block mx-auto cursor-pointer"
        >
          Nggak, saya ingin bayar harga normal nanti
        </button>
      </div>
    </div>
  );
}
