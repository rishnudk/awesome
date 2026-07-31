"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import TechnicalGrid from "./components/TechnicalGrid";
import DigitalOrbCanvas from "./components/DigitalOrbCanvas";
import FloatingCards from "./components/FloatingCards";
import StatsBar from "./components/StatsBar";
import ExplorePreviewModal from "./components/ExplorePreviewModal";
import SubmitResourceModal from "./components/SubmitResourceModal";
import { Sparkles, ArrowUpRight, Compass, Terminal, Code2, Layers, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleOpenCategoryPreview = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsPreviewOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#090909] text-white flex flex-col justify-between selection:bg-[#FF6A00] selection:text-white overflow-hidden">
      {/* Navbar Header */}
      <Navbar
        onOpenSubmitModal={() => setIsSubmitOpen(true)}
        onOpenPreviewModal={() => {
          setSelectedCategory("All");
          setIsPreviewOpen(true);
        }}
      />

      {/* Main Hero Viewport Section */}
      <main className="relative flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-20">
        
        {/* Background Technical Grid & Blueprint Elements */}
        <TechnicalGrid />

        {/* Ambient Radial Spotlight Behind Hero */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] hero-radial-glow pointer-events-none z-0" />
        <div className="absolute top-10 left-10 w-[400px] h-[400px] hero-radial-secondary pointer-events-none z-0" />

        {/* Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 my-auto">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 lg:space-y-8">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:border-[#FF6A00]/40 transition-colors cursor-default group">
              <span className="text-[#FF6A00] text-xs font-semibold animate-pulse">✨</span>
              <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                Curated Design Resources
              </span>
              <span className="text-[10px] font-mono text-zinc-500 pl-1 border-l border-white/10">
                DAILY UPDATE
              </span>
            </div>

            {/* Large Headline (72–84px font size on desktop) */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-extrabold tracking-tight leading-[0.95] text-white">
                Every UI Resource.
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-[76px] xl:text-[84px] font-extrabold tracking-tight leading-[0.95] bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                One Place.
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
              <strong className="text-white font-semibold">Awesome</strong> is the ultimate collection of the best UI inspiration, component libraries, icon packs, design systems, animation libraries, and frontend resources—carefully curated under one roof.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA (Orange #FF6A00) */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setIsPreviewOpen(true);
                }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#FF6A00] hover:bg-[#FF7F22] accent-glow transition-all duration-200 active:scale-95 cursor-pointer shadow-lg shadow-[#FF6A00]/25"
              >
                <span>Coming Soon</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Secondary CTA (Dark Glass) */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setIsPreviewOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white glass-card hover:bg-white/[0.08] border border-white/[0.12] transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-md"
              >
                <Compass className="w-4 h-4 text-zinc-400" />
                <span>Explore Preview</span>
              </button>
            </div>

            {/* Micro Feature Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Zero Subscription Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Open Source First</span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Digital Ecosystem Orb & Glass Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] lg:min-h-[560px]">
            
            {/* Centerpiece 3D Canvas Orb */}
            <div className="relative w-full z-0">
              <DigitalOrbCanvas />
            </div>

            {/* Floating Glass Cards Orbiting around Orb */}
            <FloatingCards onSelectCategory={handleOpenCategoryPreview} />

          </div>

        </div>

      </main>

      {/* Bottom Statistics Section */}
      <footer className="relative z-20 w-full">
        <StatsBar />
        
        {/* Footer Minimal Copyright */}
        <div className="w-full bg-[#070707] border-t border-white/[0.05] py-4 text-center text-xs font-mono text-zinc-600">
          <span>Awesome &copy; 2026. Built with Next.js, React 19 & Tailwind CSS. Designed for developers.</span>
        </div>
      </footer>

      {/* Modals */}
      <ExplorePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        initialCategory={selectedCategory}
      />

      <SubmitResourceModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />
    </div>
  );
}
