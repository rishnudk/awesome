"use client";

import React from "react";
import { 
  Code2, 
  Layers, 
  Sparkles, 
  Box, 
  Wand2, 
  Component, 
  Terminal,
  ExternalLink,
  Flame,
  Palette
} from "lucide-react";

// Custom Figma SVG Icon
const FigmaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);


interface FloatingCardProps {
  onSelectCategory?: (categoryName: string) => void;
}

export default function FloatingCards({ onSelectCategory }: FloatingCardProps) {
  const cards = [
    {
      title: "React UI",
      count: "120+ libs",
      icon: Code2,
      tag: "Popular",
      color: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30",
      position: "top-[2%] left-[4%] lg:left-[2%]",
      animation: "animate-float-slow",
    },
    {
      title: "Tailwind Components",
      count: "85+ kits",
      icon: Layers,
      tag: "Essential",
      color: "from-teal-500/20 to-emerald-500/10",
      border: "border-teal-500/30",
      position: "top-[6%] right-[2%] lg:right-[4%]",
      animation: "animate-float-reverse",
    },
    {
      title: "Framer Motion",
      count: "45+ anims",
      icon: Wand2,
      tag: "FX & Motion",
      color: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/30",
      position: "top-[32%] left-[-2%] lg:left-[-15px]",
      animation: "animate-float-slow",
    },
    {
      title: "shadcn/ui",
      count: "Copy & Paste",
      icon: Component,
      tag: "Hot 🔥",
      color: "from-amber-500/20 to-orange-500/10",
      border: "border-orange-500/40",
      position: "top-[35%] right-[-2%] lg:right-[-10px]",
      animation: "animate-float-reverse",
    },
    {
      title: "Aceternity UI",
      count: "3D & Motion",
      icon: Sparkles,
      tag: "Trending",
      color: "from-indigo-500/20 to-violet-500/10",
      border: "border-indigo-500/30",
      position: "bottom-[28%] left-[4%] lg:left-[2%]",
      animation: "animate-float-reverse",
    },
    {
      title: "Magic UI",
      count: "60+ FX",
      icon: Flame,
      tag: "New",
      color: "from-rose-500/20 to-orange-500/10",
      border: "border-rose-500/30",
      position: "bottom-[26%] right-[4%] lg:right-[2%]",
      animation: "animate-float-slow",
    },
    {
      title: "21st.dev",
      count: "React Magic",
      icon: Terminal,
      tag: "Curated",
      color: "from-emerald-500/20 to-green-500/10",
      border: "border-emerald-500/30",
      position: "bottom-[4%] left-[12%] lg:left-[14%]",
      animation: "animate-float-slow",
    },
    {
      title: "Figma Resources",
      count: "UI Kits & Systems",
      icon: FigmaIcon,
      tag: "Design",
      color: "from-pink-500/20 to-rose-500/10",
      border: "border-pink-500/30",
      position: "bottom-[4%] right-[12%] lg:right-[14%]",
      animation: "animate-float-reverse",
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <button
            key={idx}
            onClick={() => onSelectCategory && onSelectCategory(card.title)}
            className={`absolute ${card.position} ${card.animation} pointer-events-auto group cursor-pointer text-left focus:outline-none`}
            style={{ animationDelay: `${idx * 0.4}s` }}
          >
            <div className={`glass-card p-3 lg:p-3.5 rounded-xl border ${card.border} bg-gradient-to-br ${card.color} glass-card-hover flex items-center gap-3 backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:scale-105`}>
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white/90 group-hover:text-[#FF6A00] group-hover:border-[#FF6A00]/40 transition-colors">
                <IconComponent className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
              </div>
              <div className="pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs lg:text-sm font-semibold text-white group-hover:text-white transition-colors">
                    {card.title}
                  </span>
                  {card.tag && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/10 group-hover:border-[#FF6A00]/30 group-hover:text-[#FF6A00]">
                      {card.tag}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-zinc-400 block group-hover:text-zinc-300">
                  {card.count}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-[#FF6A00] transition-all -ml-1" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
