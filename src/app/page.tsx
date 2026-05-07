"use client";

import React, { useState } from "react";
import { 
  Clipboard, 
  Check, 
  Sparkles, 
  Send, 
  Layers, 
  MessageSquare, 
  Terminal, 
  Zap, 
  Globe, 
  Mail, 
  MessageCircle
} from "lucide-react";

// Mock data generator for the MVP
const generateMockProposal = (platform: string, tone: string) => {
  const tones: Record<string, any> = {
    Direct: {
      opener: "I saw your posting for a developer and I'm ready to jump in.",
      proposal: "I have 5+ years of experience with React and Next.js. I've built similar SaaS platforms and can deliver high-quality code with a focus on performance. My workflow is efficient and I prioritize clear communication.",
      cta: "When are you free for a quick 10-minute call to discuss the technical requirements?",
      questions: [
        "What is the current state of the codebase?",
        "Do you have a specific deadline for the first milestone?",
        "Are there existing design mockups ready to go?"
      ]
    },
    Warm: {
      opener: "Hope your week is going great! I just read through your project description and it sounds like an exciting challenge.",
      proposal: "I love building tools that solve real problems, and your project seems to align perfectly with my passion for user-centric design. I've helped several clients achieve similar goals by focusing on both the technical robustness and the overall user experience.",
      cta: "I'd love to hear more about your vision for this project. Would you be open to a friendly chat sometime this week?",
      questions: [
        "What inspired you to start this specific project?",
        "What does a 'successful' launch look like for you?",
        "How do you prefer to collaborate during the development phase?"
      ]
    },
    Premium: {
      opener: "Your project requires a high-level strategic approach to ensure scalability and long-term success.",
      proposal: "I specialize in architecting premium digital solutions that don't just meet requirements but exceed industry standards. My approach involves a deep dive into your business logic to ensure the final product is both a technical masterpiece and a significant asset to your brand.",
      cta: "Let's schedule a consultation to map out a roadmap for your project's success.",
      questions: [
        "What are the primary KPIs you are looking to impact with this build?",
        "Are there specific security or compliance standards we should adhere to?",
        "How do you envision the platform evolving over the next 12-24 months?"
      ]
    }
  };

  const base = tones[tone] || tones.Direct;
  return {
    ...base,
    platform
  };
};

export default function PitchMint() {
  const [jobPost, setJobPost] = useState("");
  const [skills, setSkills] = useState("");
  const [platform, setPlatform] = useState("Upwork");
  const [tone, setTone] = useState("Direct");
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!jobPost) return;
    setIsGenerating(true);
    
    // Simulate AI generation lag
    setTimeout(() => {
      setResults(generateMockProposal(platform, tone));
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Navbar */}
      <nav className="border-b border-zinc-800/50 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Sparkles className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Pitch<span className="text-emerald-400">Mint</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-emerald-400 transition-colors">How it works</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <button className="bg-zinc-100 text-black px-4 py-2 rounded-full font-semibold hover:bg-emerald-400 transition-all active:scale-95">
              Login
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Win Every Pitch. <br className="hidden md:block" /> Faster Than Ever.
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            The intelligent proposal engine for high-end freelancers. Paste the job, set the tone, and let AI handle the heavy lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-2xl backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                Project Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Job Description</label>
                  <textarea 
                    placeholder="Paste the job posting here..."
                    className="w-full h-40 bg-black/40 border border-zinc-800 rounded-xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none"
                    value={jobPost}
                    onChange={(e) => setJobPost(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Your Skills / Experience</label>
                  <textarea 
                    placeholder="E.g. 5yrs React, Next.js, UI/UX Design..."
                    className="w-full h-24 bg-black/40 border border-zinc-800 rounded-xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Platform</label>
                    <select 
                      className="w-full bg-black/40 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                    >
                      <option value="Upwork">Upwork</option>
                      <option value="Fiverr">Fiverr</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Email Outreach">Email Outreach</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Tone</label>
                    <select 
                      className="w-full bg-black/40 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      <option value="Direct">Direct</option>
                      <option value="Warm">Warm</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !jobPost}
                  className="w-full py-4 bg-emerald-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Casting Spell...
                    </div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
                      Generate Proposal
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-7">
            {!results && !isGenerating ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/20">
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
                  <Layers className="w-8 h-8 text-zinc-500" />
                </div>
                <h3 className="text-xl font-bold text-zinc-300">Your proposal will appear here</h3>
                <p className="text-zinc-500 mt-2 max-w-xs">Enter the job details and click generate to see the magic happen.</p>
              </div>
            ) : isGenerating ? (
              <div className="space-y-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-zinc-900/50 rounded-2xl border border-zinc-800" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <OutputCard 
                  title="The Opener" 
                  content={results.opener} 
                  icon={<MessageCircle className="w-4 h-4" />}
                  onCopy={() => copyToClipboard(results.opener, "opener")}
                  isCopied={copiedField === "opener"}
                />
                <OutputCard 
                  title="The Core Proposal" 
                  content={results.proposal} 
                  icon={<Send className="w-4 h-4" />}
                  onCopy={() => copyToClipboard(results.proposal, "proposal")}
                  isCopied={copiedField === "proposal"}
                />
                <OutputCard 
                  title="Call to Action" 
                  content={results.cta} 
                  icon={<Zap className="w-4 h-4" />}
                  onCopy={() => copyToClipboard(results.cta, "cta")}
                  isCopied={copiedField === "cta"}
                />
                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-emerald-500/20 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Client Questions
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {results.questions.map((q: string, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-sm text-zinc-300 flex items-center justify-between group/q">
                        <span>{q}</span>
                        <button 
                          onClick={() => copyToClipboard(q, `q-${i}`)}
                          className="text-zinc-500 hover:text-emerald-400 transition-colors p-1"
                        >
                          {copiedField === `q-${i}` ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12 bg-black/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-black" strokeWidth={3} />
            </div>
            <span className="font-bold tracking-tight">PitchMint</span>
          </div>
          <div className="text-zinc-500 text-sm">
            © 2026 PitchMint AI. All rights reserved. Built for winners.
          </div>
          <div className="flex gap-4 text-zinc-400">
            <Globe className="w-5 h-5 hover:text-emerald-400 cursor-pointer" />
            <Mail className="w-5 h-5 hover:text-emerald-400 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}

function OutputCard({ title, content, icon, onCopy, isCopied }: { title: string, content: string, icon: any, onCopy: any, isCopied: boolean }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 relative group overflow-hidden transition-all hover:border-zinc-700">
      <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <button 
          onClick={onCopy}
          className="flex items-center gap-2 text-xs font-medium bg-zinc-800 hover:bg-emerald-500 hover:text-black px-3 py-1.5 rounded-lg transition-all active:scale-95"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied
            </>
          ) : (
            <>
              <Clipboard className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <p className="text-zinc-200 leading-relaxed text-sm md:text-base">{content}</p>
    </div>
  );
}
