"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clipboard,
  Copy,
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

const defaultOutput: ProposalOutput = {
  opener:
    "Hi there, I can help turn this brief into a polished proposal that feels specific to the client and clear about the next step.",
  proposal:
    "I would start by clarifying the project goals, then shape the deliverables into a focused plan with milestones, communication points, and a clean handoff. My goal would be to make the client feel understood from the first line while showing exactly how the work will move forward.",
  cta: "If this direction feels right, I can share a concise plan and timeline next.",
  questions: [
    "What outcome matters most for this project?",
    "Are there examples or competitors the client wants to reference?",
    "What timeline or launch date should the proposal speak to?"
  ]
};

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
        <Link
          href="/app"
          className="bg-white/50 backdrop-blur-sm border border-black/5 px-6 py-2 rounded-full font-semibold text-sm hover:bg-white transition-all shadow-sm"
        >
          Open app
        </Link>
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
  return (
    <section className={expanded ? "" : "pt-28 sm:pt-32"}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionEyebrow>Pricing preview</SectionEyebrow>
          <h1 className={`${expanded ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"} mt-4 font-bold tracking-[-0.035em]`}>
            Start light, grow into a proposal system.
          </h1>
        </div>
        <p className="max-w-sm text-[#6B6B6B] leading-relaxed">
          Early pricing direction. No payments are wired yet.
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

function OptionButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
        active
          ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-[0_14px_28px_-18px_rgba(26,26,26,0.85)]"
          : "border-black/[0.05] bg-white/70 text-[#6B6B6B] hover:bg-white hover:text-[#1A1A1A]"
      }`}
    >
      {children}
    </button>
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
  const [output, setOutput] = useState<ProposalOutput>(defaultOutput);
  const questionCopy = useMemo(() => output.questions.join("\n"), [output.questions]);

  const handleGenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      setOutput(generateMockProposal({ jobPost, skills, platform, tone }));
      setIsGenerating(false);
    }, 900);
  };

  return (
    <section>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SectionEyebrow>App workspace</SectionEyebrow>
          <h1 className="mt-4 max-w-3xl text-5xl sm:text-7xl font-bold tracking-[-0.035em]">
            Generate a proposal that knows the client, platform, and tone.
          </h1>
        </div>
        <p className="max-w-md text-lg leading-relaxed text-[#6B6B6B]">
          Mock local generation only. No backend, auth, database, or payments.
        </p>
      </div>

      <div className="rounded-[40px] border border-white bg-white/70 p-4 sm:p-5 shadow-[0_36px_90px_-52px_rgba(0,0,0,0.45)]">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-black/[0.04] bg-[#FBFAF6] p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <WandSparkles className="h-5 w-5 text-[#4CAF50]" />
              <h2 className="text-xl font-bold tracking-[-0.02em]">Proposal inputs</h2>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A857A]">
                  Job post
                </span>
                <textarea
                  value={jobPost}
                  onChange={(event) => setJobPost(event.target.value)}
                  className="mt-3 w-full resize-none rounded-2xl border border-black/[0.04] bg-white p-5 min-h-[170px] text-base leading-relaxed text-[#1A1A1A] shadow-inner shadow-black/[0.02] transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30"
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A857A]">
                  Skills and experience
                </span>
                <textarea
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}
                  className="mt-3 w-full resize-none rounded-2xl border border-black/[0.04] bg-white p-5 min-h-[132px] text-base leading-relaxed text-[#1A1A1A] shadow-inner shadow-black/[0.02] transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30"
                />
              </label>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A857A]">
                  Platform
                </span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {platforms.map((item) => (
                    <OptionButton key={item} active={platform === item} onClick={() => setPlatform(item)}>
                      {item}
                    </OptionButton>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A857A]">
                  Tone
                </span>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {tones.map((item) => (
                    <OptionButton key={item} active={tone === item} onClick={() => setTone(item)}>
                      {item}
                    </OptionButton>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !jobPost.trim()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(26,26,26,0.75)] transition-all hover:-translate-y-0.5 hover:bg-[#242424] hover:shadow-[0_18px_34px_-14px_rgba(26,26,26,0.85)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {isGenerating ? (
                  "Generating..."
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-current" />
                    Generate Proposal
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="rounded-[32px] border border-black/[0.04] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-[#4CAF50]" />
                <h2 className="text-xl font-bold tracking-[-0.02em]">Generated proposal</h2>
              </div>
              <div className="rounded-full bg-[#E8F5E9] px-4 py-2 text-xs font-bold text-[#2E7D32]">
                {platform} / {tone}
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <OutputCard title="Opener" copyValue={output.opener}>
                <p>{output.opener}</p>
              </OutputCard>
              <OutputCard title="Proposal" copyValue={output.proposal}>
                <p>{output.proposal}</p>
              </OutputCard>
              <OutputCard title="CTA" copyValue={output.cta}>
                <p>{output.cta}</p>
              </OutputCard>
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
        </div>
      </div>
    </section>
  );
}
