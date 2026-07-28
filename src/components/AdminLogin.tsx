import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBackToSite }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi");
      return;
    }

    // Default credentials
    if (username.trim() === "admin" && password === "maxyadmin") {
      sessionStorage.setItem("maxy_admin_auth", "true");
      setError("");
      onLoginSuccess();
    } else {
      setError("Username atau Password salah. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1628] text-white flex flex-col justify-between items-center p-4 relative overflow-hidden font-sans selection:bg-cyan/30">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Top Bar Back link */}
      <div className="w-full max-w-md pt-4 flex justify-between items-center z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-cyan transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Website
        </button>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          MAXY CMS v1.2
        </span>
      </div>

      {/* Login Card Container */}
      <div className="w-full max-w-md my-auto py-8 z-10">
        <div className="bg-navy/90 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-blue to-cyan rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-cyan/20 border border-white/20">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal CMS</h1>
            <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
              Masukkkan kredensial administrator untuk mengelola pendaftar &amp; konten landing page.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold text-center animate-shake">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Username Admin
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-white/5 border border-white/15 focus:border-cyan rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan/20 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/15 focus:border-cyan rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan/20 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue via-cyan to-indigo hover:opacity-95 text-white font-black py-4 rounded-xl text-sm shadow-xl shadow-cyan/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-2"
            >
              Masuk ke Admin Dashboard →
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-400">
              Default login: <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan font-mono">admin</code> / <code className="bg-white/10 px-1.5 py-0.5 rounded text-cyan font-mono">maxyadmin</code>
            </p>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-[10px] text-slate-500 font-mono text-center pb-2 z-10">
        © 2026 MAXY Academy. System Secured Login.
      </div>
    </div>
  );
}
