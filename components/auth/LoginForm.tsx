"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "../common/button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  // Retrieve redirect parameter
  const redirectPath = searchParams.get("redirect") || "/";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email Check
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password Check
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginFailed(false);

    if (!validateForm()) return;

    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      router.push(redirectPath);
    } else {
      setLoginFailed(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row font-sans selection:bg-accent selection:text-primary">
      
      {/* Left Panel: Brand Visual & Tagline */}
      <div className="relative md:w-1/2 bg-[#0F172A] hidden md:flex flex-col justify-between p-12 overflow-hidden">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 brightness-50 mix-blend-luminosity scale-102"
          style={{ backgroundImage: "url('/images/collection-builder.png')" }}
        />
        {/* Radial Dark Gradient Cover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />

        <div className="z-20 relative">
          <Link href="/" className="inline-block text-xl font-black tracking-wider uppercase text-white">
            Secure<span className="text-accent">Link</span>
          </Link>
        </div>

        <div className="z-20 relative max-w-lg space-y-4">
          <span className="text-[10px] font-extrabold tracking-widest text-accent uppercase font-mono bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
            B2B Procurement Platform
          </span>
          <h2 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            Source Premium Hardware with Confidence
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Consolidated network of elite design laboratories and architectural manufacturing entities. Direct quotes, live cart logistics, and wholesale procurement support.
          </p>
        </div>

        <div className="z-20 relative text-xs text-slate-500 font-mono flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-accent" />
          <span>Secure AES 128-bit End-to-End Inquiry Protection</span>
        </div>
      </div>

      {/* Right Panel: Sign In form */}
      <div className="flex-grow md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-950 relative">
        {/* Small background dot accent decoration */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
        >
          {/* Logo representation on Mobile view */}
          <div className="md:hidden mb-6">
            <span className="text-lg font-black tracking-wider uppercase text-white">
              Secure<span className="text-accent">Link</span>
            </span>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Sign in to manage your selections and submit RFQs.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {loginFailed && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-400">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>Invalid credentials. Use <strong>b2b@securelink.com</strong> / <strong>password123</strong> or register a new business account.</span>
              </div>
            )}

            {/* Email Field */}
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
                    if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.email ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="name@company.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <label htmlFor="password" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-[10px] font-bold text-accent hover:text-amber-500 transition-colors uppercase tracking-widest font-mono"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: "" }));
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-950 border text-white text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium ${
                    errors.password ? "border-red-500/40" : "border-slate-800 focus:border-accent"
                  }`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle size={11} />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 bg-slate-950 border-slate-800 text-accent focus:ring-accent/50 rounded cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-slate-400 font-medium cursor-pointer">
                Remember my credentials on this device
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="accent"
              disabled={isSubmitting}
              className="w-full bg-accent hover:bg-[#c49015] text-primary font-extrabold h-12 rounded-xl flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </>
              )}
            </Button>

            {/* Google authentication placeholder */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-wider font-mono"><span className="bg-slate-900 px-3 text-slate-500">Or continue with</span></div>
            </div>

            <button
              type="button"
              disabled
              className="w-full py-3 bg-slate-950 border border-slate-800 text-slate-550 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed opacity-50"
            >
              {/* Google Icon SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.386-2.875-6.386-6.386 0-3.51 2.875-6.386 6.386-6.386 1.63 0 3.12.617 4.26 1.628l3.054-3.055C19.22 2.378 15.935 1 12.24 1 6.043 1 1 6.043 1 12.24s5.043 11.24 11.24 11.24c6.236 0 11.24-5.004 11.24-11.24 0-.648-.06-1.285-.18-1.954H12.24z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Continue as Guest Information */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 text-center text-[10px] text-slate-500 font-medium">
              Selections are saved. You can always sign back in before submitting.
            </div>
          </form>

          {/* Footer Register Link */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-xs">
            <span className="text-slate-400">Don't have an account? </span>
            <Link 
              href={`/register${searchParams.toString() ? `?${searchParams.toString()}` : ""}`} 
              className="font-bold text-accent hover:text-amber-500 transition-colors"
            >
              Create Business Account
            </Link>
          </div>

        </motion.div>
      </div>

    </div>
  );
}

export default LoginForm;
