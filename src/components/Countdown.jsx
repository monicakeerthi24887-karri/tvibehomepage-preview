"use client";

import { useState, useEffect } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Setting back to 2026 so the countdown works correctly in the future
    const targetDate = new Date("2026-09-05T12:00:00-04:00"); 

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex justify-center opacity-0">
        Loading...
      </div>
    );
  }

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="w-full flex flex-col items-center py-6 glass-white rounded-[2rem] border border-white/50 shadow-sm px-4 sm:px-8 max-w-xl">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] mb-5 flex items-center space-x-2">
        <span className="text-[#ff6b00]">✦</span>
        <span className="tracking-widest font-qurova">THE TVIBE DROPS IN</span>
        <span className="text-[#00F0FF]">✦</span>
      </h3>
      
      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="flex flex-col items-center justify-center bg-white border border-[#d1d9e6] rounded-2xl py-4 sm:py-5 shadow-sm"
          >
            <span className="text-3xl sm:text-5xl font-satoshi font-black tracking-tight text-siri-gradient mb-1">
              {block.value.toString().padStart(2, "0")}
            </span>
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#666666] mt-1">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
