"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Sparkles, Zap, ArrowRight } from "lucide-react";
import { Suspense } from "react";

const PACK_DATA: Record<string, { name: string; credits: number; price: string }> = {
  freelancer: { name: "Freelancer Pack", credits: 150, price: "$12" },
  studio:     { name: "Studio Pack",     credits: 500, price: "$29" },
};

function SuccessContent() {
  const params = useSearchParams();
  const packId  = params.get("pack") || "freelancer";
  const isDemo  = params.get("demo") === "true";
  const pack    = PACK_DATA[packId] ?? PACK_DATA.freelancer;

  const [count, setCount]         = useState(0);
  const [visible, setVisible]     = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; color: string; angle: number; id: number }[]>([]);

  // Animate credits counter
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const start    = performance.now();
    const tick = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * pack.credits));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, pack.credits]);

  // Burst particles
  useEffect(() => {
    if (!visible) return;
    const colors = ["#10B981", "#34D399", "#6EE7B7", "#D8F3DD", "#1A1A1A", "#FBBF24"];
    const burst = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 30 + (Math.random() - 0.5) * 40,
      color: colors[i % colors.length],
      angle: (i / 24) * 360,
    }));
    setParticles(burst);
    const t = setTimeout(() => setParticles([]), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#FCFAF7" }}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(16,185,129,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Confetti particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 8,
            height: 8,
            background: p.color,
            transform: `rotate(${p.angle}deg)`,
            animation: "burst 1.1s ease-out forwards",
          }}
        />
      ))}

      <div
        className="relative z-10 flex flex-col items-center text-center max-w-md w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Icon */}
        <div
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "#D8F3DD" }}
        >
          <CheckCircle2 className="h-10 w-10" style={{ color: "#10B981" }} />
        </div>

        {/* Heading */}
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ color: "#1A1A1A", letterSpacing: "-0.035em" }}
        >
          Payment successful
        </h1>
        <p className="mt-3 text-base" style={{ color: "#6B6B6B" }}>
          {pack.name} · {pack.price}
        </p>

        {/* Credits counter card */}
        <div
          className="mt-8 w-full rounded-3xl border p-8 flex flex-col items-center gap-1"
          style={{
            background: "#fff",
            borderColor: "rgba(0,0,0,0.06)",
            boxShadow: "0 20px 48px -18px rgba(0,0,0,0.12)",
          }}
        >
          <div className="flex items-center gap-2 mb-1" style={{ color: "#10B981" }}>
            <Zap className="h-4 w-4 fill-current" />
            <span className="text-xs font-semibold uppercase tracking-widest">Credits added</span>
          </div>
          <span
            className="text-7xl font-bold tabular-nums"
            style={{ color: "#1A1A1A", letterSpacing: "-0.04em" }}
          >
            +{count}
          </span>
          <p className="mt-2 text-sm" style={{ color: "#6B6B6B" }}>
            ready to use in your workspace
          </p>
        </div>

        {/* Demo badge */}
        {isDemo && (
          <div
            className="mt-5 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
            style={{ background: "#FEF3C7", color: "#92400E" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Demo mode — no real charge was made
          </div>
        )}

        {/* CTA */}
        <Link
          href="/app"
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
          style={{
            background: "#1A1A1A",
            boxShadow: "0 14px 28px -12px rgba(26,26,26,0.6)",
          }}
        >
          Open workspace
          <ArrowRight className="h-4 w-4" />
        </Link>

        <p className="mt-5 text-xs" style={{ color: "#ADADAD" }}>
          Credits never expire · Questions?{" "}
          <a href="mailto:hello@pitchmint.com" style={{ color: "#10B981" }}>
            hello@pitchmint.com
          </a>
        </p>
      </div>

      <style jsx global>{`
        @keyframes burst {
          0%   { opacity: 1; transform: scale(1) translateY(0px); }
          100% { opacity: 0; transform: scale(0.3) translateY(-80px); }
        }
      `}</style>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
