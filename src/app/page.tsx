"use client";

import React, { useState } from "react";
import { 
  Check,
  CheckCircle2,
  Sparkles, 
  Zap, 
  ArrowRight,
  Plus,
  MoreHorizontal,
  WandSparkles
} from "lucide-react";

type ProposalDraft = {
  title: string;
  needs: string[];
  opening: string;
};

const howItWorks = [
  {
    step: "01",
    title: "Paste the brief",
    body: "Drop in a client job post, project description, or messy request."
  },
  {
    step: "02",
    title: "Pull out the signal",
    body: "PitchMint identifies the client needs, urgency, deliverables, and proof points."
  },
  {
    step: "03",
    title: "Draft with confidence",
    body: "Get a polished proposal opening you can shape into your own voice."
  }
];

const features = [
  "Client needs summary",
  "Tailored proposal openings",
  "Premium freelancer tone",
  "Reusable pitch structure",
  "Clear next-step framing",
  "Built for fast replies"
];

const pricingPreview = [
  {
    name: "Starter",
    price: "$0",
    description: "For trying the workflow and shaping your first few proposals.",
    highlight: false
  },
  {
    name: "Freelancer",
    price: "$12",
    description: "For consistent outreach, sharper drafts, and faster client replies.",
    highlight: true
  },
  {
    name: "Studio",
    price: "$29",
    description: "For teams that want shared proposal patterns and a cleaner pipeline.",
    highlight: false
  }
];

const generateMockProposal = (): ProposalDraft => {
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
  const [results, setResults] = useState<ProposalDraft | null>(null);

  const handleGenerate = () => {
    if (!jobPost.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setResults(generateMockProposal());
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
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#how-it-works"
            className="hidden sm:inline-flex bg-white/50 backdrop-blur-sm border border-black/5 px-5 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all shadow-sm"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="hidden sm:inline-flex bg-white/50 backdrop-blur-sm border border-black/5 px-5 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all shadow-sm"
          >
            Pricing
          </a>
          <a
            href="#open-app"
            className="bg-white/50 backdrop-blur-sm border border-black/5 px-6 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all shadow-sm"
          >
            Open app
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-24">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column: Editorial Content */}
          <div className="space-y-9">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                Proposal writing, without the blank-page feeling
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-[84px] font-bold leading-[0.95] tracking-[-0.04em] text-[#1A1A1A]">
                Turn job posts into tailored freelance proposals.
              </h1>
              <p className="text-[#6B6B6B] text-xl leading-relaxed max-w-lg">
                PitchMint reads the brief, pulls out what matters, and helps you respond with a clear, client-ready proposal that sounds like you.
              </p>
            </div>

            <div id="open-app" className="max-w-xl scroll-mt-24 rounded-[32px] bg-white/80 p-3 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.18)] border border-white">
              <div className="rounded-[24px] border border-black/[0.04] bg-[#FBFAF6] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4 pb-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
                    <WandSparkles className="w-4 h-4 text-[#4CAF50]" />
                    Proposal starter
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-[#8A857A]">
                    No account needed
                  </span>
                </div>
              <textarea 
                placeholder="Paste a job post to start..."
                  className="w-full resize-none bg-white rounded-2xl p-5 min-h-[132px] text-base sm:text-lg leading-relaxed focus:outline-none shadow-inner shadow-black/[0.02] border border-black/[0.04] transition-all focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30"
                value={jobPost}
                onChange={(e) => setJobPost(e.target.value)}
              />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8A857A]">
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
                    Produces a clean first draft in seconds
                  </div>
              <button 
                onClick={handleGenerate}
                    disabled={isGenerating || !jobPost.trim()}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(26,26,26,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#242424] hover:shadow-[0_18px_34px_-14px_rgba(26,26,26,0.85)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
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
        </section>

        <section id="how-it-works" className="scroll-mt-16 pt-28 sm:pt-36">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                How it works
              </span>
              <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl font-bold tracking-[-0.035em]">
                From raw job post to refined first draft.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-[#6B6B6B]">
              A simple writing flow for freelancers who want speed without sounding generic.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {howItWorks.map((item) => (
              <article key={item.step} className="rounded-[28px] bg-white/70 p-7 border border-white shadow-[0_18px_44px_-30px_rgba(0,0,0,0.35)]">
                <span className="text-xs font-bold text-[#4CAF50]">{item.step}</span>
                <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-[#6B6B6B] leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-28 sm:pt-32">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                Features
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.035em]">
                Everything a strong proposal needs at the starting line.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl bg-white/60 px-5 py-4 border border-white">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9]">
                    <Check className="h-4 w-4 text-[#2E7D32]" />
                  </div>
                  <span className="font-semibold text-[#333]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-16 pt-28 sm:pt-32">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                Pricing preview
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.035em]">
                Start light, grow into a proposal system.
              </h2>
            </div>
            <p className="max-w-sm text-[#6B6B6B] leading-relaxed">
              Early pricing direction for Landing Page v1. Final plans can evolve with the product.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {pricingPreview.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[28px] p-7 border shadow-[0_18px_44px_-30px_rgba(0,0,0,0.35)] ${
                  plan.highlight
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white/70 border-white"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-bold text-[#2E7D32]">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-8 flex items-end gap-2">
                  <span className="text-5xl font-bold tracking-[-0.04em]">{plan.price}</span>
                  <span className={plan.highlight ? "pb-2 text-white/55" : "pb-2 text-[#8A857A]"}>
                    /mo
                  </span>
                </div>
                <p className={`mt-5 leading-relaxed ${plan.highlight ? "text-white/70" : "text-[#6B6B6B]"}`}>
                  {plan.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="pt-28 sm:pt-32">
          <div className="rounded-[36px] bg-white p-8 sm:p-12 lg:p-14 border border-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.35)]">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
                  Ready when the next good lead appears
                </span>
                <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl font-bold tracking-[-0.035em]">
                  Write the proposal while the opportunity is still warm.
                </h2>
              </div>
              <a href="#open-app" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(26,26,26,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#242424]">
                Try PitchMint
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <div className="mt-16 flex justify-center">
          <div className="bg-white/80 backdrop-blur-md border border-black/5 px-6 py-3 rounded-full shadow-lg flex items-center gap-4">
            <span className="text-xs font-bold text-zinc-400">Trusted by top freelancers</span>
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-zinc-200 border-2 border-white" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
