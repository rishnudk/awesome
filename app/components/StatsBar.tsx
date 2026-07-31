"use client";

import React from "react";
import { Sparkles, ArrowUpRight, ShieldCheck, Zap, Globe, Layers } from "lucide-react";

export default function StatsBar() {
  const stats = [
    {
      value: "500+",
      label: "Curated Resources",
      subtext: "UI kits, icons, shaders & motion",
      icon: Layers,
    },
    {
      value: "150+",
      label: "Component Libraries",
      subtext: "React, Vue, Svelte & Web",
      icon: Zap,
    },
    {
      value: "80+",
      label: "UI Inspiration Sites",
      subtext: "Award-winning design galleries",
      icon: Globe,
    },
    {
      value: "Growing Daily",
      label: "Community Curated",
      subtext: "Hand-picked by frontend devs",
      icon: ShieldCheck,
    },
  ];

  const featuredLogos = [
    { name: "shadcn/ui", category: "Component Library" },
    { name: "Aceternity", category: "3D Animations" },
    { name: "Magic UI", category: "Micro-interactions" },
    { name: "Tailwind CSS", category: "Styling Framework" },
    { name: "Framer Motion", category: "Motion Engine" },
    { name: "21st.dev", category: "React Components" },
    { name: "Relume", category: "Figma & Webflow" },
    { name: "LottieLab", category: "Vector Animation" },
  ];

  return (
    <div className="w-full border-t border-b border-white/[0.08] bg-[#090909]/90 relative z-20">
      {/* Upper Logo / Category Ticker Bar (Inspired by 'Trusted by people from' in reference image) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-white/[0.05]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00]" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-medium">
              Featured Ecosystem Libraries
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {featuredLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <span className="text-sm font-semibold text-zinc-400 group-hover:text-white transition-colors">
                  {logo.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500 border border-white/[0.06] group-hover:border-[#FF6A00]/30 group-hover:text-[#FF6A00] transition-colors">
                  {logo.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Four Equal-Width Stat Cards Grid with Technical Crosshairs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] relative">
          
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative py-8 px-6 group hover:bg-white/[0.015] transition-colors"
              >
                {/* Technical Corner Crosshair indicator */}
                <div className="absolute top-2 right-2 text-zinc-600 font-mono text-[10px] opacity-40 group-hover:opacity-100 group-hover:text-[#FF6A00] transition-all">
                  + 0{idx + 1}
                </div>

                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-400 group-hover:text-[#FF6A00] group-hover:border-[#FF6A00]/30 transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 uppercase tracking-widest">
                    STAT_NODE
                  </span>
                </div>

                <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-1 group-hover:text-[#FF6A00] transition-colors">
                  {stat.value}
                </div>

                <div className="text-sm font-semibold text-zinc-200 mb-0.5">
                  {stat.label}
                </div>

                <div className="text-xs font-mono text-zinc-500">
                  {stat.subtext}
                </div>

                {/* Subtle bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6A00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
