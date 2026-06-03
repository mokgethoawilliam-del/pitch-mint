"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { KeyRound, Mail, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (isSignUp) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        // If data.session exists, Supabase auto-logged them in (email confirmation disabled)
        if (data.session) {
          setSuccessMsg("Account created! Redirecting...");
          router.push("/app");
          router.refresh();
        } else {
          setSuccessMsg("Registration successful! Please check your email to verify your account.");
        }
      } else {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        setSuccessMsg("Logged in successfully! Redirecting...");
        router.push("/app");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F1E9] text-[#1A1A1A] font-sans flex flex-col justify-between py-12 px-6">
      {/* Top Header / Logo */}
      <header className="max-w-7xl mx-auto w-full flex justify-start">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4CAF50] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">PitchMint</span>
        </Link>
      </header>

      {/* Auth Card Container */}
      <main className="flex-grow flex items-center justify-center my-10">
        <div className="w-full max-w-md bg-white rounded-[36px] p-8 sm:p-10 border border-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.15)] space-y-8">
          {/* Card Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {isSignUp ? "Create your workspace" : "Welcome back"}
            </h1>
            <p className="text-sm text-[#8A857A]">
              {isSignUp
                ? "Get started with 5 free proposal credits"
                : "Sign in to access your proposal history"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A857A] block">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-black/[0.04] bg-[#FBFAF6] text-sm leading-relaxed text-[#1A1A1A] shadow-inner shadow-black/[0.01] transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A857A] block">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <KeyRound className="h-4.5 w-4.5" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-black/[0.04] bg-[#FBFAF6] text-sm leading-relaxed text-[#1A1A1A] shadow-inner shadow-black/[0.01] transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/30"
                />
              </div>
            </div>

            {/* Notifications */}
            {errorMsg && (
              <div className="p-4 rounded-2xl border border-red-100 bg-red-50 text-red-800 text-xs leading-relaxed">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-800 text-xs leading-relaxed">
                {successMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(26,26,26,0.5)] transition-all hover:bg-[#242424] active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  Processing...
                </>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Toggle Tab Footer */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className="text-xs font-semibold text-[#8A857A] hover:text-[#4CAF50] transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-[#8A857A]">
        © {new Date().getFullYear()} PitchMint. All rights reserved.
      </footer>
    </div>
  );
}
