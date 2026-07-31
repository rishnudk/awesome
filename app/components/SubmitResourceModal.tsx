"use client";

import React, { useState } from "react";
import { X, Send, Sparkles, CheckCircle2 } from "lucide-react";

interface SubmitResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitResourceModal({ isOpen, onClose }: SubmitResourceModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Component Library");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setUrl("");
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#0E0E10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/30 flex items-center justify-center text-[#FF6A00]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Submit a UI Resource</h3>
              <p className="text-xs text-zinc-400">Share your library, tool, or inspiration site</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-12 h-12 text-[#FF6A00] mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-white mb-1">Resource Submitted!</h4>
            <p className="text-xs text-zinc-400 max-w-xs">
              Thank you for contributing to Awesome. Our team will review your submission shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Resource Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Magic UI, Aceternity UI, 21st.dev"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF6A00]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Repository / Website URL *
              </label>
              <input
                type="url"
                required
                placeholder="https://github.com/... or https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF6A00]/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Primary Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#141416] border border-white/10 text-sm text-white focus:outline-none focus:border-[#FF6A00]/50"
              >
                <option value="Component Library">Component Library</option>
                <option value="UI Inspiration">UI Inspiration</option>
                <option value="Design System">Design System</option>
                <option value="Icon Pack">Icon Pack</option>
                <option value="Animation Library">Animation Library</option>
                <option value="Figma File">Figma Resource</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#FF6A00] hover:bg-[#FF7F22] text-white flex items-center gap-2 accent-glow transition-all"
              >
                <span>Submit Resource</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
