"use client";

import React from "react";

export default function TechnicalGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {/* Background Noise Layer */}
      <div className="absolute inset-0 bg-noise opacity-60 z-0" />

      {/* Grid Pattern Lines */}
      <div className="absolute inset-0 tech-grid opacity-70 z-0" />

      {/* Crosshair Intersections (+) at key grid coordinates */}
      {/* Top Crosshairs */}
      <div className="absolute top-[80px] left-[5%] text-zinc-600 font-mono text-xs z-10">+</div>
      <div className="absolute top-[80px] left-[50%] text-zinc-600 font-mono text-xs z-10">+</div>
      <div className="absolute top-[80px] right-[5%] text-zinc-600 font-mono text-xs z-10">+</div>

      {/* Hero Mid Crosshairs */}
      <div className="absolute top-[50%] left-[5%] text-[#FF6A00]/40 font-mono text-xs z-10">+</div>
      <div className="absolute top-[50%] left-[50%] text-zinc-500 font-mono text-xs z-10">+</div>
      <div className="absolute top-[50%] right-[5%] text-[#FF6A00]/40 font-mono text-xs z-10">+</div>

      {/* Bottom Crosshairs */}
      <div className="absolute bottom-[80px] left-[5%] text-zinc-600 font-mono text-xs z-10">+</div>
      <div className="absolute bottom-[80px] left-[50%] text-zinc-600 font-mono text-xs z-10">+</div>
      <div className="absolute bottom-[80px] right-[5%] text-zinc-600 font-mono text-xs z-10">+</div>

      {/* Technical Engineering Overlay Marks */}
      <div className="hidden lg:flex items-center gap-2 absolute top-24 right-8 font-mono text-[10px] text-zinc-500 tracking-wider z-10 bg-black/40 px-2.5 py-1 rounded border border-white/5 backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse" />
        <span>SYS_STATUS: ONLINE</span>
        <span className="text-zinc-700">|</span>
        <span>LATENCY: 4ms</span>
        <span className="text-zinc-700">|</span>
        <span>INDEX: 500+</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 absolute bottom-28 left-8 font-mono text-[10px] text-zinc-500 tracking-wider z-10">
        <span className="text-zinc-600">GRID_SEC::0x7F</span>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-600">FPS: 60.0</span>
      </div>

      {/* Blueprint Wireframe Circle */}
      <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/[0.04] border-dashed pointer-events-none z-0 animate-spin-slow" style={{ animationDuration: '60s' }} />
      <div className="absolute top-1/2 right-[18%] -translate-y-1/2 w-[680px] h-[680px] rounded-full border border-[#FF6A00]/[0.05] pointer-events-none z-0" />

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-0" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(9, 9, 9, 0.7) 100%)' }} />
    </div>
  );
}
