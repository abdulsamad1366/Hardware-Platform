"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, AlertCircle, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../common/button";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError("Email address is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 sm:p-12 font-sans selection:bg-accent selection:text-primary relative overflow-hidden">
      {/* Decorative Blur Orb */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        <div className="mb-6">
          <Link href="/" className="inline-block text-lg font-black tracking-wider uppercase text-white mb-2">
            Secure<span className="text-accent">Link</span>
          </Link>
        </div>

        {!isSubmitted ? (
          <>
            <div className="space-y-2 mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Reset Password
              </h1>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Enter your registered business email and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                      error ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                    }`}
                    placeholder="name@company.com"
                  />
                </div>
                {error && (
                  <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                    <AlertCircle size={11} />
                    <span>{error}</span>
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="accent"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-[#c49015] text-primary font-extrabold h-12 rounded-xl flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 size={28} className="stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-white">Check your inbox</h2>
              <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
                A password recovery link has been successfully generated and sent to:
                <strong className="text-slate-200 block mt-1 font-mono">{email}</strong>
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-850 rounded-xl p-3.5 text-[10px] text-slate-500 font-medium leading-relaxed">
              In production, this link expires after 60 minutes for security purposes.
            </div>

            <Link href="/login" className="inline-block w-full">
              <Button
                variant="outline"
                className="w-full border-slate-800 text-slate-400 hover:text-white hover:border-white h-12 rounded-xl"
              >
                Return to Login
              </Button>
            </Link>
          </div>
        )}

        {/* Back Link */}
        {!isSubmitted && (
          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-xs">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-1 font-bold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Login</span>
            </Link>
          </div>
        )}

      </motion.div>
    </div>
  );
}

export default ForgotPasswordForm;
