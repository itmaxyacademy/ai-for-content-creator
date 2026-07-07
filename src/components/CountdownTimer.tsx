import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  theme?: "dark" | "light" | "red";
  size?: "sm" | "md" | "lg";
}

export default function CountdownTimer({
  targetDate,
  theme = "dark",
  size = "md",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    // Persistent 1-hour evergreen countdown
    const getTargetTime = () => {
      const now = Date.now();
      const stored = localStorage.getItem("maxy_evergreen_timer_1h");
      if (stored) {
        const val = parseInt(stored, 10);
        if (val > now) {
          return val;
        }
      }
      const newTarget = now + 60 * 60 * 1000; // exactly 1 hour (3600000 ms)
      localStorage.setItem("maxy_evergreen_timer_1h", String(newTarget));
      return newTarget;
    };

    const target = getTargetTime();

    const updateTimer = () => {
      const now = Date.now();
      let difference = target - now;

      if (difference <= 0) {
        // Auto reset to 1 hour to maintain urgency or keep at 0. Let's auto-reset to keep high conversion!
        const newTarget = now + 60 * 60 * 1000;
        localStorage.setItem("maxy_evergreen_timer_1h", String(newTarget));
        difference = 60 * 60 * 1000;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsUrgent(true); // under 24h is always urgent
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const tileBg =
    theme === "dark"
      ? "bg-black/40 border border-white/20 text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]"
      : "bg-slate-50 border border-slate-200 text-navy";

  const labelColor = theme === "dark" ? "text-slate-300" : "text-slate-500";
  const numColor = theme === "dark" ? "text-white" : "text-[#1B4FD8]";
  const secondsNumColor = theme === "dark" ? "text-amber-300 animate-pulse" : "text-red-500 animate-pulse";

  return (
    <div className="flex justify-center items-center gap-2 md:gap-3">
      {/* Days */}
      <div
        className={`${tileBg} rounded-xl px-2.5 py-2 md:px-4 md:py-3 min-w-[58px] md:min-w-[72px] text-center transition-all duration-300`}
      >
        <div
          className={`${
            size === "sm" ? "text-xl md:text-2xl" : size === "md" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
          } font-black font-mono leading-none ${numColor}`}
        >
          {pad(timeLeft.days)}
        </div>
        <div className={`text-[9px] uppercase tracking-wider font-bold mt-1 ${labelColor}`}>Hari</div>
      </div>

      {/* Hours */}
      <div
        className={`${tileBg} rounded-xl px-2.5 py-2 md:px-4 md:py-3 min-w-[58px] md:min-w-[72px] text-center transition-all duration-300`}
      >
        <div
          className={`${
            size === "sm" ? "text-xl md:text-2xl" : size === "md" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
          } font-black font-mono leading-none ${numColor}`}
        >
          {pad(timeLeft.hours)}
        </div>
        <div className={`text-[9px] uppercase tracking-wider font-bold mt-1 ${labelColor}`}>Jam</div>
      </div>

      {/* Minutes */}
      <div
        className={`${tileBg} rounded-xl px-2.5 py-2 md:px-4 md:py-3 min-w-[58px] md:min-w-[72px] text-center transition-all duration-300`}
      >
        <div
          className={`${
            size === "sm" ? "text-xl md:text-2xl" : size === "md" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
          } font-black font-mono leading-none ${numColor}`}
        >
          {pad(timeLeft.minutes)}
        </div>
        <div className={`text-[9px] uppercase tracking-wider font-bold mt-1 ${labelColor}`}>Menit</div>
      </div>

      {/* Seconds */}
      <div
        className={`${tileBg} rounded-xl px-2.5 py-2 md:px-4 md:py-3 min-w-[58px] md:min-w-[72px] text-center transition-all duration-300 border-amber-500/30`}
      >
        <div
          className={`${
            size === "sm" ? "text-xl md:text-2xl" : size === "md" ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
          } font-black font-mono leading-none ${secondsNumColor}`}
        >
          {pad(timeLeft.seconds)}
        </div>
        <div className={`text-[9px] uppercase tracking-wider font-bold mt-1 ${labelColor}`}>Detik</div>
      </div>
    </div>
  );
}
