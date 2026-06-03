"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  Copy,
  History as HistoryIcon,
  Loader2,
  LogOut,
  MoreHorizontal,
  Plus,
  Sparkles,
  WandSparkles,
  Zap
} from "lucide-react";

type Platform = "Upwork" | "Fiverr" | "LinkedIn" | "Email Outreach";
type Tone = "Direct" | "Warm" | "Premium";

type ProposalOutput = {
  opener: string;
  proposal: string;
  cta: string;
  questions: string[];
};

const howItWorks = [
  {
    step: "01",
    title: "Paste the brief",
    body: "Drop in a client job post, project description, or messy request."
  },
  {
    step: "02",
    title: "Add your edge",
    body: "Share the skills, experience, and proof points you want the client to notice."
  },
  {
    step: "03",
    title: "Generate the pitch",
    body: "Get a ready-to-edit opener, full proposal, CTA, and smart client questions."
  }
];

const valueProps = [
  "Respond before the best jobs go cold",
  "Sound specific without starting from scratch",
  "Turn your experience into client-ready proof"
];

const features = [
  "Client needs summary",
  "Platform-aware proposal structure",
  "Tone presets for different buyers",
  "Reusable pitch framework",
  "Smart follow-up questions",
  "Copy-ready output cards"
];

const pricingPreview = [
  {
    name: "Starter",
    price: "$0",
    description: "For trying the workflow and shaping your first few proposals.",
    highlight: false,
    packId: "starter",
    credits: 5
  },
  {
    name: "Freelancer",
    price: "$12",
    description: "For consistent outreach, sharper drafts, and faster client replies.",
    highlight: true,
    packId: "freelancer",
    credits: 150
  },
  {
    name: "Studio",
    price: "$29",
    description: "For teams that want shared proposal patterns and a cleaner pipeline.",
    highlight: false,
    packId: "studio",
    credits: 500
  }
];

const heroPreview = {
  title: "Landing page redesign for SaaS startup",
  needs: [
    "Responsive marketing page",
    "Fast turnaround with clear milestones",
    "Confident copy and modern visual polish"
  ],
  opening:
    "I can help you launch a focused landing page that feels polished, loads quickly, and gives your team a flexible foundation for future campaigns."
};

const platforms: Platform[] = ["Upwork", "Fiverr", "LinkedIn", "Email Outreach"];
const tones: Tone[] = ["Direct", "Warm", "Premium"];

const sampleJobPost =
  "We need a freelancer to redesign our SaaS landing page. The page should feel modern, load quickly, explain the product clearly, and help us increase demo bookings.";

const sampleSkills =
  "I design clean SaaS landing pages, write conversion-focused copy, and build responsive pages with clear sections, fast turnaround, and polished handoff notes.";

function generateMockProposal({
  jobPost,
  skills,
  platform,
  tone
}: {
  jobPost: string;
  skills: string;
  platform: Platform;
  tone: Tone;
}): ProposalOutput {
  const toneLead = {
    Direct: "I can help with this and keep the work focused on the business outcome.",
    Warm: "This sounds like a thoughtful project, and I would be glad to help shape it into something clear and polished.",
    Premium: "I can help turn this into a refined, client-ready experience with a strong strategic foundation."
  }[tone];

  const platformClose = {
    Upwork: "I can start with a quick project outline, then move into the first draft once the scope is confirmed.",
    Fiverr: "I can package this into a clear delivery with defined revisions and a polished final handoff.",
    LinkedIn: "Happy to share a short plan and relevant examples if you would like to compare fit.",
    "Email Outreach": "If useful, I can reply with a concise scope, timeline, and next-step recommendation."
  }[platform];

  const brief = jobPost.trim() || sampleJobPost;
  const experience = skills.trim() || sampleSkills;

  return {
    opener: `${toneLead} I noticed the brief centers on clarity, speed, and a stronger client-facing presentation.`,
    proposal: `Based on the project, I would focus first on the core message, then structure the page around the client's decision path: problem, value, proof, and conversion. My relevant experience: ${experience} For this ${platform} proposal, I would keep the language specific, practical, and easy for the client to say yes to. Brief reference: ${brief}`,
    cta: platformClose,
    questions: [
      "What is the primary conversion goal for this project?",
      "Do you already have brand guidelines, copy, or examples to work from?",
      "What would make the first draft feel successful to the client?"
    ]
  };
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F3F1E9] text-[#1A1A1A] font-sans selection:bg-emerald-200">
      <Nav />
      <main className="max-w-7xl mx-auto px-6 sm:px-8 pt-10 pb-24">{children}</main>
    </div>
  );
}

export function Nav() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const linkClass =
    "hidden md:inline-flex bg-white/50 backdrop-blur-sm border border-black/5 px-5 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all shadow-sm";

  return (
    <nav className="max-w-7xl mx-auto px-6 sm:px-8 h-24 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">PitchMint</span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <Link href="/how-it-works" className={linkClass}>
          How it works
        </Link>
        <Link href="/features" className={linkClass}>
          Features
        </Link>
        <Link href="/pricing" className={linkClass}>
          Pricing
        </Link>
        {user ? (
          <>
            <Link
              href="/app"
              className="bg-[#1A1A1A] px-6 py-2 rounded-full font-semibold text-sm text-white hover:bg-[#242424] transition-all shadow-sm"
            >
              Workspace
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="bg-white/50 backdrop-blur-sm border border-black/5 px-6 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-white/50 backdrop-blur-sm border border-black/5 px-6 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all shadow-sm"
          >
            Open app
          </Link>
        )}
      </div>
    </nav>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4CAF50]">
      {children}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
      <div className="space-y-9">
        <div className="space-y-4">
          <SectionEyebrow>Proposal writing, without the blank-page feeling</SectionEyebrow>
          <h1 className="text-5xl sm:text-6xl lg:text-[84px] font-bold leading-[0.95] tracking-[-0.04em] text-[#1A1A1A]">
            Turn job posts into tailored freelance proposals.
          </h1>
          <p className="text-[#6B6B6B] text-xl leading-relaxed max-w-lg">
            PitchMint reads the brief, pulls out what matters, and helps you respond with a clear, client-ready proposal that sounds like you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(26,26,26,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#242424]"
          >
            Open workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-2xl border border-black/[0.05] bg-white/60 px-7 py-4 text-sm font-bold text-[#1A1A1A] transition-all hover:bg-white"
          >
            See how it works
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl rounded-full" />
        <div className="relative bg-white rounded-[40px] p-8 sm:p-12 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] border border-black/[0.01]">
          <div className="flex items-center justify-between mb-12">
            <div className="bg-[#E8F5E9] text-[#2E7D32] px-4 py-1.5 rounded-full text-xs font-bold">
              New proposal draft
            </div>
            <MoreHorizontal className="text-zinc-300 w-6 h-6" />
          </div>

          <div className="space-y-12">
            <h2 className="text-4xl sm:text-[42px] font-bold leading-tight tracking-tight">
              {heroPreview.title}
            </h2>

            <div className="space-y-8">
              <div className="space-y-4">
                <SectionEyebrow>Client Needs</SectionEyebrow>
                <ul className="space-y-3">
                  {heroPreview.needs.map((need) => (
                    <li key={need} className="flex items-center gap-3 text-[#555] text-lg">
                      <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                      {need}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <SectionEyebrow>PitchMint Opening</SectionEyebrow>
                <p className="text-[#1A1A1A] text-xl leading-relaxed font-medium">
                  {heroPreview.opening}
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-50 flex items-center justify-between">
              <button className="flex items-center gap-2 text-zinc-400 hover:text-emerald-600 transition-colors text-sm font-semibold">
                <Plus className="w-4 h-4" />
                Add more sections
              </button>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ValueSection() {
  return (
    <section className="pt-24 sm:pt-32">
      <div className="rounded-[36px] border border-white bg-white/55 p-8 sm:p-10 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.35)]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionEyebrow>Value proposition</SectionEyebrow>
            <h2 className="mt-4 max-w-xl text-4xl sm:text-5xl font-bold tracking-[-0.035em]">
              A proposal workspace for freelancers who sell with clarity.
            </h2>
          </div>
          <div className="grid gap-3">
            {valueProps.map((value) => (
              <div key={value} className="flex items-center gap-3 rounded-2xl bg-white/70 px-5 py-4 border border-white">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#4CAF50]" />
                <span className="font-semibold text-[#333]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className={expanded ? "" : "pt-28 sm:pt-36"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionEyebrow>How it works</SectionEyebrow>
          <h1 className={`${expanded ? "max-w-4xl text-5xl sm:text-7xl" : "max-w-2xl text-4xl sm:text-5xl"} mt-4 font-bold tracking-[-0.035em]`}>
            From raw job post to refined client reply.
          </h1>
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

      {expanded && (
        <div className="mt-12 rounded-[36px] bg-white p-8 sm:p-10 border border-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.35)]">
          <SectionEyebrow>Workflow detail</SectionEyebrow>
          <p className="mt-4 max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.02em]">
            PitchMint keeps the writing process focused: understand the client, frame your expertise, then produce proposal pieces that are easy to edit and send.
          </p>
          <Link href="/app" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1A1A1A] px-7 py-4 text-sm font-bold text-white">
            Open workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}

export function FeaturesSection({ expanded = false }: { expanded?: boolean }) {
  return (
    <section className={expanded ? "" : "pt-28 sm:pt-32"}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionEyebrow>Features</SectionEyebrow>
          <h1 className={`${expanded ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"} mt-4 font-bold tracking-[-0.035em]`}>
            Everything a strong proposal needs at the starting line.
          </h1>
          {expanded && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#6B6B6B]">
              The product is intentionally narrow: help freelancers move from brief to persuasive response without needing a dashboard full of unrelated tools.
            </p>
          )}
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
  );
}

export function PricingSection({ expanded = false }: { expanded?: boolean }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBuy = async (packId: string) => {
    if (packId === "starter") {
      window.location.href = "/app";
      return;
    }
    setLoadingId(packId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error === 'Unauthorized') {
        window.location.href = '/login?redirect=/pricing';
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className={expanded ? "" : "pt-28 sm:pt-32"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h1 className={`${expanded ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"} mt-4 font-bold tracking-[-0.035em]`}>
            Pay for what you use.<br />No subscriptions.
          </h1>
        </div>
        <p className="max-w-sm text-[#6B6B6B] leading-relaxed">
          Credit packs that never expire.
        </p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {pricingPreview.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-[28px] p-7 border shadow-[0_18px_44px_-30px_rgba(0,0,0,0.35)] flex flex-col ${
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
                / {plan.credits} credits
              </span>
            </div>
            <p className={`mt-5 leading-relaxed flex-1 ${plan.highlight ? "text-white/70" : "text-[#6B6B6B]"}`}>
              {plan.description}
            </p>
            <button
              onClick={() => handleBuy(plan.packId)}
              disabled={loadingId === plan.packId}
              className={`mt-8 w-full rounded-2xl py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                plan.highlight
                  ? "bg-[#D8F3DD] text-[#1A1A1A] hover:bg-[#C2E8C8]"
                  : "bg-black text-white hover:bg-[#333]"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loadingId === plan.packId ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : plan.packId === "starter" ? (
                "Get Started Free"
              ) : (
                "Buy Credits"
              )}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="pt-28 sm:pt-32">
      <div className="rounded-[36px] bg-white p-8 sm:p-12 lg:p-14 border border-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.35)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <SectionEyebrow>Ready when the next good lead appears</SectionEyebrow>
            <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl font-bold tracking-[-0.035em]">
              Write the proposal while the opportunity is still warm.
            </h2>
          </div>
          <Link
            href="/app"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(26,26,26,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#242424]"
          >
            Open workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-white/70 px-3 py-2 text-xs font-bold text-[#8A857A] transition-all hover:bg-white hover:text-[#1A1A1A]"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#4CAF50]" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function OutputCard({
  title,
  children,
  copyValue
}: {
  title: string;
  children: React.ReactNode;
  copyValue: string;
}) {
  return (
    <article className="rounded-[28px] border border-white bg-white/75 p-6 shadow-[0_18px_44px_-32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold tracking-[-0.02em]">{title}</h3>
        <CopyButton value={copyValue} />
      </div>
      <div className="mt-5 text-[#5F5F5F] leading-relaxed">{children}</div>
    </article>
  );
}

export function Workspace() {
  const [jobPost, setJobPost] = useState(sampleJobPost);
  const [skills, setSkills] = useState(sampleSkills);
  const [platform, setPlatform] = useState<Platform>("Upwork");
  const [tone, setTone] = useState<Tone>("Direct");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<ProposalOutput | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Supabase Integration states
  const [credits, setCredits] = useState<number>(5);
  const [userEmail, setUserEmail] = useState<string>("");
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  
  const questionCopy = useMemo(() => output?.questions.join("\n") ?? "", [output]);

  const loadUserData = async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const result = await res.json();
        setUserEmail(result.user.email);
        setCredits(result.user.credits);
        setHistory(result.history);
      }
    } catch (err) {
      console.error("Failed to load user info and history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setProvider(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobPost, skills, platform, tone }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to generate proposal.");
      }

      setOutput(result.data);
      setProvider(result.provider);
      // Reload user data to capture decremented credits and new history item!
      await loadUserData();
      setSelectedHistoryId(null);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="space-y-6">
      {/* Workspace Header Panel */}
      <div className="rounded-[32px] border border-white bg-white/65 px-5 py-4 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E8F5E9]">
              <WandSparkles className="h-5 w-5 text-[#2E7D32]" />
            </div>
            <div>
              <SectionEyebrow>App workspace</SectionEyebrow>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-[-0.03em] flex items-center gap-2">
                Proposal Generator
                {userEmail && (
                  <span className="text-xs font-medium text-[#8A857A]">
                    ({userEmail})
                  </span>
                )}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-black/[0.04] bg-white/70 px-4 py-2 text-xs font-bold text-[#8A857A]">
              {platform}
            </span>
            <span className="rounded-full border border-black/[0.04] bg-white/70 px-4 py-2 text-xs font-bold text-[#8A857A]">
              {tone} tone
            </span>
            <span className="rounded-full border border-[#E8F5E9] bg-emerald-50/50 px-4 py-2 text-xs font-bold text-[#2E7D32] flex items-center gap-2">
              {credits} credits left
              <Link href="/pricing" className="underline hover:text-emerald-800 transition-colors">
                Top up
              </Link>
            </span>
            <span className={`rounded-full px-4 py-2 text-xs font-bold ${
              output ? "bg-[#E8F5E9] text-[#2E7D32]" : "bg-[#F8F6EF] text-[#8A857A]"
            }`}>
              {output ? `Draft ready (${provider})` : isGenerating ? "Generating..." : "Ready to generate"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 3 Columns on XL screens (History + Form + Output) */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_380px_minmax(0,1fr)]">
        
        {/* Column 1: History Sidebar */}
        <aside className="rounded-[34px] border border-white bg-white/70 p-4 shadow-[0_30px_90px_-58px_rgba(0,0,0,0.15)] flex flex-col h-full min-h-[500px] max-h-[700px] lg:sticky lg:top-6 lg:self-start">
          <div className="p-3 border-b border-black/[0.03] flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-[-0.02em] flex items-center gap-2">
              <HistoryIcon className="w-4 h-4 text-[#4CAF50]" />
              Saved Proposals
            </h2>
            <span className="text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32] px-2 py-0.5 rounded-full">
              {history.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 mt-4 pr-1 scrollbar-thin max-h-[580px]">
            {loadingHistory ? (
              <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
                <Loader2 className="w-5 h-5 animate-spin mb-2 text-[#4CAF50]" />
                <span className="text-[10px] font-semibold">Loading history...</span>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-16 text-zinc-400">
                <p className="text-xs font-semibold">No saved proposals</p>
                <p className="text-[10px] mt-1 text-[#8A857A] leading-normal">
                  Your generations will automatically save to history.
                </p>
              </div>
            ) : (
              history.map((item) => {
                const isSelected = selectedHistoryId === item.id;
                const formattedDate = new Date(item.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                });
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedHistoryId(item.id);
                      setJobPost(item.job_post);
                      setSkills(item.skills);
                      setPlatform(item.platform);
                      setTone(item.tone);
                      setOutput({
                        opener: item.opener,
                        proposal: item.proposal,
                        cta: item.cta,
                        questions: item.questions,
                      });
                      setProvider("Database History");
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs flex flex-col gap-1.5 cursor-pointer ${
                      isSelected
                        ? "border-[#4CAF50] bg-emerald-50/20 shadow-sm"
                        : "border-black/[0.02] bg-white/50 hover:bg-white hover:border-black/[0.08]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-[#1A1A1A] bg-[#FBFAF6] px-2 py-0.5 rounded-full border border-black/[0.03] text-[10px]">
                        {item.platform}
                      </span>
                      <span className="text-[9px] text-[#8A857A] font-semibold">{formattedDate}</span>
                    </div>
                    <p className="text-[#6B6B6B] line-clamp-2 leading-relaxed text-[11px]">
                      {item.job_post}
                    </p>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* Column 2: Inputs Form */}
        <aside className="rounded-[34px] border border-white bg-white/70 p-4 shadow-[0_30px_90px_-58px_rgba(0,0,0,0.15)] lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-[28px] border border-black/[0.04] bg-[#FBFAF6] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-[-0.02em]">Proposal inputs</h2>
                <p className="mt-1 text-sm leading-relaxed text-[#8A857A]">
                  Add the brief, your edge, then choose where this pitch will be sent.
                </p>
              </div>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white">
                <Clipboard className="h-4 w-4 text-[#4CAF50]" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A857A]">
                  Job post
                </span>
                <textarea
                  value={jobPost}
                  onChange={(event) => setJobPost(event.target.value)}
                  className="mt-2 w-full resize-none rounded-2xl border border-black/[0.04] bg-white p-4 min-h-[168px] text-sm leading-relaxed text-[#1A1A1A] shadow-inner shadow-black/[0.02] transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30"
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A857A]">
                  Skills and experience
                </span>
                <textarea
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}
                  className="mt-2 w-full resize-none rounded-2xl border border-black/[0.04] bg-white p-4 min-h-[118px] text-sm leading-relaxed text-[#1A1A1A] shadow-inner shadow-black/[0.02] transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A857A]">
                    Platform
                  </span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {platforms.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setPlatform(item)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                          platform === item
                            ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                            : "border-black/[0.05] bg-white/70 text-[#6B6B6B] hover:bg-white hover:text-[#1A1A1A]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A857A]">
                    Tone
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {tones.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTone(item)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                          tone === item
                            ? "border-[#1A1A1A] bg-[#1A1A1A] text-white"
                            : "border-black/[0.05] bg-white/70 text-[#6B6B6B] hover:bg-white hover:text-[#1A1A1A]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !jobPost.trim() || credits <= 0}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(26,26,26,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#242424] hover:shadow-[0_18px_34px_-14px_rgba(26,26,26,0.85)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {isGenerating ? (
                  "Generating..."
                ) : credits <= 0 ? (
                  "Out of Credits"
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-current" />
                    Generate Proposal
                  </>
                )}
              </button>
            </div>
          </div>
        </aside>

        {/* Column 3: Generated Proposal Output */}
        <section className="rounded-[34px] border border-white bg-white/70 p-4 shadow-[0_30px_90px_-58px_rgba(0,0,0,0.15)] flex-1">
          <div className="rounded-[28px] border border-black/[0.04] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-[-0.03em]">Generated proposal</h2>
                <p className="mt-1 text-sm text-[#8A857A]">
                  Copy-ready proposal sections appear here after generation.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#E8F5E9] px-4 py-2 text-xs font-bold text-[#2E7D32]">
                  {platform}
                </span>
                <span className="rounded-full bg-[#F8F6EF] px-4 py-2 text-xs font-bold text-[#8A857A]">
                  {tone}
                </span>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-5 rounded-[22px] border border-red-200 bg-red-50/50 text-red-800 text-sm leading-relaxed shadow-sm">
                <span className="font-bold block mb-1">Generation failed</span>
                {error}
              </div>
            )}

            {!output && (
              <div className="mt-6 flex min-h-[520px] items-center justify-center rounded-[26px] border border-dashed border-black/[0.08] bg-[#FBFAF6] p-8 text-center">
                <div className="max-w-md">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-white shadow-[0_18px_44px_-30px_rgba(0,0,0,0.35)]">
                    <WandSparkles className="h-6 w-6 text-[#4CAF50]" />
                  </div>
                  <h3 className="mt-6 text-3xl font-bold tracking-[-0.03em]">
                    Your proposal draft will appear here.
                  </h3>
                  <p className="mt-3 leading-relaxed text-[#6B6B6B]">
                    Fill in the brief, choose a platform and tone, then generate a structured pitch with an opener, proposal, CTA, and client questions.
                  </p>
                  <div className="mt-6 grid gap-2 sm:grid-cols-3">
                    {["Opener", "Proposal", "Questions"].map((item) => (
                      <div key={item} className="rounded-2xl bg-white/80 px-4 py-3 text-xs font-bold text-[#8A857A]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {output && (
              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                <OutputCard title="Opener" copyValue={output.opener}>
                  <p>{output.opener}</p>
                </OutputCard>
                <OutputCard title="CTA" copyValue={output.cta}>
                  <p>{output.cta}</p>
                </OutputCard>
                <div className="xl:col-span-2">
                  <OutputCard title="Proposal" copyValue={output.proposal}>
                    <p>{output.proposal}</p>
                  </OutputCard>
                </div>
                <div className="xl:col-span-2">
                  <OutputCard title="3 Client Questions" copyValue={questionCopy}>
                    <ol className="space-y-3">
                      {output.questions.map((question, index) => (
                        <li key={question} className="flex gap-3">
                          <span className="font-bold text-[#4CAF50]">{index + 1}.</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ol>
                  </OutputCard>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
