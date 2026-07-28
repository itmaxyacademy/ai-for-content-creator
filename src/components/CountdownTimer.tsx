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
    const getTargetTime = () => {
      if (targetDate && targetDate.trim() !== "") {
        // Parse date string format like "2026-07-31T23:59:59" or "2026-07-31 23:59:59"
        const formattedDateStr = targetDate.includes("T")
          ? targetDate
          : targetDate.replace(" ", "T");
        const parsed = new Date(formattedDateStr).getTime();
        if (!isNaN(parsed)) {
          return parsed;
        }
      }
      // Fallback: 24 hours from now
      return Date.now() + 24 * 60 * 60 * 1000;
    };

    const target = getTargetTime();

    const updateTimer = () => {
      const now = Date.now();
      let difference = target - now;

      if (difference <= 0) {
        difference = 0;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsUrgent(days === 0 && hours < 24);
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
