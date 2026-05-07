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
  MessageCircle,
  ArrowRight
} from "lucide-react";

// Mock data generator for the MVP (Keeping the logic same)
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
    <div className="min-h-screen bg-[#FCFAF7] text-[#1A1A1A] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Editorial Navbar */}
      <nav className="bg-[#FCFAF7]/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight">Pitch<span className="text-emerald-600">Mint</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-black/60">
            <a href="#" className="hover:text-black transition-colors">Philosophy</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
            <button className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/10">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        {/* Editorial Hero */}
        <div className="max-w-3xl mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current" />
            V2: Editorial Edition
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-zinc-900">
            Craft proposals that <span className="text-emerald-600">demand</span> attention.
          </h1>
          <p className="text-zinc-500 text-xl md:text-2xl font-normal leading-relaxed max-w-2xl">
            A minimalist engine designed for the modern elite freelancer. Simple inputs, exceptional outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Input Section - Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="luxury-card rounded-3xl p-8 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Project Context</h2>
                <Terminal className="w-4 h-4 text-emerald-500 opacity-50" />
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-900">Job Posting</label>
                  <textarea 
                    placeholder="Paste the project requirements here..."
                    className="luxury-input w-full h-48 rounded-2xl p-5 text-base focus:outline-none resize-none placeholder:text-zinc-300"
                    value={jobPost}
                    onChange={(e) => setJobPost(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-zinc-900">Relevant Experience</label>
                  <textarea 
                    placeholder="Briefly list your top skills for this job..."
                    className="luxury-input w-full h-32 rounded-2xl p-5 text-base focus:outline-none resize-none placeholder:text-zinc-300"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-zinc-900">Platform</label>
                    <div className="relative">
                      <select 
                        className="luxury-input w-full rounded-2xl p-4 text-sm focus:outline-none appearance-none cursor-pointer pr-10"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                      >
                        <option value="Upwork">Upwork</option>
                        <option value="Fiverr">Fiverr</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Email Outreach">Email Outreach</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-zinc-900">Tone</label>
                    <div className="relative">
                      <select 
                        className="luxury-input w-full rounded-2xl p-4 text-sm focus:outline-none appearance-none cursor-pointer pr-10"
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                      >
                        <option value="Direct">Direct</option>
                        <option value="Warm">Warm</option>
                        <option value="Premium">Premium</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !jobPost}
                  className="w-full py-5 bg-black text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-black/10 group overflow-hidden relative"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span className="tracking-wide">Analyzing Opportunity...</span>
                    </div>
                  ) : (
                    <>
                      <span className="tracking-wide">Generate Masterpiece</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Section - Right */}
          <div className="lg:col-span-7 space-y-10">
            {!results && !isGenerating ? (
              <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-12 rounded-[2rem] border border-black/5 bg-white shadow-sm">
                <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center mb-8">
                  <Layers className="w-10 h-10 text-zinc-200" />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-900">Awaiting your vision</h3>
                <p className="text-zinc-400 mt-3 max-w-sm text-lg leading-relaxed">Fill in the project context on the left to generate your bespoke proposal.</p>
              </div>
            ) : isGenerating ? (
              <div className="space-y-8 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-40 bg-white rounded-3xl border border-black/5" />
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                <OutputCard 
                  title="The Opening Statement" 
                  content={results.opener} 
                  icon={<MessageCircle className="w-4 h-4 text-emerald-600" />}
                  onCopy={() => copyToClipboard(results.opener, "opener")}
                  isCopied={copiedField === "opener"}
                />
                <OutputCard 
                  title="The Value Proposition" 
                  content={results.proposal} 
                  icon={<Send className="w-4 h-4 text-emerald-600" />}
                  onCopy={() => copyToClipboard(results.proposal, "proposal")}
                  isCopied={copiedField === "proposal"}
                />
                <OutputCard 
                  title="Strategic Call to Action" 
                  content={results.cta} 
                  icon={<Zap className="w-4 h-4 text-emerald-600" />}
                  onCopy={() => copyToClipboard(results.cta, "cta")}
                  isCopied={copiedField === "cta"}
                />
                
                <div className="luxury-card rounded-[2rem] p-10 space-y-8 border-emerald-100 bg-emerald-50/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Client Engagement Questions
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {results.questions.map((q: string, i: number) => (
                      <div key={i} className="p-5 rounded-2xl bg-white border border-emerald-100 text-zinc-800 flex items-center justify-between group/q transition-all hover:shadow-md hover:border-emerald-200">
                        <span className="text-lg font-medium leading-relaxed">{q}</span>
                        <button 
                          onClick={() => copyToClipboard(q, `q-${i}`)}
                          className="ml-4 text-zinc-300 hover:text-emerald-600 transition-colors p-2"
                        >
                          {copiedField === `q-${i}` ? <Check className="w-5 h-5" /> : <Clipboard className="w-5 h-5" />}
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

      {/* Editorial Footer */}
      <footer className="border-t border-black/5 py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <span className="font-bold tracking-tight text-xl">PitchMint</span>
            </div>
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
              Redefining the standard for professional freelance outreach. Intelligent, minimal, and uncompromising.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Product</h4>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li><a href="#" className="hover:text-emerald-600">Features</a></li>
                <li><a href="#" className="hover:text-emerald-600">Integrations</a></li>
                <li><a href="#" className="hover:text-emerald-600">Manifesto</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Legal</h4>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li><a href="#" className="hover:text-emerald-600">Privacy</a></li>
                <li><a href="#" className="hover:text-emerald-600">Terms</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">Social</h4>
              <div className="flex gap-4">
                <Globe className="w-5 h-5 text-zinc-300 hover:text-emerald-600 cursor-pointer" />
                <Mail className="w-5 h-5 text-zinc-300 hover:text-emerald-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8 mt-24 pt-8 border-t border-black/5 text-zinc-300 text-xs">
          © 2026 PitchMint. Designed for those who appreciate the details.
        </div>
      </footer>
    </div>
  );
}

function OutputCard({ title, content, icon, onCopy, isCopied }: { title: string, content: string, icon: any, onCopy: any, isCopied: boolean }) {
  return (
    <div className="luxury-card rounded-[2rem] p-10 relative group transition-all hover:border-emerald-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-3">
          {icon}
          {title}
        </h3>
        <button 
          onClick={onCopy}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 bg-zinc-50 hover:bg-emerald-500 hover:text-white px-5 py-2.5 rounded-full transition-all active:scale-95 border border-black/5"
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
      <p className="text-zinc-800 font-medium leading-[1.8] text-xl md:text-2xl tracking-tight">{content}</p>
    </div>
  );
}
