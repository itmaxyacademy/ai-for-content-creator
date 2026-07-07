import React from "react";
import { MessageSquare } from "lucide-react";
import { APP_CONFIG } from "../data";

export default function FloatingWaCs() {
  const waCSText = encodeURIComponent(
    "Halo CS MAXY, saya mau bertanya mengenai Intensive Class AI-Driven Content Creation tanggal 12-13 Agustus 2026."
  );
  const waUrl = `https://wa.me/${APP_CONFIG.waCS}?text=${waCSText}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed z-40 right-4 bottom-[72px] md:bottom-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-black pl-3 pr-4 py-3 rounded-full flex items-center gap-2 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow"
      style={{
        boxShadow: "0 8px 30px rgba(37,211,102,0.5)",
      }}
    >
      {/* Custom SVG WhatsApp Logo for maximal high-fidelity */}
      <svg className="w-5 h-5 flex-shrink-0 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.893-9.892.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.738-.975zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
      <span className="text-xs md:text-sm">Tanya CS</span>
    </a>
  );
}
