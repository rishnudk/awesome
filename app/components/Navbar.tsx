"use client";

import React, { useState } from "react";
import { Sparkles, ArrowUpRight, Menu, X, Compass, PlusCircle, Info, Home } from "lucide-react";

interface NavbarProps {
  onOpenSubmitModal?: () => void;
  onOpenPreviewModal?: () => void;
}

export default function Navbar({ onOpenSubmitModal, onOpenPreviewModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  const navItems = [
    { name: "Home", icon: Home },
    { name: "Collections", icon: Compass, action: onOpenPreviewModal },
    { name: "Submit", icon: PlusCircle, action: onOpenSubmitModal },
    { name: "About", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090909]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6A00] to-[#FF8533] p-[1px] shadow-lg shadow-[#FF6A00]/20 group-hover:shadow-[#FF6A00]/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090909] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#FF6A00] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-white/90">
              Awesome
            </span>
          </a>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-zinc-500 px-2 py-0.5 rounded border border-white/10 bg-white/[0.02]">
            v1.0
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveNav(item.name);
                  if (item.action) item.action();
                }}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#1C1C1E] text-white shadow-sm border border-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#FF6A00]" : "text-zinc-500"}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Primary CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPreviewModal}
            className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#FF6A00] hover:bg-[#FF7F22] accent-glow transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Coming Soon</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#090909] px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveNav(item.name);
                setMobileMenuOpen(false);
                if (item.action) item.action();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-white/5 hover:text-white font-medium flex items-center justify-between"
            >
              <span>{item.name}</span>
              <span className="text-xs text-zinc-500">→</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
