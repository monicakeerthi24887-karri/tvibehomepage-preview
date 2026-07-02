"use client";

import { useEffect, useState } from "react";

export default function BokehBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 3 different colors
  const colors = ["bg-[#ff4fa3]", "bg-[#ff6b00]", "bg-[#9b2cff]"];
  const animations = ["bubble-anim-1", "bubble-anim-2", "bubble-anim-3"];

  // Generate 15 distinct bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.floor(Math.random() * 150) + 50; // 50px to 200px
    const left = Math.floor(Math.random() * 100); // 0% to 100%
    const delay = Math.random() * 10; // 0s to 10s delay
    const color = colors[i % 3];
    const anim = animations[i % 3];

    return (
      <div
        key={i}
        className={`absolute rounded-full opacity-30 blur-[2px] ${color} ${anim}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          bottom: `-${size + 50}px`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#FFF5F8] pointer-events-none">
      {/* Deep soft ambient background blobs */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-[#ffffff] opacity-10 filter blur-[150px] top-[-20%] left-[-10%]" />
      <div className="absolute w-[800px] h-[800px] rounded-full bg-[#ffffff] opacity-10 filter blur-[150px] bottom-[-20%] right-[-10%]" />
      
      {/* Floating bouncing bubbles */}
      {bubbles}
    </div>
  );
}
