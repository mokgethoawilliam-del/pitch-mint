"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Terminal, 
  Zap, 
  ArrowRight,
  Plus,
  MoreHorizontal
} from "lucide-react";

// Mock data generator for the MVP (Refined to match the screenshot's content)
const generateMockProposal = (platform: string, tone: string) => {
  return {
    title: "Landing page redesign for SaaS startup",
    needs: [
      "Responsive marketing page",
      "Fast turnaround with clear milestones",
      "Confident copy and modern visual polish"
    ],
    opening: "I can help you launch a focused landing page that feels polished, loads quickly, and gives your team a flexible foundation for future campaigns."
  };
};

export default function PitchMint() {
  const [jobPost, setJobPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleGenerate = () => {
    if (!jobPost) return;
    setIsGenerating(true);
    setTimeout(() => {
      setResults(generateMockProposal("Upwork", "Direct"));
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F3F1E9] text-[#1A1A1A] font-sans selection:bg-emerald-200">
      {/* Premium Minimal Navbar */}
      <nav className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">PitchMint</span>
        </div>
        <button className="bg-white/50 backdrop-blur-sm border border-black/5 px-6 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all shadow-sm">
          Open app
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-8 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Editorial Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                Proposal writing, without the blank-page feeling
              </span>
              <h1 className="text-[84px] font-bold leading-[0.95] tracking-[-0.04em] text-[#1A1A1A]">
                Turn job posts into tailored freelance proposals.
              </h1>
              <p className="text-[#6B6B6B] text-xl leading-relaxed max-w-lg">
                PitchMint reads the brief, pulls out what matters, and helps you respond with a clear, client-ready proposal that sounds like you.
              </p>
            </div>

            {/* Inline Input for the 'Magic' feel */}
            <div className="relative max-w-lg group">
              <textarea 
                placeholder="Paste a job post to start..."
                className="w-full bg-white rounded-3xl p-6 pr-32 min-h-[120px] text-lg focus:outline-none shadow-xl shadow-black/[0.03] border border-black/[0.02] transition-all focus:ring-4 focus:ring-emerald-500/5"
                value={jobPost}
                onChange={(e) => setJobPost(e.target.value)}
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !jobPost}
                className="absolute bottom-6 right-6 bg-[#1A1A1A] text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-[#333] transition-all active:scale-95 disabled:opacity-20"
              >
                {isGenerating ? "Magic..." : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: The 'Perfect' Preview Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl rounded-full" />
            
            <div className="relative bg-white rounded-[40px] p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-black/[0.01]">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-12">
                <div className="bg-[#E8F5E9] text-[#2E7D32] px-4 py-1.5 rounded-full text-xs font-bold">
                  New proposal draft
                </div>
                <MoreHorizontal className="text-zinc-300 w-6 h-6" />
              </div>

              {/* Card Content */}
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-[42px] font-bold leading-tight tracking-tight">
                    {results?.title || "Landing page redesign for SaaS startup"}
                  </h2>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                      Client Needs
                    </h3>
                    <ul className="space-y-3">
                      {(results?.needs || [
                        "Responsive marketing page",
                        "Fast turnaround with clear milestones",
                        "Confident copy and modern visual polish"
                      ]).map((need: string, i: number) => (
                        <li key={i} className="flex items-center gap-3 text-[#555] text-lg">
                          <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                      PitchMint Opening
                    </h3>
                    <p className="text-[#1A1A1A] text-xl leading-relaxed font-medium">
                      {results?.opening || "I can help you launch a focused landing page that feels polished, loads quickly, and gives your team a flexible foundation for future campaigns."}
                    </p>
                  </div>
                </div>

                {/* Footer of card */}
                <div className="pt-8 border-t border-zinc-50 flex items-center justify-between">
                  <button className="flex items-center gap-2 text-zinc-400 hover:text-emerald-600 transition-colors text-sm font-semibold">
                    <Plus className="w-4 h-4" />
                    Add more sections
                  </button>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-zinc-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Subtle Bottom Badge */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-black/5 px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
        <span className="text-xs font-bold text-zinc-400">Trusted by top freelancers</span>
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-6 h-6 rounded-full bg-zinc-200 border-2 border-white" />
          ))}
        </div>
      </div>
    </div>
  );
}
