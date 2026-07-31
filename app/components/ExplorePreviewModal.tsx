"use client";

import React, { useState } from "react";
import { 
  X, 
  Search, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Code2, 
  Layers, 
  Wand2, 
  Component, 
  Filter
} from "lucide-react";

interface ExplorePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export default function ExplorePreviewModal({
  isOpen,
  onClose,
  initialCategory = "All",
}: ExplorePreviewModalProps) {
  const [selectedFilter, setSelectedFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ["All", "React UI", "Tailwind Components", "Framer Motion", "shadcn/ui", "Aceternity UI", "Magic UI", "21st.dev", "Figma Resources"];

  const resources = [
    {
      id: "res-1",
      name: "shadcn/ui",
      category: "shadcn/ui",
      description: "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
      stars: "65.4k",
      tags: ["React", "Tailwind", "Radix UI"],
      installCmd: "npx shadcn@latest add button",
      link: "https://ui.shadcn.com",
    },
    {
      id: "res-2",
      name: "Aceternity UI",
      category: "Aceternity UI",
      description: "Copy paste modern React & Framer Motion components to make your landing page look 10x better.",
      stars: "18.2k",
      tags: ["3D Cards", "Spotlight", "Text Generate"],
      installCmd: "npm i framer-motion clsx tailwind-merge",
      link: "https://ui.aceternity.com",
    },
    {
      id: "res-3",
      name: "Magic UI",
      category: "Magic UI",
      description: "20+ free and open-source animated components built with React, Typescript, Tailwind CSS, and Framer Motion.",
      stars: "14.8k",
      tags: ["Marquee", "Globe", "Dock", "Shimmer"],
      installCmd: "npx magicui-cli add globe",
      link: "https://magicui.design",
    },
    {
      id: "res-4",
      name: "21st.dev",
      category: "21st.dev",
      description: "The npm for Design Engineers. Discover, share, and reuse pristine React & Tailwind components.",
      stars: "9.1k",
      tags: ["AI Prompts", "Tailwind v4", "React 19"],
      installCmd: "npx 21st@latest add hero-grid",
      link: "https://21st.dev",
    },
    {
      id: "res-5",
      name: "Framer Motion Gallery",
      category: "Framer Motion",
      description: "Production-ready animation presets, layout transitions, gesture physics, and SVG motion effects.",
      stars: "24.5k",
      tags: ["Gestures", "LayoutAnimations", "Scroll"],
      installCmd: "npm install framer-motion",
      link: "https://framer.com/motion",
    },
    {
      id: "res-6",
      name: "HyperUI Tailwind",
      category: "Tailwind Components",
      description: "Free open source Tailwind CSS components for e-commerce, dashboards, landing pages, and forms.",
      stars: "11.7k",
      tags: ["Marketing", "E-Commerce", "Forms"],
      installCmd: "npm i -D tailwindcss",
      link: "https://hyperui.dev",
    },
  ];

  const filteredResources = resources.filter((res) => {
    const matchesFilter = selectedFilter === "All" || res.category === selectedFilter || res.name.toLowerCase().includes(selectedFilter.toLowerCase());
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[85vh] bg-[#0E0E10] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#121214]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 flex items-center justify-center text-[#FF6A00]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Awesome Ecosystem Index
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-400 font-normal">
                  Live Preview
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Explore hand-picked frontend resources, component libraries & tools.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="p-4 border-b border-white/[0.08] bg-[#0A0A0C] flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 500+ resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF6A00]/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-zinc-500 hidden sm:block mr-1" />
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === cat
                    ? "bg-[#FF6A00] text-white"
                    : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="glass-card p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-[#FF6A00]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base group-hover:text-[#FF6A00] transition-colors">
                      {res.name}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-400 border border-white/5">
                      ★ {res.stars}
                    </span>
                  </div>
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-white p-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-zinc-400 mb-4 leading-relaxed line-clamp-2">
                  {res.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {res.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-300 border border-white/5"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Install snippet box */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-black/60 border border-white/5 font-mono text-[11px] text-zinc-400">
                <div className="flex items-center gap-2 truncate pr-2">
                  <Terminal className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                  <span className="truncate">{res.installCmd}</span>
                </div>
                <button
                  onClick={() => handleCopy(res.id, res.installCmd)}
                  className="p-1 hover:text-white text-zinc-500 transition-colors"
                  title="Copy command"
                >
                  {copiedId === res.id ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#121214] flex items-center justify-between text-xs text-zinc-500">
          <span>Showing {filteredResources.length} of 500+ curated items</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
