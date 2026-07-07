import React, { useState, useEffect } from "react";
import { Lead } from "../types";
import { Download, Trash2, Users, ShieldAlert, X, DollarSign, Search, Calendar } from "lucide-react";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const loadLeads = () => {
    try {
      const stored = localStorage.getItem("maxy_aicc_leads");
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        setLeads([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }

    // Listen to form submit event to auto-refresh leads
    const handleRefresh = () => {
      loadLeads();
    };
    window.addEventListener("leadSubmitted", handleRefresh);
    return () => window.removeEventListener("leadSubmitted", handleRefresh);
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter & Search logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm) ||
      lead.kota.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.pekerjaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.namaPerusahaan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "Online" && lead.paket.includes("Online")) ||
      (selectedFilter === "Onsite" && lead.paket.includes("Onsite"));

    return matchesSearch && matchesFilter;
  });

  // Calculate projected revenue
  const totalProjectedValue = filteredLeads.reduce((acc, lead) => {
    // extract numerical value from lead.harga (e.g. "Rp 2.500.000" -> 2500000)
    const numericStr = lead.harga.replace(/[^0-9]/g, "");
    const value = parseInt(numericStr, 10) || 0;
    return acc + value;
  }, 0);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!filteredLeads.length) return;
    
    const headers = ["ID", "Nama Lengkap", "Email Aktif", "No. WhatsApp", "Kota", "Pekerjaan", "Perusahaan/Instansi", "Paket Kelas", "Harga Early Bird", "Waktu Daftar"];
    const csvRows = [
      headers.join(","), // header row
      ...filteredLeads.map((l) => [
        `"${l.id}"`,
        `"${l.nama.replace(/"/g, '""')}"`,
        `"${l.email.replace(/"/g, '""')}"`,
        `"${l.whatsapp}"`,
        `"${l.kota.replace(/"/g, '""')}"`,
        `"${l.pekerjaan.replace(/"/g, '""')}"`,
        `"${l.namaPerusahaan.replace(/"/g, '""')}"`,
        `"${l.paket}"`,
        `"${l.harga}"`,
        `"${l.timestamp}"`,
      ].join(",")),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `MAXY_AICC_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Clear leads
  const handleClearLeads = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua data pendaftaran lokal? Tindakan ini tidak dapat dibatalkan.")) {
      localStorage.removeItem("maxy_aicc_leads");
      setLeads([]);
    }
  };

  return (
    <div className="fixed inset-0 z-200 bg-navy/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] md:h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-navy text-white p-5 md:px-8 flex justify-between items-center border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base md:text-lg">Panel Lead Management (Sales CRM)</h2>
              <p className="text-[10px] text-slate-400 font-mono">
                Penyimpanan Data Lokal Aman Terintegrasi Form Landing Page
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Analytics row */}
        <div className="bg-slate-50 px-5 py-4 md:px-8 border-b border-slate-200 grid sm:grid-cols-3 gap-4 flex-shrink-0">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center text-blue">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">Total Pendaftar</p>
              <h3 className="text-xl font-black font-mono text-navy">{filteredLeads.length} Leads</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold">Proyeksi Pendapatan</p>
              <h3 className="text-xl font-black font-mono text-green-600">{formatPrice(totalProjectedValue)}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={handleExportCSV}
              disabled={!filteredLeads.length}
              className="px-4 py-2.5 bg-navy hover:bg-navy-light text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" /> Ekspor CSV
            </button>
            <button
              onClick={handleClearLeads}
              disabled={!leads.length}
              className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" /> Reset Data
            </button>
          </div>
        </div>

        {/* Filter / Search Row */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, email, whatsapp, pekerjaan, kota..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl text-xs md:text-sm text-navy placeholder-slate-400 border border-slate-200 focus:outline-none focus:bg-white focus:border-blue"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedFilter === "all" ? "bg-blue text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Semua Paket
            </button>
            <button
              onClick={() => setSelectedFilter("Onsite")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedFilter === "Onsite" ? "bg-blue text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Onsite Saja
            </button>
            <button
              onClick={() => setSelectedFilter("Online")}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                selectedFilter === "Online" ? "bg-blue text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Online Saja
            </button>
          </div>
        </div>

        {/* Leads Table Container */}
        <div className="flex-1 overflow-auto">
          {filteredLeads.length > 0 ? (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-mono font-bold text-[10px] uppercase tracking-wider sticky top-0 z-10">
                  <th className="p-4 pl-6">ID</th>
                  <th className="p-4">Identitas Leads</th>
                  <th className="p-4">WhatsApp / Kota</th>
                  <th className="p-4">Pekerjaan &amp; Instansi</th>
                  <th className="p-4">Pilihan Paket</th>
                  <th className="p-4 text-right pr-6">Harga / Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-navy">
                {filteredLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6 font-mono text-slate-400">#{l.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-sm text-navy">{l.nama}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{l.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-blue">{l.whatsapp}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{l.kota}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-700">{l.pekerjaan}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{l.namaPerusahaan}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        l.paket.includes("Onsite") 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {l.paket}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="font-black text-cyan-800 font-mono">{l.harga}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1 justify-end font-mono">
                        <Calendar className="w-3 h-3" /> {l.timestamp}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
              <ShieldAlert className="w-12 h-12 text-slate-300 mb-2.5" />
              <h4 className="font-bold text-navy text-sm">Belum ada leads terdaftar</h4>
              <p className="text-slate-400 text-xs max-w-xs mt-1 leading-normal">
                Isi formulir pendaftaran di landing page terlebih dahulu untuk melihat baris leads masuk secara real-time di sini.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 text-center text-[10px] text-slate-500 font-mono flex-shrink-0">
          * Data di atas disimpan secara lokal di browser Anda. Sangat aman dan ideal untuk demonstrasi penjualan instan.
        </div>
      </div>
    </div>
  );
}
